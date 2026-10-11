
"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink, LoaderCircle, Save } from "lucide-react";

type ClinicSettings = {
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  mapsUrl: string;
};

type SettingsFormProps = {
  initialSettings: ClinicSettings;
  canEdit: boolean;
};

const fields: {
  name: keyof ClinicSettings;
  label: string;
  type: "text" | "email" | "tel" | "url";
  placeholder: string;
}[] = [
  {
    name: "clinicName",
    label: "Clinic name",
    type: "text",
    placeholder: "Mrudula ENT Care",
  },
  {
    name: "address",
    label: "Clinic address",
    type: "text",
    placeholder: "Full clinic address",
  },
  {
    name: "phone",
    label: "Contact phone",
    type: "tel",
    placeholder: "+91-XXXXXXXXXX",
  },
  {
    name: "email",
    label: "Contact email",
    type: "email",
    placeholder: "clinic@example.com",
  },
  {
    name: "openingHours",
    label: "Opening hours",
    type: "text",
    placeholder: "Monday–Saturday, 4:00 PM–9:00 PM",
  },
  {
    name: "mapsUrl",
    label: "Google Maps URL",
    type: "url",
    placeholder: "https://maps.app.goo.gl/...",
  },
];

export default function SettingsForm({
  initialSettings,
  canEdit,
}: SettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(
    name: keyof ClinicSettings,
    value: string,
  ) {
    setSettings((current) => ({ ...current, [name]: value }));
    setMessage("");
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!canEdit || saving) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const details = result.details as
          | Record<string, string[] | undefined>
          | undefined;

        const firstFieldError = details
          ? Object.values(details).flat().find(Boolean)
          : undefined;

        throw new Error(
          firstFieldError ||
            result.error ||
            "Unable to save clinic settings.",
        );
      }

      setSettings(result.settings as ClinicSettings);
      setMessage("Clinic settings saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-sm border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--midnight)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--deep-teal)] focus:ring-2 focus:ring-[var(--deep-teal)]/15 disabled:cursor-not-allowed disabled:bg-[var(--ivory)] disabled:opacity-80";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.name === "address" ||
              field.name === "openingHours" ||
              field.name === "mapsUrl"
                ? "sm:col-span-2"
                : ""
            }
          >
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-[var(--midnight)]"
            >
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={settings[field.name]}
              onChange={(event) =>
                updateField(field.name, event.target.value)
              }
              placeholder={field.placeholder}
              autoComplete="off"
              maxLength={field.name === "mapsUrl" ? 2048 : 300}
              required
              readOnly={!canEdit}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {settings.mapsUrl.trim().startsWith("https://") && (
        <a
          href={settings.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-2 text-sm text-[var(--deep-teal)] underline underline-offset-4"
        >
          Preview map link
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      )}

      <div aria-live="polite" className="text-sm">
        {message && (
          <p className="flex items-center gap-2 text-[var(--deep-teal)]">
            <CheckCircle2 size={17} aria-hidden="true" />
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        )}
      </div>

      {canEdit ? (
        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[var(--muted)]">
            Changes are saved to the clinic settings database.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--midnight)] px-5 text-sm font-medium text-white transition hover:bg-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Save size={17} aria-hidden="true" />
            )}
            {saving ? "Saving changes…" : "Save settings"}
          </button>
        </div>
      ) : (
        <p className="border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
          Read-only access. Contact a super administrator to change
          these details.
        </p>
      )}
    </form>
  );
}
