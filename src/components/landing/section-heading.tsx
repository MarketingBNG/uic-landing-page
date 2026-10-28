import * as React from "react"
import { cn } from "cn"

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-0 mb-[0.6rem] text-[0.85rem] font-semibold tracking-[0.08em] text-brand-red uppercase",
        className
      )}
      {...props}
    />
  )
}

export function SectionHeading({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-0 font-heading text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.15] font-normal text-navy",
        className
      )}
      {...props}
    />
  )
}

export const twoColumnGrid = "grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]"
