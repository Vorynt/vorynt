"use client";

import type { SiteContent } from "@/content/schema";
import { Button } from "@/shared/components/Button";
import { Container } from "@/shared/components/Container";
import { LedFrame } from "@/shared/components/LedFrame";
import { SectionHeading } from "@/shared/components/SectionHeading";
import {
  contactPayloadSchema,
  type ContactPayload,
} from "@/shared/contact-payload";
import { FadeIn } from "@/shared/motion/FadeIn";
import { cn } from "@/shared/utils/cn";
import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";

interface Props {
  content: SiteContent["contact"];
  locale: ContactPayload["locale"];
}

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ content, locale }: Props) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      projectType: String(data.get("projectType") ?? "new"),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      locale,
    };

    const parsed = contactPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name") next.name = content.errors.name;
        if (key === "email") next.email = content.errors.email;
        if (key === "message") next.message = content.errors.message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        throw new Error("request failed");
      }
      track("lead_submit", { locale });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "submitting" || status === "success";

  return (
    <section id={content.id} className="scroll-mt-28 py-28 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <FadeIn className="lg:col-span-5">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            titleAccent={content.titleAccent}
            description={content.description}
            size="lg"
          />
        </FadeIn>

        <FadeIn delay={0.08} className="lg:col-span-7">
          <LedFrame className="p-6 sm:p-8" pulse>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label={content.fields.name.label}
                  placeholder={content.fields.name.placeholder}
                  error={errors.name}
                  disabled={disabled}
                  autoComplete="name"
                  required
                />
                <Field
                  id="email"
                  label={content.fields.email.label}
                  placeholder={content.fields.email.placeholder}
                  error={errors.email}
                  disabled={disabled}
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <Field
                id="company"
                label={content.fields.company.label}
                placeholder={content.fields.company.placeholder}
                disabled={disabled}
                autoComplete="organization"
              />
              <fieldset className="flex flex-col" disabled={disabled}>
                <legend className="text-sm text-foreground mb-2">
                  {content.fields.projectType.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {content.fields.projectType.options.map((option, index) => (
                    <label
                      key={option.value}
                      className={cn(
                        "cursor-pointer rounded-full border border-white/12 px-4 py-2 text-sm text-muted transition-colors duration-200",
                        "hover:border-white/30 hover:text-foreground",
                        "has-checked:border-led-light/70 has-checked:bg-white/10 has-checked:text-foreground",
                        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
                      )}>
                      <input
                        type="radio"
                        name="projectType"
                        value={option.value}
                        defaultChecked={index === 0}
                        className="sr-only pointer-events-none"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-foreground">
                  {content.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled={disabled}
                  placeholder={content.fields.message.placeholder}
                  className={cn(fieldClass, "h-auto min-h-32 resize-y py-3")}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message ? (
                  <p id="message-error" className="text-sm text-danger">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button type="submit" size="lg" disabled={disabled}>
                {status === "submitting" ? content.submitting : content.submit}
              </Button>

              {status === "success" ? (
                <p role="status" className="text-sm text-success">
                  {content.success}
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="text-sm text-danger">
                  {content.error}
                </p>
              ) : null}
            </form>
          </LedFrame>
        </FadeIn>
      </Container>
    </section>
  );
}

const fieldClass =
  "h-11 w-full rounded-xl border border-white/12 bg-white/5 px-3 text-sm text-foreground backdrop-blur-sm transition-colors duration-200 placeholder:text-muted/70 focus:border-led focus:bg-white/8";

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  disabled: boolean;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}

function Field({
  id,
  label,
  placeholder,
  error,
  disabled,
  type = "text",
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={fieldClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
