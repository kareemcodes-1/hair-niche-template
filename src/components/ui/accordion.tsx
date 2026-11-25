"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
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
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 text-left outline-none transition-all",
          "focus-visible:ring-2 focus-visible:ring-pink-500/40 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}

        {/* Circular Plus / Minus Icon */}
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/20 transition-all duration-300 group-data-[state=open]/accordion-trigger:border-pink-500 group-data-[state=open]/accordion-trigger:bg-pink-500">
          {/* Horizontal line (always visible) */}
          <span className="absolute h-[1.5px] w-3.5 bg-black transition-colors duration-300 group-data-[state=open]/accordion-trigger:bg-white" />
          
          {/* Vertical line (rotates / disappears when open) */}
          <span className="absolute h-3.5 w-[1.5px] bg-black transition-all duration-300 group-data-[state=open]/accordion-trigger:rotate-90 group-data-[state=open]/accordion-trigger:opacity-0 group-data-[state=open]/accordion-trigger:bg-white" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
