import { SectionHeading } from "./section-heading"

const steps = [
  {
    title: "Share your plans",
    body: "Tell us your business stage and the question you need to resolve.",
  },
  {
    title: "Discuss fit and scope",
    body: "We clarify your priorities, timeline and the expertise required.",
  },
  {
    title: "Agree the engagement",
    body: "Review the proposed work, fees and deliverables before we start.",
  },
  {
    title: "Receive advice and support",
    body: "Recommendations and ongoing services follow the agreed scope.",
  },
]

export function Process() {
  return (
    <section id="process" className="bg-navy text-white">
      <div className="mx-auto box-content max-w-[1200px] px-6 py-20">
        <SectionHeading className="mb-10 text-white">How we work</SectionHeading>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-8 p-0">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="block font-heading text-[2.4rem] text-brand-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="my-[0.4rem] text-[1.1rem] font-bold">{step.title}</h3>
              <p className="m-0 text-on-navy">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
