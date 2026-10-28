"use client"

import * as React from "react"
import { cn } from "cn"
import { Accordion as AccordionPrimitive } from "radix-ui"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/accordion-item rounded-[10px] border border-solid border-border bg-white px-[1.4rem] py-[1.1rem]",
        className
      )}
      {...props}
    />
  )
}

// Renders like a <summary>: a disclosure triangle inline before the question text.
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0 text-[1rem] font-semibold">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "block w-full cursor-pointer border-0 bg-transparent p-0 text-left font-semibold text-navy",
          className
        )}
        {...props}
      >
        {/* The browser's own disclosure marker, exactly as <summary> draws it. */}
        <span className="[display:list-item] list-inside [list-style-type:disclosure-closed] group-data-[state=open]/accordion-item:[list-style-type:disclosure-open]">
          {children}
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Force-mounted so every answer is in the server-rendered HTML, like <details>.
function AccordionContent({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className={cn("data-[state=closed]:hidden", className)}
      {...props}
    />
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
