import { contactPayloadSchema } from "@/shared/contact-payload";
import { Resend } from "resend";

const PROJECT_LABEL: Record<string, string> = {
  new: "Sistema novo",
  replace: "Substituir o atual",
  evolve: "Evoluir o que existe",
};

const RESEND_STRING_MAX = 2000;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function truncateResendVar(value: string) {
  if (value.length <= RESEND_STRING_MAX) return value;
  const sliced = value.slice(0, RESEND_STRING_MAX - 3);
  return `${sliced.replace(/&[a-zA-Z0-9#]*$/, "")}...`;
}

function formatMessage(message: string) {
  return truncateResendVar(escapeHtml(message).replaceAll("\n", "<br>"));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const templateId = process.env.RESEND_CONTACT_TEMPLATE_ID;

  if (!apiKey || !to || !from || !templateId) {
    console.error(
      "Contact form missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL / RESEND_CONTACT_TEMPLATE_ID",
    );
    return Response.json(
      { ok: false, reason: "unconfigured" },
      { status: 503 },
    );
  }

  const { name, email, company, projectType, message, locale } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[Vorynt] ${name} — ${PROJECT_LABEL[projectType] ?? projectType}`,
    template: {
      id: templateId,
      variables: {
        LEAD_NAME: escapeHtml(name),
        LEAD_EMAIL: email,
        LEAD_COMPANY: escapeHtml(company || "—"),
        PROJECT_TYPE: PROJECT_LABEL[projectType] ?? projectType,
        LOCALE: locale,
        MESSAGE: formatMessage(message),
      },
    },
  });

  if (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
