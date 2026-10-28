"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

// Point this at the HTTPS URL that saves the lead in Zoho CRM and returns JSON {"ok":true,"lead_id":"..."}.
const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "https://www.usaindiacfo.com/api/lead"
const PAGE_VERSION = "advisory-lp-v4"
const CONTACT_EMAIL = "contact@usaindiacfo.com"

const TRACKING_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
] as const
type TrackingKey = (typeof TRACKING_KEYS)[number]

const US_STAGES = [
  "Exploring US expansion",
  "Planning to set up a US business",
  "Already operating in the US",
  "Indian company with a US subsidiary",
]

const SERVICE_INTERESTS = [
  "Business structure / LLC vs. C-Corp",
  "US expansion planning",
  "India–US tax",
  "Compliance advisory",
  "Virtual CFO / business finance",
]

type Fields = {
  full_name: string
  email: string
  phone: string
  company: string
  us_stage: string
  message: string
}
type ValidatedField = "full_name" | "email" | "phone" | "us_stage"
// undefined = not validated yet, "" = valid, anything else = the error shown.
type Errors = Partial<Record<ValidatedField, string>>
type Status = "idle" | "sending" | "sent" | "failed"

const EMPTY_FIELDS: Fields = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  us_stage: "",
  message: "",
}

function validate(fields: Fields): Record<ValidatedField, string> {
  const name = fields.full_name.trim()
  const email = fields.email.trim()
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const phone = fields.phone.trim()
  const phoneOk = !phone || /^\+?[0-9][0-9 ()\-]{6,18}$/.test(phone)

  return {
    full_name: name ? "" : "Please enter your full name.",
    email: emailOk ? "" : email ? "Please enter a valid email address." : "Please enter your email.",
    phone: phoneOk
      ? ""
      : "Please enter a valid phone number, for example +91 98765 43210 or +1 555 123 4567.",
    us_stage: fields.us_stage ? "" : "Please select an option.",
  }
}

function newSubmissionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function hiddenInput(form: HTMLFormElement, name: TrackingKey | "submission_id") {
  return form.elements.namedItem(name) as HTMLInputElement
}

const fieldClass = "grid min-w-0 gap-[0.35rem]"
const errorClass = "text-[0.82rem] font-medium text-brand-red"

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <span className={errorClass} id={id} aria-live="polite">
      {message}
    </span>
  )
}

