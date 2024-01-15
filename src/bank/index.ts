// @ts-nocheck
import * as React from "react"

export type Bank = {
    [name: string]: {
        name: string,
        component: React.LazyExoticComponent<any>
        files: string[]
    }
}

export const Bank: Bank = {
    "button": {
        name: "button",
        component: React.lazy(() => import("@/workshop/button/button")),
        family: [],
        files: ["src/workshop/button/button.tsx", "src/workshop/button/close-button.tsx", "src/workshop/button/icon-button.tsx", "src/workshop/button/index.tsx"],
    },
    "close-button": {
        name: "close-button",
        component: React.lazy(() => import("@/workshop/button/close-button")),
        family: [],
        files: ["src/workshop/button/button.tsx", "src/workshop/button/close-button.tsx", "src/workshop/button/icon-button.tsx", "src/workshop/button/index.tsx"],
    },
    "icon-button": {
        name: "icon-button",
        component: React.lazy(() => import("@/workshop/button/icon-button")),
        family: [],
        files: ["src/workshop/button/button.tsx", "src/workshop/button/close-button.tsx", "src/workshop/button/icon-button.tsx", "src/workshop/button/index.tsx"],
    },
    "checkbox": {
        name: "checkbox",
        component: React.lazy(() => import("@/workshop/checkbox/checkbox")),
        family: ["basic-field", "input"],
        files: ["src/workshop/checkbox/checkbox-group.tsx", "src/workshop/checkbox/checkbox.tsx", "src/workshop/checkbox/index.tsx"],
    },
    "checkbox-group": {
        name: "checkbox-group",
        component: React.lazy(() => import("@/workshop/checkbox/checkbox-group")),
        family: ["basic-field", "input"],
        files: ["src/workshop/checkbox/checkbox-group.tsx", "src/workshop/checkbox/checkbox.tsx", "src/workshop/checkbox/index.tsx"],
    },
    "bar-chart": {
        name: "bar-chart",
        component: React.lazy(() => import("@/workshop/charts/bar-chart")),
        family: [],
        files: ["src/workshop/charts/area-chart.tsx", "src/workshop/charts/bar-chart.tsx", "src/workshop/charts/chart-legend.tsx", "src/workshop/charts/chart-tooltip.tsx", "src/workshop/charts/color-theme.ts", "src/workshop/charts/donut-chart.tsx", "src/workshop/charts/index.tsx", "src/workshop/charts/legend.tsx", "src/workshop/charts/line-chart.tsx", "src/workshop/charts/types.ts", "src/workshop/charts/utils.ts"],
    },
    "line-chart": {
        name: "line-chart",
        component: React.lazy(() => import("@/workshop/charts/line-chart")),
        family: [],
        files: ["src/workshop/charts/area-chart.tsx", "src/workshop/charts/bar-chart.tsx", "src/workshop/charts/chart-legend.tsx", "src/workshop/charts/chart-tooltip.tsx", "src/workshop/charts/color-theme.ts", "src/workshop/charts/donut-chart.tsx", "src/workshop/charts/index.tsx", "src/workshop/charts/legend.tsx", "src/workshop/charts/line-chart.tsx", "src/workshop/charts/types.ts", "src/workshop/charts/utils.ts"],
    },
    "area-chart": {
        name: "area-chart",
        component: React.lazy(() => import("@/workshop/charts/area-chart")),
        family: [],
        files: ["src/workshop/charts/area-chart.tsx", "src/workshop/charts/bar-chart.tsx", "src/workshop/charts/chart-legend.tsx", "src/workshop/charts/chart-tooltip.tsx", "src/workshop/charts/color-theme.ts", "src/workshop/charts/donut-chart.tsx", "src/workshop/charts/index.tsx", "src/workshop/charts/legend.tsx", "src/workshop/charts/line-chart.tsx", "src/workshop/charts/types.ts", "src/workshop/charts/utils.ts"],
    },
    "donut-chart": {
        name: "donut-chart",
        component: React.lazy(() => import("@/workshop/charts/donut-chart")),
        family: [],
        files: ["src/workshop/charts/area-chart.tsx", "src/workshop/charts/bar-chart.tsx", "src/workshop/charts/chart-legend.tsx", "src/workshop/charts/chart-tooltip.tsx", "src/workshop/charts/color-theme.ts", "src/workshop/charts/donut-chart.tsx", "src/workshop/charts/index.tsx", "src/workshop/charts/legend.tsx", "src/workshop/charts/line-chart.tsx", "src/workshop/charts/types.ts", "src/workshop/charts/utils.ts"],
    },
    "loading-spinner": {
        name: "loading-spinner",
        component: React.lazy(() => import("@/workshop/loading-spinner/loading-spinner")),
        family: [],
        files: ["src/workshop/loading-spinner/index.tsx", "src/workshop/loading-spinner/loading-overlay.tsx", "src/workshop/loading-spinner/loading-spinner.tsx"],
    },
    "loading-overlay": {
        name: "loading-overlay",
        component: React.lazy(() => import("@/workshop/loading-spinner/loading-overlay")),
        family: [],
        files: ["src/workshop/loading-spinner/index.tsx", "src/workshop/loading-spinner/loading-overlay.tsx", "src/workshop/loading-spinner/loading-spinner.tsx"],
    },
    "date-picker": {
        name: "date-picker",
        component: React.lazy(() => import("@/workshop/date-picker/date-picker")),
        family: ["basic-field", "calendar", "input", "modal", "popover", "select"],
        files: ["src/workshop/date-picker/date-picker.tsx", "src/workshop/date-picker/date-range-picker.tsx", "src/workshop/date-picker/index.tsx"],
    },
    "date-range-picker": {
        name: "date-range-picker",
        component: React.lazy(() => import("@/workshop/date-picker/date-range-picker")),
        family: ["basic-field", "calendar", "input", "modal", "popover", "select"],
        files: ["src/workshop/date-picker/date-picker.tsx", "src/workshop/date-picker/date-range-picker.tsx", "src/workshop/date-picker/index.tsx"],
    },
    "accordion": {
        name: "accordion",
        component: React.lazy(() => import("@/workshop/accordion/accordion")),
        family: [],
        files: ["src/workshop/accordion/accordion.tsx", "src/workshop/accordion/index.tsx"],
    },
    "address-input": {
        name: "address-input",
        component: React.lazy(() => import("@/workshop/address-input/address-input")),
        family: ["autocomplete"],
        files: ["src/workshop/address-input/address-input.tsx", "src/workshop/address-input/index.tsx", "src/workshop/address-input/use-address-autocomplete.ts"],
    },
    "alert": {
        name: "alert",
        component: React.lazy(() => import("@/workshop/alert/alert")),
        family: [],
        files: ["src/workshop/alert/alert.tsx", "src/workshop/alert/index.tsx"],
    },
    "app-layout": {
        name: "app-layout",
        component: React.lazy(() => import("@/workshop/app-layout/app-layout")),
        family: ["drawer"],
        files: ["src/workshop/app-layout/app-layout.tsx", "src/workshop/app-layout/app-sidebar.tsx", "src/workshop/app-layout/index.tsx"],
    },
    "autocomplete": {
        name: "autocomplete",
        component: React.lazy(() => import("@/workshop/autocomplete/autocomplete")),
        family: ["basic-field", "command", "input", "popover"],
        files: ["src/workshop/autocomplete/autocomplete.tsx", "src/workshop/autocomplete/index.tsx"],
    },
    "avatar": {
        name: "avatar",
        component: React.lazy(() => import("@/workshop/avatar/avatar")),
        family: [],
        files: ["src/workshop/avatar/avatar.tsx", "src/workshop/avatar/index.tsx"],
    },
    "badge": {
        name: "badge",
        component: React.lazy(() => import("@/workshop/badge/badge")),
        family: [],
        files: ["src/workshop/badge/badge.tsx", "src/workshop/badge/index.tsx"],
    },
    "breadcrumbs": {
        name: "breadcrumbs",
        component: React.lazy(() => import("@/workshop/breadcrumbs/breadcrumbs")),
        family: [],
        files: ["src/workshop/breadcrumbs/breadcrumbs.tsx", "src/workshop/breadcrumbs/index.tsx"],
    },
    "calendar": {
        name: "calendar",
        component: React.lazy(() => import("@/workshop/calendar/calendar")),
        family: ["button"],
        files: ["src/workshop/calendar/calendar.tsx", "src/workshop/calendar/index.tsx"],
    },
    "card": {
        name: "card",
        component: React.lazy(() => import("@/workshop/card/card")),
        family: [],
        files: ["src/workshop/card/card.tsx", "src/workshop/card/index.tsx"],
    },
    "carousel": {
        name: "carousel",
        component: React.lazy(() => import("@/workshop/carousel/carousel")),
        family: ["button"],
        files: ["src/workshop/carousel/carousel.tsx", "src/workshop/carousel/index.tsx"],
    },
    "collapsible": {
        name: "collapsible",
        component: React.lazy(() => import("@/workshop/collapsible/collapsible")),
        family: [],
        files: ["src/workshop/collapsible/collapsible.tsx", "src/workshop/collapsible/index.tsx"],
    },
    "combobox": {
        name: "combobox",
        component: React.lazy(() => import("@/workshop/combobox/combobox")),
        family: ["basic-field", "command", "input", "popover"],
        files: ["src/workshop/combobox/combobox.tsx", "src/workshop/combobox/index.tsx"],
    },
    "command": {
        name: "command",
        component: React.lazy(() => import("@/workshop/command/command")),
        family: ["input"],
        files: ["src/workshop/command/command.tsx", "src/workshop/command/index.tsx"],
    },
    "currency-input": {
        name: "currency-input",
        component: React.lazy(() => import("@/workshop/currency-input/currency-input")),
        family: ["basic-field", "input"],
        files: ["src/workshop/currency-input/currency-input.tsx", "src/workshop/currency-input/index.tsx"],
    },
    "datagrid": {
        name: "datagrid",
        component: React.lazy(() => import("@/workshop/datagrid/datagrid")),
        family: ["button", "checkbox", "date-picker", "dropdown-menu", "radio-group", "select", "card", "loading-spinner", "number-input", "pagination", "skeleton", "text-input", "tooltip"],
        files: ["src/workshop/datagrid/datagrid-cell-input-field.tsx", "src/workshop/datagrid/datagrid-filter.tsx", "src/workshop/datagrid/datagrid-instance.tsx", "src/workshop/datagrid/datagrid.tsx", "src/workshop/datagrid/helpers.ts", "src/workshop/datagrid/index.tsx", "src/workshop/datagrid/locales.ts", "src/workshop/datagrid/use-datagrid-editing.ts", "src/workshop/datagrid/use-datagrid-filtering.ts", "src/workshop/datagrid/use-datagrid-responsiveness.ts", "src/workshop/datagrid/use-datagrid-row-selection.ts", "src/workshop/datagrid/use-datagrid-size.ts"],
    },
    "disclosure": {
        name: "disclosure",
        component: React.lazy(() => import("@/workshop/disclosure/disclosure")),
        family: [],
        files: ["src/workshop/disclosure/disclosure.tsx", "src/workshop/disclosure/index.tsx"],
    },
    "drawer": {
        name: "drawer",
        component: React.lazy(() => import("@/workshop/drawer/drawer")),
        family: ["button"],
        files: ["src/workshop/drawer/drawer.tsx", "src/workshop/drawer/index.tsx"],
    },
    "dropdown-menu": {
        name: "dropdown-menu",
        component: React.lazy(() => import("@/workshop/dropdown-menu/dropdown-menu")),
        family: [],
        files: ["src/workshop/dropdown-menu/dropdown-menu.tsx", "src/workshop/dropdown-menu/index.tsx"],
    },
    "form": {
        name: "form",
        component: React.lazy(() => import("@/workshop/form/form")),
        family: ["button", "loading-spinner", "modal", "address-input", "autocomplete", "basic-field", "checkbox", "combobox", "currency-input", "date-picker", "simple-dropzone", "native-select", "number-input", "phone-input", "radio-group", "select", "switch", "text-input", "textarea"],
        files: ["src/workshop/form/danger-zone.tsx", "src/workshop/form/define-schema.ts", "src/workshop/form/fields.tsx", "src/workshop/form/form.tsx", "src/workshop/form/index.tsx", "src/workshop/form/locales.json", "src/workshop/form/polymorphic-component.ts", "src/workshop/form/schema-presets.ts", "src/workshop/form/submit-field.tsx", "src/workshop/form/zod-resolver.ts"],
    },
    "horizontal-draggable-scroll": {
        name: "horizontal-draggable-scroll",
        component: React.lazy(() => import("@/workshop/horizontal-draggable-scroll/horizontal-draggable-scroll")),
        family: [],
        files: ["src/workshop/horizontal-draggable-scroll/horizontal-draggable-scroll.tsx", "src/workshop/horizontal-draggable-scroll/index.tsx", "src/workshop/horizontal-draggable-scroll/use-draggable-scroll.ts"],
    },
    "hover-card": {
        name: "hover-card",
        component: React.lazy(() => import("@/workshop/hover-card/hover-card")),
        family: [],
        files: ["src/workshop/hover-card/hover-card.tsx", "src/workshop/hover-card/index.tsx"],
    },
    "modal": {
        name: "modal",
        component: React.lazy(() => import("@/workshop/modal/modal")),
        family: ["button"],
        files: ["src/workshop/modal/index.tsx", "src/workshop/modal/modal.tsx"],
    },
    "native-select": {
        name: "native-select",
        component: React.lazy(() => import("@/workshop/native-select/native-select")),
        family: ["basic-field", "input"],
        files: ["src/workshop/native-select/index.tsx", "src/workshop/native-select/native-select.tsx"],
    },
    "navigation-menu": {
        name: "navigation-menu",
        component: React.lazy(() => import("@/workshop/navigation-menu/navigation-menu")),
        family: ["drawer", "vertical-menu"],
        files: ["src/workshop/navigation-menu/index.tsx", "src/workshop/navigation-menu/navigation-menu.tsx"],
    },
    "number-input": {
        name: "number-input",
        component: React.lazy(() => import("@/workshop/number-input/number-input")),
        family: ["basic-field", "button", "input"],
        files: ["src/workshop/number-input/index.tsx", "src/workshop/number-input/number-input.tsx"],
    },
    "page-header": {
        name: "page-header",
        component: React.lazy(() => import("@/workshop/page-header/page-header")),
        family: [],
        files: ["src/workshop/page-header/index.tsx", "src/workshop/page-header/page-header.tsx"],
    },
    "pagination": {
        name: "pagination",
        component: React.lazy(() => import("@/workshop/pagination/pagination")),
        family: [],
        files: ["src/workshop/pagination/index.tsx", "src/workshop/pagination/pagination.tsx"],
    },
    "phone-input": {
        name: "phone-input",
        component: React.lazy(() => import("@/workshop/phone-input/phone-input")),
        family: ["basic-field", "input"],
        files: ["src/workshop/phone-input/index.tsx", "src/workshop/phone-input/phone-input.tsx"],
    },
    "popover": {
        name: "popover",
        component: React.lazy(() => import("@/workshop/popover/popover")),
        family: [],
        files: ["src/workshop/popover/index.tsx", "src/workshop/popover/popover.tsx"],
    },
    "progress-bar": {
        name: "progress-bar",
        component: React.lazy(() => import("@/workshop/progress-bar/progress-bar")),
        family: [],
        files: ["src/workshop/progress-bar/index.tsx", "src/workshop/progress-bar/progress-bar.tsx"],
    },
    "radio-group": {
        name: "radio-group",
        component: React.lazy(() => import("@/workshop/radio-group/radio-group")),
        family: ["input", "basic-field"],
        files: ["src/workshop/radio-group/index.tsx", "src/workshop/radio-group/radio-group.tsx"],
    },
    "scroll-area": {
        name: "scroll-area",
        component: React.lazy(() => import("@/workshop/scroll-area/scroll-area")),
        family: [],
        files: ["src/workshop/scroll-area/index.tsx", "src/workshop/scroll-area/scroll-area.tsx"],
    },
    "select": {
        name: "select",
        component: React.lazy(() => import("@/workshop/select/select")),
        family: ["basic-field", "input"],
        files: ["src/workshop/select/index.tsx", "src/workshop/select/select.tsx"],
    },
    "separator": {
        name: "separator",
        component: React.lazy(() => import("@/workshop/separator/separator")),
        family: [],
        files: ["src/workshop/separator/index.tsx", "src/workshop/separator/separator.tsx"],
    },
    "simple-dropzone": {
        name: "simple-dropzone",
        component: React.lazy(() => import("@/workshop/simple-dropzone/simple-dropzone")),
        family: ["basic-field", "button", "input"],
        files: ["src/workshop/simple-dropzone/index.tsx", "src/workshop/simple-dropzone/simple-dropzone.tsx"],
    },
    "skeleton": {
        name: "skeleton",
        component: React.lazy(() => import("@/workshop/skeleton/skeleton")),
        family: [],
        files: ["src/workshop/skeleton/index.tsx", "src/workshop/skeleton/skeleton.tsx"],
    },
    "stats": {
        name: "stats",
        component: React.lazy(() => import("@/workshop/stats/stats")),
        family: [],
        files: ["src/workshop/stats/index.tsx", "src/workshop/stats/stats.tsx"],
    },
    "switch": {
        name: "switch",
        component: React.lazy(() => import("@/workshop/switch/switch")),
        family: ["basic-field", "input"],
        files: ["src/workshop/switch/index.tsx", "src/workshop/switch/switch.tsx"],
    },
    "table": {
        name: "table",
        component: React.lazy(() => import("@/workshop/table/table")),
        family: [],
        files: ["src/workshop/table/index.tsx", "src/workshop/table/table.tsx"],
    },
    "tabs": {
        name: "tabs",
        component: React.lazy(() => import("@/workshop/tabs/tabs")),
        family: [],
        files: ["src/workshop/tabs/index.tsx", "src/workshop/tabs/static-tabs.tsx", "src/workshop/tabs/tabs.tsx"],
    },
    "text-input": {
        name: "text-input",
        component: React.lazy(() => import("@/workshop/text-input/text-input")),
        family: ["basic-field", "input"],
        files: ["src/workshop/text-input/index.tsx", "src/workshop/text-input/text-input.tsx"],
    },
    "textarea": {
        name: "textarea",
        component: React.lazy(() => import("@/workshop/textarea/textarea")),
        family: ["basic-field", "input"],
        files: ["src/workshop/textarea/index.tsx", "src/workshop/textarea/textarea.tsx"],
    },
    "timeline": {
        name: "timeline",
        component: React.lazy(() => import("@/workshop/timeline/timeline")),
        family: [],
        files: ["src/workshop/timeline/index.tsx", "src/workshop/timeline/timeline.tsx"],
    },
    "toaster": {
        name: "toaster",
        component: React.lazy(() => import("@/workshop/toaster/toaster")),
        family: [],
        files: ["src/workshop/toaster/index.tsx", "src/workshop/toaster/toaster.tsx"],
    },
    "tooltip": {
        name: "tooltip",
        component: React.lazy(() => import("@/workshop/tooltip/tooltip")),
        family: [],
        files: ["src/workshop/tooltip/index.tsx", "src/workshop/tooltip/tooltip.tsx"],
    },
    "vertical-menu": {
        name: "vertical-menu",
        component: React.lazy(() => import("@/workshop/vertical-menu/vertical-menu")),
        family: ["disclosure"],
        files: ["src/workshop/vertical-menu/index.tsx", "src/workshop/vertical-menu/vertical-menu.tsx"],
    },
    "accordion-demo": {
        name: "accordion-demo",
        component: React.lazy(() => import("@/demo/accordion-demo")),
        family: [],
        files: ["src/demo/accordion-demo.tsx"],
    },
    "address-input-custom-demo": {
        name: "address-input-custom-demo",
        component: React.lazy(() => import("@/demo/address-input-custom-demo")),
        family: [],
        files: ["src/demo/address-input-custom-demo.tsx"],
    },
    "address-input-demo": {
        name: "address-input-demo",
        component: React.lazy(() => import("@/demo/address-input-demo")),
        family: [],
        files: ["src/demo/address-input-demo.tsx"],
    },
    "address-input-uncontrolled-demo": {
        name: "address-input-uncontrolled-demo",
        component: React.lazy(() => import("@/demo/address-input-uncontrolled-demo")),
        family: [],
        files: ["src/demo/address-input-uncontrolled-demo.tsx"],
    },
    "alert-demo": {
        name: "alert-demo",
        component: React.lazy(() => import("@/demo/alert-demo")),
        family: [],
        files: ["src/demo/alert-demo.tsx"],
    },
    "alert-intent-demo": {
        name: "alert-intent-demo",
        component: React.lazy(() => import("@/demo/alert-intent-demo")),
        family: [],
        files: ["src/demo/alert-intent-demo.tsx"],
    },
    "app-layout-demo": {
        name: "app-layout-demo",
        component: React.lazy(() => import("@/demo/app-layout-demo")),
        family: [],
        files: ["src/demo/app-layout-demo.tsx"],
    },
    "area-chart-demo": {
        name: "area-chart-demo",
        component: React.lazy(() => import("@/demo/area-chart-demo")),
        family: [],
        files: ["src/demo/area-chart-demo.tsx"],
    },
    "autocomplete-demo": {
        name: "autocomplete-demo",
        component: React.lazy(() => import("@/demo/autocomplete-demo")),
        family: [],
        files: ["src/demo/autocomplete-demo.tsx"],
    },
    "avatar-demo": {
        name: "avatar-demo",
        component: React.lazy(() => import("@/demo/avatar-demo")),
        family: [],
        files: ["src/demo/avatar-demo.tsx"],
    },
    "badge-demo": {
        name: "badge-demo",
        component: React.lazy(() => import("@/demo/badge-demo")),
        family: [],
        files: ["src/demo/badge-demo.tsx"],
    },
    "bar-chart-demo": {
        name: "bar-chart-demo",
        component: React.lazy(() => import("@/demo/bar-chart-demo")),
        family: [],
        files: ["src/demo/bar-chart-demo.tsx"],
    },
    "breadcrumbs-demo": {
        name: "breadcrumbs-demo",
        component: React.lazy(() => import("@/demo/breadcrumbs-demo")),
        family: [],
        files: ["src/demo/breadcrumbs-demo.tsx"],
    },
    "button-demo": {
        name: "button-demo",
        component: React.lazy(() => import("@/demo/button-demo")),
        family: [],
        files: ["src/demo/button-demo.tsx"],
    },
    "calendar-demo": {
        name: "calendar-demo",
        component: React.lazy(() => import("@/demo/calendar-demo")),
        family: [],
        files: ["src/demo/calendar-demo.tsx"],
    },
    "card-demo": {
        name: "card-demo",
        component: React.lazy(() => import("@/demo/card-demo")),
        family: [],
        files: ["src/demo/card-demo.tsx"],
    },
    "carousel-demo": {
        name: "carousel-demo",
        component: React.lazy(() => import("@/demo/carousel-demo")),
        family: [],
        files: ["src/demo/carousel-demo.tsx"],
    },
    "checkbox-demo": {
        name: "checkbox-demo",
        component: React.lazy(() => import("@/demo/checkbox-demo")),
        family: [],
        files: ["src/demo/checkbox-demo.tsx"],
    },
    "checkbox-group-demo": {
        name: "checkbox-group-demo",
        component: React.lazy(() => import("@/demo/checkbox-group-demo")),
        family: [],
        files: ["src/demo/checkbox-group-demo.tsx"],
    },
    "close-button-demo": {
        name: "close-button-demo",
        component: React.lazy(() => import("@/demo/close-button-demo")),
        family: [],
        files: ["src/demo/close-button-demo.tsx"],
    },
    "collapsible-demo": {
        name: "collapsible-demo",
        component: React.lazy(() => import("@/demo/collapsible-demo")),
        family: [],
        files: ["src/demo/collapsible-demo.tsx"],
    },
    "combobox-demo": {
        name: "combobox-demo",
        component: React.lazy(() => import("@/demo/combobox-demo")),
        family: [],
        files: ["src/demo/combobox-demo.tsx"],
    },
    "command-demo": {
        name: "command-demo",
        component: React.lazy(() => import("@/demo/command-demo")),
        family: [],
        files: ["src/demo/command-demo.tsx"],
    },
    "currency-input-demo": {
        name: "currency-input-demo",
        component: React.lazy(() => import("@/demo/currency-input-demo")),
        family: [],
        files: ["src/demo/currency-input-demo.tsx"],
    },
    "date-picker-demo": {
        name: "date-picker-demo",
        component: React.lazy(() => import("@/demo/date-picker-demo")),
        family: [],
        files: ["src/demo/date-picker-demo.tsx"],
    },
    "date-range-picker-demo": {
        name: "date-range-picker-demo",
        component: React.lazy(() => import("@/demo/date-range-picker-demo")),
        family: [],
        files: ["src/demo/date-range-picker-demo.tsx"],
    },
    "disclosure-demo": {
        name: "disclosure-demo",
        component: React.lazy(() => import("@/demo/disclosure-demo")),
        family: [],
        files: ["src/demo/disclosure-demo.tsx"],
    },
    "donut-chart-demo": {
        name: "donut-chart-demo",
        component: React.lazy(() => import("@/demo/donut-chart-demo")),
        family: [],
        files: ["src/demo/donut-chart-demo.tsx"],
    },
    "drawer-demo": {
        name: "drawer-demo",
        component: React.lazy(() => import("@/demo/drawer-demo")),
        family: [],
        files: ["src/demo/drawer-demo.tsx"],
    },
    "dropdown-menu-demo": {
        name: "dropdown-menu-demo",
        component: React.lazy(() => import("@/demo/dropdown-menu-demo")),
        family: [],
        files: ["src/demo/dropdown-menu-demo.tsx"],
    },
    "form-demo": {
        name: "form-demo",
        component: React.lazy(() => import("@/demo/form-demo")),
        family: [],
        files: ["src/demo/form-demo.tsx"],
    },
    "horizontal-draggable-scroll-demo": {
        name: "horizontal-draggable-scroll-demo",
        component: React.lazy(() => import("@/demo/horizontal-draggable-scroll-demo")),
        family: [],
        files: ["src/demo/horizontal-draggable-scroll-demo.tsx"],
    },
    "hover-card-demo": {
        name: "hover-card-demo",
        component: React.lazy(() => import("@/demo/hover-card-demo")),
        family: [],
        files: ["src/demo/hover-card-demo.tsx"],
    },
    "icon-button-demo": {
        name: "icon-button-demo",
        component: React.lazy(() => import("@/demo/icon-button-demo")),
        family: [],
        files: ["src/demo/icon-button-demo.tsx"],
    },
    "line-chart-demo": {
        name: "line-chart-demo",
        component: React.lazy(() => import("@/demo/line-chart-demo")),
        family: [],
        files: ["src/demo/line-chart-demo.tsx"],
    },
    "loading-overlay-demo": {
        name: "loading-overlay-demo",
        component: React.lazy(() => import("@/demo/loading-overlay-demo")),
        family: [],
        files: ["src/demo/loading-overlay-demo.tsx"],
    },
    "loading-spinner-demo": {
        name: "loading-spinner-demo",
        component: React.lazy(() => import("@/demo/loading-spinner-demo")),
        family: [],
        files: ["src/demo/loading-spinner-demo.tsx"],
    },
    "modal-demo": {
        name: "modal-demo",
        component: React.lazy(() => import("@/demo/modal-demo")),
        family: [],
        files: ["src/demo/modal-demo.tsx"],
    },
    "native-select-demo": {
        name: "native-select-demo",
        component: React.lazy(() => import("@/demo/native-select-demo")),
        family: [],
        files: ["src/demo/native-select-demo.tsx"],
    },
    "navigation-menu-demo": {
        name: "navigation-menu-demo",
        component: React.lazy(() => import("@/demo/navigation-menu-demo")),
        family: [],
        files: ["src/demo/navigation-menu-demo.tsx"],
    },
    "number-input-demo": {
        name: "number-input-demo",
        component: React.lazy(() => import("@/demo/number-input-demo")),
        family: [],
        files: ["src/demo/number-input-demo.tsx"],
    },
    "page-header-demo": {
        name: "page-header-demo",
        component: React.lazy(() => import("@/demo/page-header-demo")),
        family: [],
        files: ["src/demo/page-header-demo.tsx"],
    },
    "pagination-demo": {
        name: "pagination-demo",
        component: React.lazy(() => import("@/demo/pagination-demo")),
        family: [],
        files: ["src/demo/pagination-demo.tsx"],
    },
    "phone-input-demo": {
        name: "phone-input-demo",
        component: React.lazy(() => import("@/demo/phone-input-demo")),
        family: [],
        files: ["src/demo/phone-input-demo.tsx"],
    },
    "popover-demo": {
        name: "popover-demo",
        component: React.lazy(() => import("@/demo/popover-demo")),
        family: [],
        files: ["src/demo/popover-demo.tsx"],
    },
    "progress-bar-demo": {
        name: "progress-bar-demo",
        component: React.lazy(() => import("@/demo/progress-bar-demo")),
        family: [],
        files: ["src/demo/progress-bar-demo.tsx"],
    },
    "radio-group-demo": {
        name: "radio-group-demo",
        component: React.lazy(() => import("@/demo/radio-group-demo")),
        family: [],
        files: ["src/demo/radio-group-demo.tsx"],
    },
    "scroll-area-demo": {
        name: "scroll-area-demo",
        component: React.lazy(() => import("@/demo/scroll-area-demo")),
        family: [],
        files: ["src/demo/scroll-area-demo.tsx"],
    },
    "select-demo": {
        name: "select-demo",
        component: React.lazy(() => import("@/demo/select-demo")),
        family: [],
        files: ["src/demo/select-demo.tsx"],
    },
    "separator-demo": {
        name: "separator-demo",
        component: React.lazy(() => import("@/demo/separator-demo")),
        family: [],
        files: ["src/demo/separator-demo.tsx"],
    },
    "simple-dropzone-demo": {
        name: "simple-dropzone-demo",
        component: React.lazy(() => import("@/demo/simple-dropzone-demo")),
        family: [],
        files: ["src/demo/simple-dropzone-demo.tsx"],
    },
    "skeleton-demo": {
        name: "skeleton-demo",
        component: React.lazy(() => import("@/demo/skeleton-demo")),
        family: [],
        files: ["src/demo/skeleton-demo.tsx"],
    },
    "stats-demo": {
        name: "stats-demo",
        component: React.lazy(() => import("@/demo/stats-demo")),
        family: [],
        files: ["src/demo/stats-demo.tsx"],
    },
    "switch-demo": {
        name: "switch-demo",
        component: React.lazy(() => import("@/demo/switch-demo")),
        family: [],
        files: ["src/demo/switch-demo.tsx"],
    },
    "table-demo": {
        name: "table-demo",
        component: React.lazy(() => import("@/demo/table-demo")),
        family: [],
        files: ["src/demo/table-demo.tsx"],
    },
    "tabs-demo": {
        name: "tabs-demo",
        component: React.lazy(() => import("@/demo/tabs-demo")),
        family: [],
        files: ["src/demo/tabs-demo.tsx"],
    },
    "text-input-demo": {
        name: "text-input-demo",
        component: React.lazy(() => import("@/demo/text-input-demo")),
        family: [],
        files: ["src/demo/text-input-demo.tsx"],
    },
    "textarea-demo": {
        name: "textarea-demo",
        component: React.lazy(() => import("@/demo/textarea-demo")),
        family: [],
        files: ["src/demo/textarea-demo.tsx"],
    },
    "timeline-demo": {
        name: "timeline-demo",
        component: React.lazy(() => import("@/demo/timeline-demo")),
        family: [],
        files: ["src/demo/timeline-demo.tsx"],
    },
    "toaster-demo": {
        name: "toaster-demo",
        component: React.lazy(() => import("@/demo/toaster-demo")),
        family: [],
        files: ["src/demo/toaster-demo.tsx"],
    },
    "tooltip-demo": {
        name: "tooltip-demo",
        component: React.lazy(() => import("@/demo/tooltip-demo")),
        family: [],
        files: ["src/demo/tooltip-demo.tsx"],
    },
    "vertical-menu-demo": {
        name: "vertical-menu-demo",
        component: React.lazy(() => import("@/demo/vertical-menu-demo")),
        family: [],
        files: ["src/demo/vertical-menu-demo.tsx"],
    },
    "datagrid-demo": {
        name: "datagrid-demo",
        component: React.lazy(() => import("@/demo/datagrid/datagrid-demo")),
        family: [],
        files: ["src/demo/datagrid/datagrid-demo.tsx"],
    },
    "datagrid-editing-server-side-validation-demo": {
        name: "datagrid-editing-server-side-validation-demo",
        component: React.lazy(() => import("@/demo/datagrid/datagrid-editing-server-side-validation-demo")),
        family: [],
        files: ["src/demo/datagrid/datagrid-editing-server-side-validation-demo.tsx"],
    },
    "datagrid-server-side-demo": {
        name: "datagrid-server-side-demo",
        component: React.lazy(() => import("@/demo/datagrid/datagrid-server-side-demo")),
        family: [],
        files: ["src/demo/datagrid/datagrid-server-side-demo.tsx"],
    },
}
