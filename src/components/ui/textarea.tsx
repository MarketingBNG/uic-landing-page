import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "box-border w-full max-w-full min-w-0 resize-y rounded-lg border border-solid border-input bg-white p-3 text-[1rem] leading-[1.6] font-normal text-[fieldtext] aria-invalid:border-destructive disabled:bg-[rgba(239,239,239,0.3)] disabled:text-[#545454]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
