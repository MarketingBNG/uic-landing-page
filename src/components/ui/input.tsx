import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "box-border min-h-11 w-full max-w-full min-w-0 rounded-lg border border-solid border-input bg-white p-3 text-[1rem] leading-[1.6] font-normal text-[fieldtext] aria-invalid:border-destructive disabled:text-[#545454]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
