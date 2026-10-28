import { Consult } from "@/components/landing/consult"
import { Faq } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Process } from "@/components/landing/process"
import { Services } from "@/components/landing/services"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { WhyUs } from "@/components/landing/why-us"

export default function Home() {
  return (
    <>
      <a
        href="#consult"
        className="absolute top-0 -left-[9999px] z-[100] rounded-br-lg bg-navy px-4 py-3 [font-family:initial] leading-[normal] text-white hover:text-brand-red focus:left-0"
      >
        Skip to form
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <Services />
        <WhyUs />
        <Process />
        <Faq />
        <Consult />
      </main>
      <SiteFooter />
    </>
  )
}
