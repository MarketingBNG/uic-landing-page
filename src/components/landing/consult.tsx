import { LeadForm } from "./lead-form"
import { SectionHeading, twoColumnGrid } from "./section-heading"

export function Consult() {
  return (
    <section
      id="consult"
      className={`${twoColumnGrid} mx-auto box-content max-w-[1200px] items-start gap-12 px-6 py-20`}
    >
      <div>
        <SectionHeading className="mb-4">Planning your US move? Let&apos;s talk it through.</SectionHeading>
        <p className="mt-0 mb-8 text-[1.08rem] text-muted-foreground">
          Share a few details and our team will contact you to arrange a discovery call.
        </p>
        <div className="flex flex-col gap-[0.6rem] text-foreground">
          <span>
            <strong>India:</strong> <a href="tel:+918591400280">+91 859 140 0280</a>
          </span>
          <span>
            <strong>Email:</strong> <a href="mailto:contact@usaindiacfo.com">contact@usaindiacfo.com</a>
          </span>
        </div>
      </div>
      <LeadForm />
    </section>
  )
}
