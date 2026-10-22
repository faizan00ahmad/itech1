export const CONTACT_EMAIL = "Contact@iTechEvolution.co.uk";

/** Opens the visitor's email app with the form contents addressed to us. */
export function openEmail(data: FormData, subject: string) {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const name = [get("first_name"), get("last_name")].filter(Boolean).join(" ");
  const lines = [`Name: ${name}`, `Email: ${get("email")}`];
  if (get("phone")) lines.push(`Phone: ${get("phone")}`);
  if (get("message")) lines.push("", get("message"));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
