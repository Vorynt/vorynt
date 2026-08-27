import { z } from "zod";

export const projectTypeSchema = z.enum(["new", "replace", "evolve"]);

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional(),
  projectType: projectTypeSchema,
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional(),
  locale: z.enum(["pt", "en"]),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
