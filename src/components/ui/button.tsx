import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "box-border inline-flex min-h-11 cursor-pointer items-center rounded-lg border-0 font-semibold no-underline disabled:opacity-70",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-foreground",
        navy: "bg-navy text-white hover:text-white",
        outline:
          "border-[1.5px] border-solid border-navy bg-transparent text-navy hover:text-navy",
      },
      size: {
        default: "px-[1.6rem] py-[0.95rem]",
        sm: "px-[1.2rem] py-[0.7rem] text-center",
        block: "min-h-12 w-full justify-center p-[0.95rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
