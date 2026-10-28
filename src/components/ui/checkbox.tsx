"use client"

import * as React from "react"
import { cn } from "cn"

// A native checkbox behind the shadcn Checkbox API. A native input keeps what the
// original page had: it works before hydration and without JS, takes part in the
// no-JS form POST, submits the form on Enter, and has the browser's own look.
function Checkbox({
  className,
  onCheckedChange,
  onChange,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn("m-[3px_3px_3px_4px]", className)}
      onChange={(event) => {
        onChange?.(event)
        onCheckedChange?.(event.target.checked)
      }}
      {...props}
    />
  )
}

export { Checkbox }
