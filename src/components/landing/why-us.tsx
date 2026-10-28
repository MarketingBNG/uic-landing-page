import { Eyebrow, SectionHeading } from "./section-heading"

const reasons = [
  {
    title: "India and US, together",
    body: "Structure, tax and finance decisions that work in both countries, not just one.",
  },
  {
    title: "Qualified professionals",
    body: "Engagements led by Chartered Accountants.",
  },
  {
    title: "Advice in plain language",
    body: "No jargon and no pressure to buy a package. We explain the trade-offs; you decide.",
  },
  {
    title: "One point of contact",
    body: "A dedicated advisor from first consultation through ongoing CFO support.",
  },
  {
    title: "Clear engagement scope",
    body: "A written scope and fee proposal before any paid engagement begins.",
  },
]

export function WhyUs() {
  return (
    <section id="why" className="mx-auto box-content max-w-[1200px] px-6 py-20">
      <Eyebrow>Why USAIndiaCFO</Eyebrow>
      <SectionHeading className="mb-10">Advisors who know both sides of the border</SectionHeading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-10 gap-y-8">
        {reasons.map((reason) => (
          <div key={reason.title}>
            <h3 className="mt-0 mb-2 text-[1.1rem] font-bold text-navy">{reason.title}</h3>
            <p className="m-0 text-muted-foreground">{reason.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
