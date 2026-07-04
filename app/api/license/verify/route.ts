import { supabaseAdmin } from "@/lib/supabase";

// Known limitation: activated_devices is a blind counter, not tracked per
// device ID. Re-activating the same key on the same machine (e.g. after
// clearing localStorage, or reinstalling) counts as a new activation and can
// eventually exhaust max_activations for a legitimate single user. Fine for
// a v1 launch; if this becomes a real support burden, switch to a
// license_activations(license_id, device_id) table with an upsert so repeat
// activations from the same device don't double-count.

// Called from the Digital Lab desktop app, which is always a different
// origin from this server — `app://` in production, `http://localhost:5173`
// in dev. No cookies/credentials are involved (just a license key), so a
// wide-open CORS policy is fine here.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

function invalid(reason: string, status = 200) {
  return Response.json({ valid: false, reason }, { status, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid("Invalid request.", 400);
  }

  const { key, token } = (body as Record<string, unknown>) ?? {};
  const supabase = supabaseAdmin();

  let licenseId: string;

  // Deep-link path: a single-use activation token stands in for the key.
  if (typeof token === "string" && token.trim().length > 0) {
    const { data: tokenRow, error: tokenError } = await supabase
      .from("activation_tokens")
      .select("license_id, used")
      .eq("token", token.trim())
      .maybeSingle();

    if (tokenError) {
      console.error("Activation token lookup failed", tokenError);
      return invalid("Couldn't verify the activation link right now.", 502);
    }
    if (!tokenRow) {
      return invalid("Activation link not found.");
    }
    if (tokenRow.used) {
      return invalid(
        "This activation link has already been used — use the license key from your email instead.",
      );
    }

    const { error: markUsedError } = await supabase
      .from("activation_tokens")
      .update({ used: true })
      .eq("token", token.trim());
    if (markUsedError) {
      console.error("Failed to mark activation token used", markUsedError);
      return invalid("Couldn't verify the activation link right now.", 502);
    }

    licenseId = tokenRow.license_id;
  } else if (typeof key === "string" && key.trim().length > 0) {
    // Manual key-entry path.
    const { data: licenseRow, error: keyError } = await supabase
      .from("licenses")
      .select("id")
      .eq("key", key.trim())
      .maybeSingle();

    if (keyError) {
      console.error("License key lookup failed", keyError);
      return invalid("Couldn't verify the key right now.", 502);
    }
    if (!licenseRow) {
      return invalid("License key not found.");
    }
    licenseId = licenseRow.id;
  } else {
    return invalid("License key or activation token is required.", 400);
  }

  const { data: license, error } = await supabase
    .from("licenses")
    .select("key, status, activated_devices, max_activations")
    .eq("id", licenseId)
    .maybeSingle();

  if (error || !license) {
    console.error("License lookup by id failed", error);
    return invalid("Couldn't verify the license right now.", 502);
  }

  if (license.status !== "active") {
    return invalid("This license has been revoked.");
  }

  if (license.activated_devices >= license.max_activations) {
    return invalid(
      `This key has already been activated on ${license.max_activations} device(s).`,
    );
  }

  const { error: incrementError } = await supabase
    .from("licenses")
    .update({ activated_devices: license.activated_devices + 1 })
    .eq("id", licenseId);

  if (incrementError) {
    console.error("License activation increment failed", incrementError);
    return invalid("Couldn't activate the key right now.", 502);
  }

  return Response.json({ valid: true, key: license.key }, { headers: CORS_HEADERS });
}
