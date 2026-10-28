import { SectionHeading } from "./section-heading"

export function Problem() {
  return (
    <section className="mx-auto box-content max-w-[860px] px-6 py-20 text-center">
      <SectionHeading className="mb-5">
        The decisions you make early are the hardest to undo.
      </SectionHeading>
      <p className="mt-0 mb-4 text-[1.08rem] text-muted-foreground">
        An LLC that suits a solo founder can become a problem when you raise from US investors. A
        Delaware C-Corp can bring India tax and transfer-pricing questions you didn&apos;t plan
        for. And compliance obligations continue long after incorporation.
      </p>
      <p className="m-0 text-[1.08rem] text-muted-foreground">
        Most founders don&apos;t need more paperwork. They need someone who understands both
        countries to help them think it through first.
      </p>
    </section>
  )
}
