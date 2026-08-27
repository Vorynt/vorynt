import { contactPayloadSchema } from "@/shared/contact-payload";
import { Resend } from "resend";

const PROJECT_LABEL: Record<string, string> = {
  new: "Sistema novo",
  replace: "Substituir o atual",
  evolve: "Evoluir o que existe",
};

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

  if (!apiKey || !to || !from) {
    console.error(
      "Contact form missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL",
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
    text: [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Empresa: ${company || "—"}`,
      `Tipo: ${PROJECT_LABEL[projectType] ?? projectType}`,
      `Idioma: ${locale}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
