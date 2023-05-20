import { cva } from "class-variance-authority"
import { AvatarAnatomy, AvatarShowcaseAnatomy } from "../avatar"
import { BadgeAnatomy } from "../badge"
import { ButtonAnatomy, IconButtonAnatomy } from "../button"
import { CalendarAnatomy, CalendarCellAnatomy, CalendarGridAnatomy } from "../calendar"
import { CheckboxAnatomy } from "../checkbox"
import { ComboboxAnatomy } from "../combobox"
import { DatePickerAnatomy, DateRangePickerAnatomy, DateSegmentAnatomy, TimeInputAnatomy } from "../date-time"
import { InputAddonsAnatomy, InputAnatomy } from "../input"
import { LoadingOverlayAnatomy, LoadingSpinnerAnatomy } from "../loading-spinner"
import { DrawerAnatomy, ModalAnatomy } from "../modal"
import { MultiSelectAnatomy } from "../multi-select"
import { NumberInputAnatomy } from "../number-input"
import { PageHeaderAnatomy } from "../page-header"
import { RadioGroupAnatomy } from "../radio-group"
import { SkeletonAnatomy } from "../skeleton"
import { SwitchAnatomy } from "../switch"
import { Anatomy, defineStyleAnatomy } from "./style-anatomy"

// ----------------------------------------------------------------------------------------------------------- //

export const BasicFieldAnatomy = defineStyleAnatomy({
   fieldLabel: cva("UI-BasicField__fieldLabel block text-md sm:text-lg font-semibold self-start", {
      variants: {
         hasError: {
            true: "text-red-500",
            false: null,
         },
      },
   }),
   fieldAsterisk: cva("UI-BasicField__fieldAsterisk ml-1 text-red-500 text-sm"),
   fieldDetails: cva("UI-BasicField__fieldDetails"),
   field: cva("UI-BasicField__field w-full space-y-1"),
   fieldHelpText: cva("UI-BasicField__fieldHelpText text-sm text-gray-500"),
   fieldErrorText: cva("UI-BasicField__fieldErrorText text-sm text-red-500"),
})

export const DangerZoneAnatomy = defineStyleAnatomy({
   container: cva("UI-DangerZone__container p-4 flex flex-col sm:flex-row gap-2 text-center sm:text-left rounded-md border border-red-400"),
   icon: cva("UI-DangerZone__icon place-self-center sm:place-self-start text-red-500 w-4 mt-2"),
   title: cva("UI-DangerZone__title text-lg text-red-500 font-semibold"),
   dialogTitle: cva("UI-DangerZone__dialogTitle text-lg font-medium leading-6 text-gray-900"),
   dialogBody: cva("UI-DangerZone__dialogBody mt-2 text-sm text-gray-500"),
   dialogAction: cva("UI-DangerZone__dialogAction mt-4 flex gap-2"),
})

// ----------------------------------------------------------------------------------------------------------- //

export function defineStyleLibrary<A extends { [key: string]: Anatomy } = { [key: string]: Anatomy }>(config: A) {
   return config
}

/**
 * @internal
 */
export const StyleLibrary = defineStyleLibrary({
   BasicField: BasicFieldAnatomy,
   Switch: SwitchAnatomy,
   Avatar: AvatarAnatomy,
   InputAddons: InputAddonsAnatomy,
   Badge: BadgeAnatomy,
   AvatarShowcase: AvatarShowcaseAnatomy,
   Button: ButtonAnatomy,
   IconButton: IconButtonAnatomy,
   Checkbox: CheckboxAnatomy,
   Combobox: ComboboxAnatomy,
   DateSegment: DateSegmentAnatomy,
   DatePicker: DatePickerAnatomy,
   DateRangePicker: DateRangePickerAnatomy,
   TimeInput: TimeInputAnatomy,
   LoadingOverlay: LoadingOverlayAnatomy,
   LoadingSpinner: LoadingSpinnerAnatomy,
   Modal: ModalAnatomy,
   Drawer: DrawerAnatomy,
   MultiSelect: MultiSelectAnatomy,
   NumberInput: NumberInputAnatomy,
   PageHeader: PageHeaderAnatomy,
   Input: InputAnatomy,
   RadioGroup: RadioGroupAnatomy,
   Skeleton: SkeletonAnatomy,
   Calendar: CalendarAnatomy,
   CalendarCell: CalendarCellAnatomy,
   CalendarGrid: CalendarGridAnatomy,
   DangerZone: DangerZoneAnatomy,
})

/**
 * @internal
 */
export type UIStyleLibrary = typeof StyleLibrary
