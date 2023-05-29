"use client"

import { createCalendar } from "@internationalized/date"
import { useRef } from "react"
import { useRangeCalendar } from "react-aria"
import { RangeCalendarStateOptions, useRangeCalendarState } from "react-stately"
import { useUILocaleConfig } from "../core"
import { CalendarGrid } from "./calendar-grid"
import { CalendarHeader } from "./calendar-header"


export function RangeCalendar({ locale, ...props }: Omit<RangeCalendarStateOptions, "createCalendar" | "locale"> & { locale?: string }) {
   let { countryLocale } = useUILocaleConfig()
   let state = useRangeCalendarState({
      ...props,
      visibleDuration: { months: 2 },
      locale: locale ?? countryLocale,
      createCalendar,
   })

   let ref = useRef<HTMLDivElement>(null)
   let {
      calendarProps,
      prevButtonProps,
      nextButtonProps,
   } = useRangeCalendar(
      props,
      state,
      ref,
   )

   return (
      <div {...calendarProps} ref={ref} className="inline-block">
         <CalendarHeader
             state={state}
             calendarProps={calendarProps}
             prevButtonProps={prevButtonProps}
             nextButtonProps={nextButtonProps}
         />
          <div className="flex items-center gap-2 pb-4 w-fit">
              <div className="flex flex-col md:flex-row gap-8">
                  <CalendarGrid state={state} offset={{}}/>
                  <CalendarGrid state={state} offset={{ months: 1 }}/>
              </div>
          </div>
      </div>
   )
}

RangeCalendar.displayName = "RangeCalendar"
