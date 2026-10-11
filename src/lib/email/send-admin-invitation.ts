type SendAdminInvitationInput = {
  name: string;
  email: string;
  role: "STAFF" | "CLINIC_ADMIN";
  invitationUrl: string;
  expiresAt: Date;
};

export async function sendAdminInvitation({
  name,
  email,
  role,
  invitationUrl,
  expiresAt,
}: SendAdminInvitationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Invitation email configuration is missing.");
  }

  const roleLabel =
    role === "CLINIC_ADMIN"
      ? "Clinic Administrator"
      : "Staff Member";

  const safeName = escapeHtml(name);
  const safeRole = escapeHtml(roleLabel);
  const safeUrl = escapeHtml(invitationUrl);
  const expiry = expiresAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const text = [
    "DR. MRUDULA ENT CARE",
    "",
    `Hello ${name},`,
    "",
    `You've been invited to join Dr. Mrudula ENT Care as a ${roleLabel}.`,
    "",
    "Use this secure link to accept your invitation and create your password:",
    invitationUrl,
    "",
    `This invitation expires on ${expiry} (India Standard Time).`,
    "",
    "If you weren't expecting this invitation, you can ignore this email.",
    "",
    "Dr. Mrudula ENT Care",
  ].join("\n");

  const html = `
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3f5f3;font-family:Arial,Helvetica,sans-serif;color:#172d32;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Your secure invitation to join the Dr. Mrudula ENT Care team.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
      style="background:#f3f5f3;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
            style="max-width:600px;background:#ffffff;border:1px solid #dce3e0;">

            <tr>
              <td style="background:#0b1720;padding:32px 28px;">
                <p style="margin:0;color:#d6bd8b;font-size:11px;letter-spacing:2px;font-weight:bold;">
                  DR. MRUDULA ENT CARE
                </p>
                <h1 style="margin:18px 0 0;color:#ffffff;font-size:27px;line-height:1.3;font-weight:600;">
                  A place on our team awaits you.
                </h1>
                <p style="margin:12px 0 0;color:#dce3e0;font-size:14px;line-height:1.7;">
                  Secure team account invitation
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 28px;">
                <p style="margin:0 0 18px;font-size:16px;">
                  Hello ${safeName},
                </p>

                <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#435458;">
                  You've been invited to join the Dr. Mrudula ENT Care
                  administration team as a <strong style="color:#123d43;">${safeRole}</strong>.
                </p>

                <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#435458;">
                  To get started, accept your invitation and create your own
                  password using the secure link below.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                  <tr>
                    <td bgcolor="#123d43" style="border-radius:5px;">
                      <a href="${safeUrl}"
                        style="display:inline-block;padding:15px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">
                        Accept invitation
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 8px;font-size:13px;color:#687579;line-height:1.7;">
                  For your security, this invitation expires on
                  <strong>${escapeHtml(expiry)}</strong> (India Standard Time).
                </p>

                <p style="margin:0;font-size:13px;color:#687579;line-height:1.7;">
                  If you weren't expecting this invitation, you can safely ignore
                  this email. No account is created until the invitation is accepted.
                </p>

                <hr style="border:0;border-top:1px solid #e8eeeb;margin:28px 0 20px;">

                <p style="margin:0;font-size:12px;line-height:1.8;color:#687579;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin:8px 0 0;font-size:12px;line-height:1.7;overflow-wrap:anywhere;">
                  <a href="${safeUrl}" style="color:#1d5a5d;">${safeUrl}</a>
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f7f5ef;padding:20px 28px;border-top:1px solid #dce3e0;">
                <p style="margin:0;color:#123d43;font-size:13px;font-weight:bold;">
                  Dr. Mrudula ENT Care
                </p>
                <p style="margin:6px 0 0;color:#687579;font-size:12px;line-height:1.7;">
                  This is an automated account invitation. Please don't reply
                  with passwords or other sensitive information.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Invitation to join Dr. Mrudula ENT Care",
      html,
      text,
    }),
  });

  if (!response.ok) {
    // Do not log recipient addresses, API keys, or invitation tokens.
    const errorBody = await response.text().catch(() => "");
    const safeError = errorBody
      .replace(/[\r\n]+/g, " ")
      .slice(0, 300);

    console.error("Resend invitation error:", {
      status: response.status,
      detail: safeError,
    });

    throw new Error(
      `Invitation email delivery failed (HTTP ${response.status}). Check the server log.`
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}