import * as React from "react"
import { cn } from "cn"
import { Slot } from "radix-ui"

function Card({
  className,
  elevated = false,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { elevated?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card"
      className={cn(
        "rounded-[14px] border border-solid border-border bg-card p-8 text-card-foreground",
        elevated && "rounded-2xl shadow-[0_12px_32px_rgba(14,42,71,0.08)]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-[1.2rem] font-bold text-navy", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("m-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Card, CardTitle, CardDescription }
