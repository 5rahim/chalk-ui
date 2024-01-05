"use client"

import { cva } from "class-variance-authority"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "../core/classnames"
import { defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const CalendarAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Calendar__root",
        "p-3",
    ]),
    months: cva([
        "UI-Calendar__months",
        "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    ]),
    month: cva([
        "UI-Calendar__month",
        "space-y-4",
    ]),
    caption: cva([
        "UI-Calendar__caption",
        "flex justify-center pt-1 relative items-center",
    ]),
    captionLabel: cva([
        "UI-Calendar__captionLabel",
        "text-sm font-medium",
    ]),
    nav: cva([
        "UI-Calendar__nav",
        "space-x-1 flex items-center",
    ]),
    navButton: cva([
        "UI-Calendar__navButton",
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    ]),
    navButtonPrevious: cva([
        "UI-Calendar__navButtonPrevious",
        "absolute left-1",
    ]),
    navButtonNext: cva([
        "UI-Calendar__navButtonNext",
        "absolute right-1",
    ]),
    table: cva([
        "UI-Calendar__table",
        "w-full border-collapse space-y-1",
    ]),
    headRow: cva([
        "UI-Calendar__headRow",
        "flex",
    ]),
    headCell: cva([
        "UI-Calendar__headCell",
        "text-[--muted] rounded-[--radius] w-9 font-normal text-[0.8rem]",
    ]),
    row: cva([
        "UI-Calendar__row",
        "flex w-full mt-2",
    ]),
    cell: cva([
        "UI-Calendar__cell",
        "h-9 w-9 text-center text-sm p-0 relative",
        "[&:has([aria-selected].day-range-end)]:rounded-r-[--radius]",
        "[&:has([aria-selected].day-outside)]:bg-[--subtle]/50",
        "[&:has([aria-selected])]:bg-[--subtle]",
        "first:[&:has([aria-selected])]:rounded-l-[--radius]",
        "last:[&:has([aria-selected])]:rounded-r-[--radius]",
        "focus-within:relative focus-within:z-20",
    ]),
    day: cva([
        "UI-Calendar__day",
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
    ]),
    dayRangeEnd: cva([
        "UI-Calendar__dayRangeEnd",
        "day-range-end",
    ]),
    daySelected: cva([
        "UI-Calendar__daySelected",
        "bg-brand text-white hover:bg-brand hover:text-white",
        "focus:bg-brand focus:text-white rounded-[--radius] font-semibold",
    ]),
    dayToday: cva([
        "UI-Calendar__dayToday",
        "bg-[--subtle] text-[--text] rounded-[--radius]",
    ]),
    dayOutside: cva([
        "UI-Calendar__dayOutside",
        "day-outside text-[--muted] opacity-50",
        "aria-selected:bg-[--subtle]/50",
        "aria-selected:text-white",
        "aria-selected:opacity-30",
    ]),
    dayDisabled: cva([
        "UI-Calendar__dayDisabled",
        "text-[--muted] opacity-50",
    ]),
    dayRangeMiddle: cva([
        "UI-Calendar__dayRangeMiddle",
        "aria-selected:bg-[--subtle]",
        "aria-selected:text-black",
    ]),
    dayHidden: cva([
        "UI-Calendar__dayHidden",
        "invisible",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar(props: CalendarProps) {

    const {
        className,
        classNames,
        showOutsideDays = true,
        ...rest
    } = props

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(CalendarAnatomy.root(), className)}
            classNames={{
                months: CalendarAnatomy.months(),
                month: CalendarAnatomy.month(),
                caption: CalendarAnatomy.caption(),
                caption_label: CalendarAnatomy.captionLabel(),
                nav: CalendarAnatomy.nav(),
                nav_button: CalendarAnatomy.navButton(),
                nav_button_previous: CalendarAnatomy.navButtonPrevious(),
                nav_button_next: CalendarAnatomy.navButtonNext(),
                table: CalendarAnatomy.table(),
                head_row: CalendarAnatomy.headRow(),
                head_cell: CalendarAnatomy.headCell(),
                row: CalendarAnatomy.row(),
                cell: CalendarAnatomy.cell(),
                day: CalendarAnatomy.day(),
                day_range_end: CalendarAnatomy.dayRangeEnd(),
                day_selected: CalendarAnatomy.daySelected(),
                day_today: CalendarAnatomy.dayToday(),
                day_outside: CalendarAnatomy.dayOutside(),
                day_disabled: CalendarAnatomy.dayDisabled(),
                day_range_middle: CalendarAnatomy.dayRangeMiddle(),
                day_hidden: CalendarAnatomy.dayHidden(),
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>,
                IconRight: ({ ...props }) => <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="rotate-180 size-4"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>,
            }}
            {...rest}
        />
    )
}

Calendar.displayName = "Calendar"
