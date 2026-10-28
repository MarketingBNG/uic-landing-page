import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-[0.88rem] text-on-navy">
      <div className="mx-auto grid box-content max-w-[1200px] gap-5 px-6 py-12">
        <div className="flex items-center gap-3">
          {/* Inline + baseline inside a wrapper, as the original <picture> rendered it. */}
          <span>
            <Image
              src="/assets/usaindiacfo-mark.png"
              width={44}
              height={44}
              alt=""
              className="inline size-11 align-baseline"
            />
          </span>
          <strong className="text-[1.15rem] text-white">USAIndiaCFO</strong>
          <span className="text-[0.8rem] tracking-[0.12em] text-on-navy">BEST OF BOTH WORLDS</span>
        </div>
        <p className="m-0">
          Office No 3, 4th Floor, Parth Business Plaza, Mith Chowki, Above Zenith Hospital, Malad
          West, Mumbai, Maharashtra 400064
        </p>
        <p className="m-0">
          <strong className="text-white">Service disclaimer:</strong> USAIndiaCFO is a private
          professional services firm providing advisory, consulting, tax and financial services. We
          are not affiliated with, endorsed by, or acting on behalf of the IRS or any US federal,
          state or Indian government authority. Information on this page is general in nature and
          is not legal advice. Advice is provided only under a signed engagement and depends on
          your specific facts. Outcomes, timelines and regulatory decisions are not guaranteed.
        </p>
        <div className="flex flex-wrap justify-between gap-6 border-t border-solid border-navy-rule pt-5">
          <span>© 2026 USAIndiaCFO. All rights reserved.</span>
          <span className="flex gap-5">
            <a href="/privacy-notice/" className="text-white hover:text-white">
              Privacy Notice
            </a>
            <a href="/terms/" className="text-white hover:text-white">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
