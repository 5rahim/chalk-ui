"use client"

import { createCalendar } from "@internationalized/date"
import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import { useRef } from "react"
import { useDateField, useDateSegment } from "react-aria"
import { DateFieldState, DateFieldStateOptions, DateSegment, useDateFieldState } from "react-stately"
import { defineStyleAnatomy, useUILocaleConfig } from "../core"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DateSegmentAnatomy = defineStyleAnatomy({
   segment: cva([
      "UI-DateSegment__segment",
      "px-0.5 box-content tabular-nums text-right outline-none rounded-sm",
      "focus:bg-brand-50 dark:focus:bg-transparent focus:text-brand-500 dark:focus:text-white focus:font-semibold group shadow-none"
   ], {
      variants: {
         isEditable: {
            false: "text-gray-500",
            true: "text-gray-800 dark:text-gray-200",
         },
      },
   }),
   input: cva([
      "UI-DateSegment__input",
      "block w-full text-center italic text-gray-500 group-focus:text-brand-500 dark:group-focus:text-white group-focus:font-semibold"
   ]),
})

DateField.displayName = "DateField"

/* -------------------------------------------------------------------------------------------------
 * DateField
 * -----------------------------------------------------------------------------------------------*/

export function DateField({ locale, ...props }: Omit<DateFieldStateOptions, "locale" | "createCalendar"> & { locale?: string }) {
   let { countryLocale } = useUILocaleConfig()

   let state = useDateFieldState({
      ...props,
      locale: locale ?? countryLocale,
      createCalendar,
   })

   let ref = useRef<HTMLDivElement>(null)
   let { fieldProps } = useDateField(props, state, ref)

   return (
       <div {...fieldProps} ref={ref} className="flex">
          {state.segments.map((segment, i) => (
              <DateSegmentComponent key={i} segment={segment} state={state}/>
          ))}
       </div>
   )
}

DateField.displayName = "DateField"


/* -------------------------------------------------------------------------------------------------
 * DateSegmentComponent
 * -----------------------------------------------------------------------------------------------*/

export function DateSegmentComponent({ segment, state }: { segment: DateSegment, state: DateFieldState }) {
   let ref = useRef<HTMLDivElement>(null)
   let { segmentProps } = useDateSegment(segment, state, ref)

   return (
       <div
           {...segmentProps}
           ref={ref}
           style={{
              ...segmentProps.style,
           }}
           className={cn(DateSegmentAnatomy.segment({ isEditable: segment.isEditable }))}
           suppressHydrationWarning
       >
          <span
              aria-hidden="true" className={cn(DateSegmentAnatomy.input())} style={{
             display: segment.isPlaceholder ? undefined : "none", height: segment.isPlaceholder ? undefined : 0,
             pointerEvents: "none",
          }}
          >
             {segment.placeholder}
          </span>
          {segment.isPlaceholder ? null : segment.text}
       </div>
   )
}

DateSegmentComponent.displayName = "DateSegmentComponent"
