import { z } from "zod";
import { engagementModels } from "@/data/engagementModels";
import { services } from "@/data/services";

/**
 * Contact form schema — shared by the client (instant feedback) and the
 * server (authoritative validation). Options derive from data files so
 * new services/engagement models appear automatically.
 */

export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export const engagementOptions = [
  { value: "advisory", label: "One-Time Advisory" },
  ...engagementModels.map((m) => ({ value: m.id, label: m.label })),
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export const requirementOptions = [
  { value: "advisory-question", label: "A specific question or review" },
  { value: "assessment", label: "Assessment or gap analysis" },
  { value: "implementation", label: "Implementation programme" },
  { value: "ongoing-support", label: "Ongoing / fractional support" },
  { value: "training", label: "Training or awareness" },
  { value: "other", label: "Something else" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];
const engagementValues = engagementOptions.map((o) => o.value) as [string, ...string[]];
const requirementValues = requirementOptions.map((o) => o.value) as [string, ...string[]];

const FREE_TEXT = /^[^<>]*$/; // reject angle brackets outright (no markup in any field)

const text = (label: string, min: number, max: number) =>
  z
    .string({ error: `Please enter your ${label.toLowerCase()}.` })
    .trim()
    .min(min, min === 1 ? `Please enter your ${label.toLowerCase()}.` : `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .regex(FREE_TEXT, `${label} contains characters that are not allowed.`);

export const contactSchema = z.object({
  name: text("Name", 1, 120),
  email: z.string({ error: "Please enter your work email address." }).trim().toLowerCase().max(254).email("Please enter a valid work email address."),
  phone: z
    .string()
    .trim()
    .max(32)
    .regex(/^[+\d\s().-]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  company: text("Company", 1, 160),
  jobTitle: text("Job title", 1, 120),
  country: text("Country", 1, 80),
  service: z.enum(serviceValues, { message: "Please choose a service." }),
  requirement: z.enum(requirementValues, { message: "Please choose an approximate requirement." }),
  engagement: z.enum(engagementValues, { message: "Please choose an engagement model." }),
  message: text("Message", 20, 4000),
  consent: z.literal(true, { message: "Please confirm you have read the Privacy Notice." }),
  /* --- Anti-abuse fields (not shown to users) --- */
  website: z.string().max(500).optional(), // honeypot: checked server-side, fails silently
  startedAt: z.number({ error: "Please reload the page and try again." }).int().nonnegative(), // form render timestamp
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
/** Shape used by react-hook-form before validation. */
export type ContactFormValues = z.input<typeof contactSchema>;
