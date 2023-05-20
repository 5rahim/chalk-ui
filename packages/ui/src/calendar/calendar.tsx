"use client"

import { createCalendar } from "@internationalized/date"
import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import _capitalize from "lodash/capitalize"
import { useRef } from "react"
import { useCalendar } from "react-aria"
import { CalendarStateOptions, useCalendarState } from "react-stately"
import { defineStyleAnatomy, IconButton } from ".."
import { useStyleLibrary, useUILocaleConfig } from "../core"
import { CalendarGrid } from "./calendar-grid"

export const CalendarAnatomy = defineStyleAnatomy({
   container: cva("UI-Calendar__container inline-block text-gray-800 dark:text-gray-200"),
   header: cva("UI-Calendar__header flex items-center gap-2 pb-4 w-full justify-between"),
   title: cva("UI-Calendar__title flex-none font-bold text-lg ml-2 w-[fit-content]"),
})

export function Calendar({ locale, ...props }: Omit<CalendarStateOptions, "createCalendar" | "locale"> & { locale?: string }) {
   
   const StyleLibrary = useStyleLibrary()
   
   let { countryLocale } = useUILocaleConfig()
   let state = useCalendarState({
      ...props,
      locale: locale ?? countryLocale,
      createCalendar,
   })
   
   
   let ref = useRef<HTMLDivElement>(null)
   let {
      calendarProps,
      prevButtonProps: { onPress: prevButtonOnPress, ...prevButtonProps },
      nextButtonProps: { onPress: nextButtonOnPress, ...nextButtonProps },
      title,
   } = useCalendar(
      props,
      state,
   )
   
   return (
      <div {...calendarProps} ref={ref} className={cn(StyleLibrary.Calendar.container())}>
         <div className={cn(StyleLibrary.Calendar.header())}>
            <IconButton
               size="sm"
               intent="primary-subtle"
               icon={(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6">
                  <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
               </svg>)}
               rounded
               {...prevButtonProps}
               onClick={e => {
                  e.preventDefault()
                  prevButtonOnPress && prevButtonOnPress(e as any)
               }}
            />
            <h2 className={cn(StyleLibrary.Calendar.title())}>{_capitalize(Intl.DateTimeFormat(countryLocale, {
               month: "long", year: "numeric",
            }).format(state.visibleRange.start.toDate(state.timeZone)))}</h2>
            <IconButton
               size="sm"
               intent="primary-subtle"
               icon={(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6">
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path>
               </svg>)}
               rounded
               {...nextButtonProps}
               onClick={e => {
                  e.preventDefault()
                  nextButtonOnPress && nextButtonOnPress(e as any)
               }}
            />
         </div>
         <CalendarGrid state={state} offset={{}} />
      </div>
   )
}

