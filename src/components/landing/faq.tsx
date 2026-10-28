import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeading } from "./section-heading"

const faqs = [
  {
    question: "Should I form an LLC or a C-Corp in the US?",
    answer:
      "It depends on your funding plans, tax position, ownership and long-term goals. LLCs offer flexibility for some founders, while C-Corps are usually expected by venture investors. We walk you through the trade-offs.",
  },
  {
    question: "Do I need a US entity to sell to US customers?",
    answer:
      "Not always. Some businesses serve US clients directly from India; others benefit from a US presence. We help you assess which approach fits.",
  },
  {
    question: "How does India–US taxation affect my business?",
    answer:
      "Cross-border structures can create tax considerations in both countries, including treaty benefits, transfer pricing and profit repatriation. We advise on these before and after you expand.",
  },
  {
    question: "Can you advise us after our US entity is in place?",
    answer:
      "Yes. Many clients come to us after incorporation for compliance advisory, tax planning and Virtual CFO support.",
  },
  {
    question: "What does a Virtual CFO do?",
    answer:
      "Senior financial oversight on a part-time basis: reporting, cash-flow planning, budgeting and investor-ready financials, without a full-time CFO's cost.",
  },
  {
    question: "Which US state should we consider?",
    answer:
      "State choice affects taxes, investor expectations and ongoing obligations. We explain how the common options compare for your business.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "Our first discussion is to understand your needs and agree the scope. Advice is given under a signed engagement.",
  },
  {
    question: "Are you a government agency?",
    answer:
      "No. USAIndiaCFO is a private professional services firm and is not affiliated with any government authority.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="bg-mist">
      <div className="mx-auto box-content max-w-[860px] px-6 py-20">
        <SectionHeading className="mb-8">Frequently asked questions</SectionHeading>
        <Accordion type="multiple" defaultValue={["faq-0"]}>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="mt-3 mb-0 text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