export function LeadForm() {
  const [fields, setFields] = React.useState<Fields>(EMPTY_FIELDS)
  const [services, setServices] = React.useState<string[]>([])
  const [marketingConsent, setMarketingConsent] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<Status>("idle")

  const formRef = React.useRef<HTMLFormElement>(null)
  const messageRef = React.useRef<HTMLDivElement>(null)
  // Guards against a double submit before the disabled button re-renders.
  const sendingRef = React.useRef(false)

  // Copy ad-click and campaign parameters from the landing URL into the hidden fields.
  React.useEffect(() => {
    const form = formRef.current
    if (!form) return
    const query = new URLSearchParams(window.location.search)
    for (const key of TRACKING_KEYS) {
      const value = query.get(key)
      if (value) hiddenInput(form, key).value = value.slice(0, 200)
    }
  }, [])

  React.useEffect(() => {
    if (status === "sent") messageRef.current?.focus()
  }, [status])

  const sending = status === "sending"
  const sent = status === "sent"

  function update<K extends keyof Fields>(key: K) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((current) => ({ ...current, [key]: event.target.value }))
  }

  function toggleService(service: string, checked: boolean) {
    setServices((current) =>
      checked
        ? SERVICE_INTERESTS.filter((s) => s === service || current.includes(s))
        : current.filter((s) => s !== service)
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendingRef.current || sent) return
    setStatus("idle")

    const result = validate(fields)
    // Commit aria-invalid and the error text before moving focus, as the original did.
    flushSync(() => setErrors(result))
    const firstInvalid = (Object.keys(result) as ValidatedField[]).find((key) => result[key])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    const form = event.currentTarget
    const submissionId = hiddenInput(form, "submission_id")
    if (!submissionId.value) submissionId.value = newSubmissionId()
    sendingRef.current = true
    setStatus("sending")

    // Same shape the original FormData loop produced: one string per field,
    // service_interest becomes an array only when several boxes are ticked,
    // and unticked checkboxes are left out.
    const payload: Record<string, string | string[]> = {
      full_name: fields.full_name,
      email: fields.email,
      phone: fields.phone,
      company: fields.company,
      us_stage: fields.us_stage,
    }
    if (services.length) payload.service_interest = services.length === 1 ? services[0] : services
    payload.message = fields.message
    for (const key of TRACKING_KEYS) payload[key] = hiddenInput(form, key).value
    payload.submission_id = submissionId.value
    payload.page_version = PAGE_VERSION
    if (marketingConsent) payload.marketing_consent = "yes"

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = (await response.json()) as { ok?: boolean; lead_id?: string } | null
      if (!data?.ok || !data.lead_id) throw new Error("Lead was not saved")

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "generate_lead",
        lead_id: data.lead_id,
        page_version: PAGE_VERSION,
      })
      setStatus("sent")
    } catch {
      sendingRef.current = false
      setStatus("failed")
    }
  }

  const invalid = (key: ValidatedField) =>
    errors[key] === undefined ? undefined : errors[key] ? "true" : "false"

  return (
    <Card asChild elevated>
      <form
        ref={formRef}
        id="lead-form"
        method="post"
        action={LEAD_ENDPOINT}
        noValidate
        onSubmit={handleSubmit}
        className="box-border grid max-w-full min-w-0 gap-4"
      >
        <h3 className="m-0 text-[1.25rem] font-bold text-navy">Tell us about your US plans</h3>

        <div className={fieldClass}>
          <Label htmlFor="full_name">Full name*</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            aria-describedby="full_name-err"
            aria-invalid={invalid("full_name")}
            value={fields.full_name}
            onChange={update("full_name")}
            disabled={sent}
          />
          <FieldError id="full_name-err" message={errors.full_name} />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
          <div className={fieldClass}>
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby="email-err"
              aria-invalid={invalid("email")}
              value={fields.email}
              onChange={update("email")}
              disabled={sent}
            />
            <FieldError id="email-err" message={errors.email} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98765 43210"
              aria-describedby="phone-err"
              aria-invalid={invalid("phone")}
              value={fields.phone}
              onChange={update("phone")}
              disabled={sent}
            />
            <FieldError id="phone-err" message={errors.phone} />
          </div>
        </div>

        <div className={fieldClass}>
          <Label htmlFor="company">Company name</Label>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={update("company")}
            disabled={sent}
          />
          <FieldError id="company-err" />
        </div>

        <div className={fieldClass}>
          <Label htmlFor="us_stage">Where are you in your US journey?*</Label>
          <NativeSelect
            id="us_stage"
            name="us_stage"
            required
            aria-describedby="us_stage-err"
            aria-invalid={invalid("us_stage")}
            value={fields.us_stage}
            onChange={update("us_stage")}
            disabled={sent}
          >
            <NativeSelectOption value="">Select an option</NativeSelectOption>
            {US_STAGES.map((stage) => (
              <NativeSelectOption key={stage} value={stage}>
                {stage}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id="us_stage-err" message={errors.us_stage} />
        </div>

        <fieldset className="m-0 grid min-w-0 gap-[0.45rem] border-0 p-0">
          <legend className="mb-[0.4rem] px-0.5 py-0 text-[0.9rem] font-semibold">
            What would you like advice on?
          </legend>
          {SERVICE_INTERESTS.map((service) => (
            <Label key={service} className="flex items-center gap-[0.6rem] text-[1rem] font-normal">
              <Checkbox
                name="service_interest"
                value={service}
                checked={services.includes(service)}
                onCheckedChange={(checked) => toggleService(service, checked)}
                disabled={sent}
              />
              {service}
            </Label>
          ))}
        </fieldset>

        <div className={fieldClass}>
          <Label htmlFor="message">Tell us briefly about your business</Label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            value={fields.message}
            onChange={update("message")}
            disabled={sent}
          />
          <FieldError id="message-err" />
        </div>

        {TRACKING_KEYS.map((key) => (
          <input key={key} type="hidden" name={key} />
        ))}
        <input type="hidden" name="submission_id" />
        <input type="hidden" name="page_version" value={PAGE_VERSION} />

        <Label className="flex items-start gap-[0.6rem] font-normal">
          <Checkbox
            name="marketing_consent"
            value="yes"
            checked={marketingConsent}
            onCheckedChange={setMarketingConsent}
            disabled={sent}
            className="mt-1"
          />
          Send me occasional updates by email.
        </Label>

        <Button
          id="lead-submit"
          type="submit"
          size="block"
          disabled={sending || sent}
        >
          {sent ? "Enquiry sent" : sending ? "Sending..." : "Request a discovery call"}
        </Button>

        <div
          id="form-msg"
          ref={messageRef}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className={cn(
            (sent || status === "failed") && "rounded-lg border border-solid p-4 text-[0.95rem]",
            sent && "border-brand-green bg-[#EAF7E6] text-[#1F5A12]",
            status === "failed" && "border-brand-red bg-[#FDECEE] text-[#8A0C22]"
          )}
        >
          {sent &&
            "Thank you. Your enquiry has been received. Our team will review it and contact you. This request does not yet book a meeting or create a paid engagement."}
          {status === "failed" && (
            <>
              We could not send your enquiry. Your details are still here. Please try again, or
              email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          )}
        </div>

        <p className="m-0 text-[0.8rem] text-fine-print">
          We use your details to review and respond to this enquiry. See our{" "}
          <a href="/privacy-notice/">Privacy Notice</a> for how your data is handled. Please do
          not include passport, PAN, SSN or bank account details.
        </p>
      </form>
    </Card>
  )
}
