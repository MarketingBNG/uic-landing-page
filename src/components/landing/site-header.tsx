import Image from "next/image"
import { Button } from "@/components/ui/button"

const brandStripe = [
  { flex: "flex-1", color: "bg-brand-blue" },
  { flex: "flex-[3]", color: "bg-brand-red" },
  { flex: "flex-1", color: "bg-brand-orange" },
  { flex: "flex-1", color: "bg-brand-grey" },
  { flex: "flex-1", color: "bg-brand-green" },
]

export function SiteHeader() {
  return (
    <>
      <div className="bg-navy px-5 py-[0.55rem] text-center text-[0.8rem] text-banner-text">
        <span className="mobile:hidden">
          USAIndiaCFO is a private professional services firm. We are not affiliated with,
          endorsed by, or acting on behalf of the IRS or any US federal or state government
          agency.
        </span>
        <span className="hidden mobile:inline">Private firm. Not a government agency.</span>
      </div>
      <div aria-hidden="true" className="flex h-[5px]">
        {brandStripe.map((stripe) => (
          <span key={stripe.color} className={`${stripe.flex} ${stripe.color}`} />
        ))}
      </div>

      <header className="border-b border-solid border-border bg-white">
        <div className="mx-auto flex box-content max-w-[1200px] flex-nowrap items-center justify-between gap-4 px-6 py-4">
          <a href="#top" aria-label="USAIndiaCFO home" className="flex min-w-0 items-center">
            <Image
              src="/assets/usaindiacfo-logo.png"
              width={288}
              height={52}
              alt="USAIndiaCFO, Best of Both Worlds"
              preload
              // On narrow phones the logo scales down (never squashes) so the CTA keeps two lines.
              className="block h-[52px] w-auto max-w-full object-contain object-left mobile:h-10"
            />
          </a>
          <Button asChild size="sm">
            <a href="#consult">Request a discovery call</a>
          </Button>
        </div>
      </header>
    </>
  )
}
