import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Eyebrow, SectionHeading, twoColumnGrid } from "./section-heading"

const services: { title: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "US Business Structure Advisory",
    description:
      "We assess your business model, funding plans, ownership and India linkages, then advise on the structure that fits: a standalone US entity, a US subsidiary of your Indian company, or another model.",
    icon: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />,
  },
  {
    title: "LLC vs. C-Corp Consultation",
    description:
      "We compare tax treatment, investor expectations, profit repatriation, ESOP plans and exit considerations, so you decide with confidence.",
    icon: <path d="M12 3v18M5 7h14M5 7l-3 7a4 4 0 0 0 6 0L5 7zM19 7l-3 7a4 4 0 0 0 6 0l-3-7z" />,
  },
  {
    title: "US Expansion Advisory",
    description:
      "Which state, how to run US operations from India, what regulations apply and how to approach banking and payments. We help you plan the move and avoid avoidable mistakes.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
  {
    title: "India–US Tax Advisory",
    description:
      "US federal and state tax considerations, the India–US tax treaty, transfer pricing between related entities, FEMA/ODI considerations and founder-level tax planning.",
    icon: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  },
  {
    title: "Post-Incorporation Compliance Advisory",
    description:
      "Understand your ongoing federal, state and India-side obligations. We help you build a compliance calendar and spot risks before they turn into penalties.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    title: "Virtual CFO & Business Finance",
    description:
      "Senior financial leadership without a full-time hire: bookkeeping oversight, financial reporting, cash-flow planning, budgeting and investor-ready financials.",
    icon: <path d="M3 20h18M6 16v-5M11 16V7M16 16v-8M21 16V4" />,
  },
]

export function Services() {
  return (
    <section id="services" className="bg-mist">
      <div className="mx-auto box-content max-w-[1200px] px-6 py-20">
        <Eyebrow>Our advisory services</Eyebrow>
        <SectionHeading className="mb-10">
          Advice across structure, tax, compliance and finance
        </SectionHeading>
        <div className={`${twoColumnGrid} gap-6`}>
          {services.map((service) => (
            <Card asChild key={service.title}>
              <article>
                {/* Inline + baseline, as the SVG rendered before Tailwind preflight. */}
                <svg
                  aria-hidden="true"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0A1A4A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline align-baseline"
                >
                  {service.icon}
                </svg>
                <CardTitle className="mt-4 mb-[0.6rem]">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </article>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="navy">
            <a href="#consult">Request a discovery call</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
