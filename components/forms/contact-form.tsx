"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/form";
import {
  contactSchema,
  engagementOptions,
  requirementOptions,
  serviceOptions,
  type ContactFormValues,
  type ContactInput,
} from "@/lib/validation/contact";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    __piTurnstileCallback?: (token: string) => void;
  }
}

type Status = { type: "idle" } | { type: "success"; reference?: string } | { type: "error"; message: string };

const pick = <T extends { value: string }>(opts: readonly T[], v: string | null) =>
  v && opts.some((o) => o.value === v) ? v : "";

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ type: "idle" });

  // Map query-string intents (from CTAs) onto form defaults.
  const engagementParam = params.get("engagement");
  const defaultEngagement = engagementParam === "enterprise" ? "retainer" : pick(engagementOptions, engagementParam);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      country: "",
      service: pick(serviceOptions, params.get("service")) as ContactFormValues["service"],
      requirement: "" as ContactFormValues["requirement"],
      engagement: defaultEngagement as ContactFormValues["engagement"],
      message: "",
      consent: false as unknown as true,
      website: "",
      startedAt: 0,
    },
  });

  // Record when the form became interactive (timing-based bot check).
  useEffect(() => {
    setValue("startedAt", Date.now());
    window.__piTurnstileCallback = (token: string) => setValue("turnstileToken", token);
    return () => {
      delete window.__piTurnstileCallback;
    };
  }, [setValue]);

  const onSubmit = async (values: ContactInput) => {
    setStatus({ type: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        reference?: string;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && data.ok) {
        setStatus({ type: "success", reference: data.reference });
        reset();
        return;
      }
      if (data.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) {
          setError(field as keyof ContactFormValues, { message });
        }
      }
      setStatus({ type: "error", message: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    }
  };

  if (status.type === "success") {
    return (
      <div role="status" className="rounded-xl border border-border-accent bg-card p-8 sm:p-10">
        <CircleCheck aria-hidden="true" className="size-8 text-accent-text" strokeWidth={1.5} />
        <h2 className="mt-6 font-heading text-h3 font-semibold text-foreground">Thank you — your message has been received.</h2>
        <p className="mt-3 text-body text-muted-foreground">
          We will review your requirement and respond to the work email you provided.
          {status.reference && (
            <>
              {" "}
              Your reference is <span className="font-mono text-foreground">{status.reference}</span>.
            </>
          )}
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus({ type: "idle" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const a11y = (name: keyof ContactFormValues, hint?: boolean) => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-caption text-muted-foreground">
        Fields marked <span className="text-accent-text">*</span> are required.
      </p>

      {status.type === "error" && (
        <Alert variant="danger" title="Your message was not sent" role="alert">
          {status.message}
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name?.message}>
          <Input {...register("name")} {...a11y("name")} autoComplete="name" required />
        </Field>
        <Field id="email" label="Work Email" required error={errors.email?.message}>
          <Input {...register("email")} {...a11y("email")} type="email" autoComplete="email" inputMode="email" required />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={errors.phone?.message}>
          <Input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" />
        </Field>
        <Field id="company" label="Company" required error={errors.company?.message}>
          <Input {...register("company")} {...a11y("company")} autoComplete="organization" required />
        </Field>
        <Field id="jobTitle" label="Job Title" required error={errors.jobTitle?.message}>
          <Input {...register("jobTitle")} {...a11y("jobTitle")} autoComplete="organization-title" required />
        </Field>
        <Field id="country" label="Country" required error={errors.country?.message}>
          <Input {...register("country")} {...a11y("country")} autoComplete="country-name" required />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="service" label="Service Interested In" required error={errors.service?.message} className="sm:col-span-2">
          <Select {...register("service")} {...a11y("service")} required>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="requirement" label="Approximate Requirement" required error={errors.requirement?.message}>
          <Select {...register("requirement")} {...a11y("requirement")} required>
            <option value="" disabled>
              Select one
            </option>
            {requirementOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="engagement" label="Preferred Engagement Model" required error={errors.engagement?.message}>
          <Select {...register("engagement")} {...a11y("engagement")} required>
            <option value="" disabled>
              Select one
            </option>
            {engagementOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        required
        hint="Briefly describe what you are trying to solve, any deadlines, and relevant regulations or standards."
        error={errors.message?.message}
      >
        <Textarea {...register("message")} {...a11y("message", true)} rows={6} required />
      </Field>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-callback="__piTurnstileCallback" data-theme="auto" />
        </>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <Checkbox
            {...register("consent")}
            id="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label htmlFor="consent" className="text-small leading-relaxed text-subtle-foreground">
            I agree that PrivInfosec Consulting may use the information I have provided to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="text-foreground underline decoration-border-accent underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent-text" target="_blank">
              Privacy Notice
            </Link>
            .<span className="ml-0.5 text-accent-text" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" role="alert" className="text-caption font-medium text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Start a Conversation
            <ArrowRight aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
