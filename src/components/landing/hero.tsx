import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { twoColumnGrid } from "./section-heading"

const founderQuestions = [
  "LLC or C-Corp: which suits our funding plans?",
  "How will this be taxed in India and the US?",
  "Which state makes sense for our business?",
  "What are our ongoing compliance obligations?",
  "Do we need a CFO before we can afford one?",
]

export function Hero() {
  return (
    <section id="top" className="bg-mist">
      <div
        className={`${twoColumnGrid} mx-auto box-content max-w-[1200px] items-center gap-12 px-6 pt-20 pb-18 mobile:pt-8`}
      >
        <div>
          <p className="mt-0 mb-4 text-[0.85rem] font-bold tracking-[0.1em] text-brand-red uppercase">
            Cross-border advisory for Indian founders
          </p>
          <h1 className="mt-0 mb-5 font-heading text-[clamp(2.3rem,4.5vw,3.6rem)] leading-[1.1] font-normal text-navy">
            Expanding to the US? Get the structure, tax and finance decisions right.
          </h1>
          <p className="mt-0 mb-8 max-w-[34rem] text-[1.15rem] text-muted-foreground">
            Advisory for Indian founders, startups and businesses entering or operating in the US.
            Choose the right structure, understand India–US tax implications and build finance
            operations that scale.
          </p>
          <div className="flex flex-wrap gap-[0.9rem]">
            <Button asChild>
              <a href="#consult">Request a discovery call</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#services">Explore Our Services</a>
            </Button>
          </div>
        </div>

        <Card elevated>
          <p className="mt-0 mb-5 text-[1.05rem] font-bold text-navy">
            Questions we help founders answer
          </p>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {founderQuestions.map((question) => (
              <li key={question} className="flex items-start gap-[0.8rem]">
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B3102C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
