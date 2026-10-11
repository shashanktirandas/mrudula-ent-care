
import { DEFAULT_CLINIC_SETTINGS } from "@/lib/clinic-settings";

type AppointmentEmailInput = {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  concern: string;
  preferredDate: Date;
  preferredTime: string;
  appointmentId: string;
};

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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}


function formatTimeRange(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  const formatTime = (hour: number, minute: number) =>
    new Date(Date.UTC(2026, 0, 1, hour, minute)).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      },
    );

  return `${formatTime(hours, minutes)} – ${formatTime(hours + 1, minutes)}`;
}


async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Appointment email configuration is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    // Avoid logging patient details or provider credentials.
    console.error("Appointment email delivery failed:", {
      status: response.status,
    });

    throw new Error(
      `Appointment email delivery failed (HTTP ${response.status}).`,
    );
  }
}

export async function sendPatientAppointmentEmail(
  input: AppointmentEmailInput,
) {
  const patientName = escapeHtml(input.patientName);
  const clinicName = escapeHtml(DEFAULT_CLINIC_SETTINGS.clinicName);
  const date = formatDate(input.preferredDate);
  const time = escapeHtml(formatTimeRange(input.preferredTime));
  const concern = escapeHtml(input.concern);
  const phone = escapeHtml(DEFAULT_CLINIC_SETTINGS.phone);

  const text = [
    `Hello ${input.patientName},`,
    "",
    `Thank you for contacting ${DEFAULT_CLINIC_SETTINGS.clinicName}.`,
    "We have received your appointment request.",
    "",
    `Preferred date: ${date}`,
    `Preferred time: ${formatTimeRange(input.preferredTime)}`,
    `Reason for visit: ${input.concern}`,
    "",
    "Your appointment is not confirmed yet. Our clinic will contact you to discuss availability.",
    `For assistance, call ${DEFAULT_CLINIC_SETTINGS.phone}.`,
    "",
    "Thank you.",
    DEFAULT_CLINIC_SETTINGS.clinicName,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#17252b;line-height:1.7">
      <div style="background:#0B1720;padding:24px;color:#F7F5EF">
        <p style="margin:0;font-size:12px;letter-spacing:2px">APPOINTMENT REQUEST</p>
        <h1 style="margin:10px 0 0;font-size:24px">${clinicName}</h1>
      </div>
      <div style="padding:24px;border:1px solid #e4e7e6">
        <p>Hello ${patientName},</p>
        <p>Thank you for contacting ${clinicName}. We have received your appointment request.</p>
        <div style="background:#f7f5ef;padding:16px;margin:20px 0">
          <p><strong>Preferred date:</strong> ${date}</p>
          <p><strong>Preferred time:</strong> ${time}</p>
          <p><strong>Reason for visit:</strong> ${concern}</p>
        </div>
        <p><strong>Please note:</strong> Your appointment is not confirmed yet. Our clinic will contact you to discuss availability.</p>
        <p>For assistance, call <a href="tel:+919849835822">${phone}</a>.</p>
        <p>Thank you,<br/>${clinicName}</p>
      </div>
    </div>`;

  await sendEmail({
    to: input.patientEmail,
    subject: `We received your appointment request — ${DEFAULT_CLINIC_SETTINGS.clinicName}`,
    text,
    html,
  });
}

export async function sendClinicAppointmentNotification(
  input: AppointmentEmailInput,
) {
  const clinicEmail = process.env.APPOINTMENT_NOTIFICATION_EMAIL;

  if (!clinicEmail) {
    throw new Error("Clinic appointment notification email is not configured.");
  }

  const text = [
    "A new appointment request has been received.",
    "",
    `Request ID: ${input.appointmentId}`,
    `Patient: ${input.patientName}`,
    `Patient phone: ${input.patientPhone}`,
    `Patient email: ${input.patientEmail}`,
    `Concern: ${input.concern}`,
    `Preferred date: ${formatDate(input.preferredDate)}`,
    `Preferred time: ${formatTimeRange(input.preferredTime)}`,
    "",
    "Review the request in the clinic admin dashboard.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#17252b;line-height:1.7">
      <h1 style="font-size:22px">New appointment request</h1>
      <p><strong>Request ID:</strong> ${escapeHtml(input.appointmentId)}</p>
      <p><strong>Patient:</strong> ${escapeHtml(input.patientName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(input.patientPhone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.patientEmail)}</p>
      <p><strong>Concern:</strong> ${escapeHtml(input.concern)}</p>
      <p><strong>Preferred date:</strong> ${formatDate(input.preferredDate)}</p>
      <p><strong>Preferred time:</strong> ${escapeHtml(input.preferredTime)}</p>
      <p>Please review this request in the clinic admin dashboard.</p>
    </div>`;

  await sendEmail({
    to: clinicEmail,
    subject: "New appointment request — Mrudula ENT Care",
    text,
    html,
  });
}
