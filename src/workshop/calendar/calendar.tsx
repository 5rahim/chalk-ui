"use client"

import { cva } from "class-variance-authority"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ButtonAnatomy } from "../button"
import { cn, ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

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
        "relative w-fit max-w-fit flex flex-col sm:flex-row",
    ]),
    month: cva([
        "UI-Calendar__month",
        "",
    ]),
    monthCaption: cva([
        "UI-Calendar__caption",
        "w-fit h-8 flex items-center",
    ]),
    captionLabel: cva([
        "UI-Calendar__captionLabel",
        "text-base font-medium px-2.5",
    ]),
    nav: cva([
        "UI-Calendar__nav",
        "absolute right-0 z-1",
    ]),
    navButton: cva([
        "UI-Calendar__navButton",
    ]),
    navButtonPrevious: cva([
        "UI-Calendar__navButtonPrevious",
        "left-1",
    ]),
    navButtonNext: cva([
        "UI-Calendar__navButtonNext",
        "right-1",
    ]),
    monthGrid: cva([
        "UI-Calendar__table",
        "w-full border-collapse",
    ]),
    weekDays: cva([
        "UI-Calendar__weekDays",
        "flex",
    ]),
    weekDay: cva([
        "UI-Calendar__weekDay",
        "text-[--muted] rounded-[--radius] w-9 font-normal text-[0.8rem]",
    ]),
    week: cva([
        "UI-Calendar__week",
        "flex w-full mt-2",
    ]),
    day: cva([
        "UI-Calendar__day",
        "h-9 w-9 text-center text-sm p-0 relative",
        "[&:has([aria-selected].day-range-end)]:rounded-r-[--radius]",
        "[&:has([aria-selected].day-outside)]:bg-[--subtle]/50",
        "[&:has([aria-selected])]:bg-[--subtle]",
        "first:[&:has([aria-selected])]:rounded-l-[--radius]",
        "last:[&:has([aria-selected])]:rounded-r-[--radius]",
        "focus-within:relative focus-within:z-20",
    ]),
    dayButton: cva([
        "UI-Calendar__dayButton",
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
    ]),
    rangeEnd: cva([
        "UI-Calendar__rangeEnd",
        "day-range-end",
    ]),
    selected: cva([
        "UI-Calendar__selected",
        "bg-brand text-white hover:bg-brand hover:text-white",
        "focus:bg-brand focus:text-white rounded-[--radius] font-semibold",
    ]),
    today: cva([
        "UI-Calendar__today",
        "bg-[--subtle] text-[--foreground] rounded-[--radius]",
    ]),
    outside: cva([
        "UI-Calendar__outside",
        "day-outside !text-[--muted] opacity-20",
        "aria-selected:bg-transparent",
        "aria-selected:opacity-30",
    ]),
    disabled: cva([
        "UI-Calendar__disabled",
        "text-[--muted] opacity-30",
    ]),
    rangeMiddle: cva([
        "UI-Calendar__rangeMiddle",
        "aria-selected:bg-[--subtle]",
        "aria-selected:text-[--foreground]",
    ]),
    dayHidden: cva([
        "UI-Calendar__dayHidden",
        "invisible",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

export type CalendarProps =
    React.ComponentProps<typeof DayPicker> &
    ComponentAnatomy<typeof CalendarAnatomy>

export function Calendar(props: CalendarProps) {

    const {
        className,
        classNames,
        monthsClass,
        monthClass,
        monthCaptionClass,
        captionLabelClass,
        navClass,
        navButtonClass,
        navButtonPreviousClass,
        navButtonNextClass,
        monthGridClass,
        weekDaysClass,
        weekDayClass,
        weekClass,
        dayClass,
        dayButtonClass,
        rangeEndClass,
        selectedClass,
        todayClass,
        outsideClass,
        disabledClass,
        rangeMiddleClass,
        dayHiddenClass,
        ...rest
    } = props

    return (
        <DayPicker
            fixedWeeks
            className={cn(CalendarAnatomy.root(), className)}
            classNames={{
                months: cn(CalendarAnatomy.months(), monthsClass),
                month: cn(CalendarAnatomy.month(), monthClass),
                month_caption: cn(CalendarAnatomy.monthCaption(), monthCaptionClass),
                caption_label: cn(CalendarAnatomy.captionLabel(), captionLabelClass),
                nav: cn(CalendarAnatomy.nav(), navClass),
                button_previous: cn(CalendarAnatomy.navButton(),
                    ButtonAnatomy.root({ size: "sm", intent: "gray-basic" }),
                    navButtonClass,
                    CalendarAnatomy.navButtonPrevious(),
                    navButtonPreviousClass),
                button_next: cn(CalendarAnatomy.navButton(),
                    ButtonAnatomy.root({ size: "sm", intent: "gray-basic" }),
                    navButtonClass,
                    CalendarAnatomy.navButtonNext(),
                    navButtonNextClass),
                month_grid: cn(CalendarAnatomy.monthGrid(), monthGridClass),
                weekdays: cn(CalendarAnatomy.weekDays(), weekDaysClass),
                weekday: cn(CalendarAnatomy.weekDay(), weekDayClass),
                week: cn(CalendarAnatomy.week(), weekClass),
                day: cn(CalendarAnatomy.day(), dayClass),
                day_button: cn(CalendarAnatomy.dayButton(), dayButtonClass),
                range_end: cn(CalendarAnatomy.rangeEnd(), rangeEndClass),
                selected: cn(CalendarAnatomy.selected(), selectedClass),
                today: cn(CalendarAnatomy.today(), todayClass),
                outside: cn(CalendarAnatomy.outside(), outsideClass),
                disabled: cn(CalendarAnatomy.disabled(), disabledClass),
                range_middle: cn(CalendarAnatomy.rangeMiddle(), rangeMiddleClass),
                hidden: cn(CalendarAnatomy.dayHidden(), dayHiddenClass),
                ...classNames,
            }}
            components={{
                Chevron: ({ ...props }) => props.orientation === "left" ? <svg
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
                </svg> : <svg
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
