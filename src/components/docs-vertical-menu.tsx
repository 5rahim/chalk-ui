import { useAppSidebarContext } from "@/workshop/app-layout"
import { Separator } from "@/workshop/separator"
import { VerticalMenu } from "@/workshop/vertical-menu"
import { usePathname } from "next/navigation"
import React from "react"

type DocsVerticalMenuProps = {
    children?: React.ReactNode
}

export function DocsVerticalMenu(props: DocsVerticalMenuProps) {

    const {
        children,
        ...rest
    } = props

    const pathname = usePathname()

    const ctx = useAppSidebarContext()

    return (
        <div className="space-y-4">
            <VerticalMenu
                onLinkItemClick={() => ctx.setOpen(false)}
                itemClass="h-8 data-[current=true]:text-[--brand]"
                items={[
                    {
                        name: "Getting started",
                        href: "/docs",
                        isCurrent: pathname === "/docs",
                    },
                    {
                        name: "Customization",
                        href: "/docs/customization",
                        isCurrent: pathname === "/docs/customization",
                    },
                    {
                        name: "Dark Mode",
                        href: "/docs/dark-mode",
                        isCurrent: pathname === "/docs/dark-mode",
                    },
                    {
                        name: "CLI",
                        href: "/docs/cli",
                        isCurrent: pathname === "/docs/cli",
                    },
                ]}
            />
            <Separator />
            <h6 className="pb-2 text-[--muted]">Components</h6>
            <VerticalMenu
                onLinkItemClick={() => ctx.setOpen(false)}
                itemClass="h-8 data-[current=true]:text-[--brand]"
                items={[
                    {
                        name: "Accordion",
                        href: "/docs/components/accordion",
                        isCurrent: pathname === "/docs/components/accordion",
                    },
                    {
                        name: "Address Input",
                        href: "/docs/components/address-input",
                        isCurrent: pathname === "/docs/components/address-input",
                    },
                    {
                        name: "Alert",
                        href: "/docs/components/alert",
                        isCurrent: pathname === "/docs/components/alert",
                    },
                    {
                        name: "App Layout",
                        href: "/docs/components/app-layout",
                        isCurrent: pathname === "/docs/components/app-layout",
                    },
                    {
                        name: "Autocomplete",
                        href: "/docs/components/autocomplete",
                        isCurrent: pathname === "/docs/components/autocomplete",
                    },
                    {
                        name: "Avatar",
                        href: "/docs/components/avatar",
                        isCurrent: pathname === "/docs/components/avatar",
                    },
                    {
                        name: "Badge",
                        href: "/docs/components/badge",
                        isCurrent: pathname === "/docs/components/badge",
                    },
                    {
                        name: "Breadcrumbs",
                        href: "/docs/components/breadcrumbs",
                        isCurrent: pathname === "/docs/components/breadcrumbs",
                    },
                    {
                        name: "Button",
                        href: "/docs/components/button",
                        isCurrent: pathname === "/docs/components/button",
                    },
                    {
                        name: "Calendar",
                        href: "/docs/components/calendar",
                        isCurrent: pathname === "/docs/components/calendar",
                    },
                    {
                        name: "Card",
                        href: "/docs/components/card",
                        isCurrent: pathname === "/docs/components/card",
                    },
                    {
                        name: "Carousel",
                        href: "/docs/components/carousel",
                        isCurrent: pathname === "/docs/components/carousel",
                    },
                    {
                        name: "Chart (Area)",
                        href: "/docs/components/area-chart",
                        isCurrent: pathname === "/docs/components/area-chart",
                    },
                    {
                        name: "Chart (Bar)",
                        href: "/docs/components/bar-chart",
                        isCurrent: pathname === "/docs/components/bar-chart",
                    },
                    {
                        name: "Chart (Donut)",
                        href: "/docs/components/donut-chart",
                        isCurrent: pathname === "/docs/components/donut-chart",
                    },
                    {
                        name: "Chart (Line)",
                        href: "/docs/components/line-chart",
                        isCurrent: pathname === "/docs/components/line-chart",
                    },
                    {
                        name: "Checkbox",
                        href: "/docs/components/checkbox",
                        isCurrent: pathname === "/docs/components/checkbox",
                    },
                    {
                        name: "Checkbox Group",
                        href: "/docs/components/checkbox-group",
                        isCurrent: pathname === "/docs/components/checkbox-group",
                    },
                    {
                        name: "Collapsible",
                        href: "/docs/components/collapsible",
                        isCurrent: pathname === "/docs/components/collapsible",
                    },
                    {
                        name: "Combobox",
                        href: "/docs/components/combobox",
                        isCurrent: pathname === "/docs/components/combobox",
                    },
                    {
                        name: "Command",
                        href: "/docs/components/command",
                        isCurrent: pathname === "/docs/components/command",
                    },
                    {
                        name: "Currency Input",
                        href: "/docs/components/currency-input",
                        isCurrent: pathname === "/docs/components/currency-input",
                    },
                    {
                        name: "DataGrid",
                        href: "/docs/components/datagrid",
                        isCurrent: pathname === "/docs/components/datagrid",
                    },
                    {
                        name: "Date Picker",
                        href: "/docs/components/date-picker",
                        isCurrent: pathname === "/docs/components/date-picker",
                    },
                    {
                        name: "Date Range Picker",
                        href: "/docs/components/date-range-picker",
                        isCurrent: pathname === "/docs/components/date-range-picker",
                    },
                    {
                        name: "Disclosure",
                        href: "/docs/components/disclosure",
                        isCurrent: pathname === "/docs/components/disclosure",
                    },
                    {
                        name: "Drawer",
                        href: "/docs/components/drawer",
                        isCurrent: pathname === "/docs/components/drawer",
                    },
                    {
                        name: "Dropdown Menu",
                        href: "/docs/components/dropdown-menu",
                        isCurrent: pathname === "/docs/components/dropdown-menu",
                    },
                    {
                        name: "Form",
                        href: "/docs/components/form",
                        isCurrent: pathname === "/docs/components/form",
                    },
                    {
                        name: "Horizontal Draggable Scroll",
                        href: "/docs/components/horizontal-draggable-scroll",
                        isCurrent: pathname === "/docs/components/horizontal-draggable-scroll",
                    },
                    {
                        name: "Hover Card",
                        href: "/docs/components/hover-card",
                        isCurrent: pathname === "/docs/components/hover-card",
                    },
                    {
                        name: "Loading Spinner",
                        href: "/docs/components/loading-spinner",
                        isCurrent: pathname === "/docs/components/loading-spinner",
                    },
                    {
                        name: "Loading Overlay",
                        href: "/docs/components/loading-overlay",
                        isCurrent: pathname === "/docs/components/loading-overlay",
                    },
                    {
                        name: "Modal",
                        href: "/docs/components/modal",
                        isCurrent: pathname === "/docs/components/modal",
                    },
                    {
                        name: "Native Select",
                        href: "/docs/components/native-select",
                        isCurrent: pathname === "/docs/components/native-select",
                    },
                    {
                        name: "Navigation Menu",
                        href: "/docs/components/navigation-menu",
                        isCurrent: pathname === "/docs/components/navigation-menu",
                    },
                    {
                        name: "Number Input",
                        href: "/docs/components/number-input",
                        isCurrent: pathname === "/docs/components/number-input",
                    },
                    {
                        name: "Page Header",
                        href: "/docs/components/page-header",
                        isCurrent: pathname === "/docs/components/page-header",
                    },
                    {
                        name: "Pagination",
                        href: "/docs/components/pagination",
                        isCurrent: pathname === "/docs/components/pagination",
                    },
                    {
                        name: "Phone Input",
                        href: "/docs/components/phone-input",
                        isCurrent: pathname === "/docs/components/phone-input",
                    },
                    {
                        name: "Popover",
                        href: "/docs/components/popover",
                        isCurrent: pathname === "/docs/components/popover",
                    },
                    {
                        name: "Progress Bar",
                        href: "/docs/components/progress-bar",
                        isCurrent: pathname === "/docs/components/progress-bar",
                    },
                    {
                        name: "Radio Group",
                        href: "/docs/components/radio-group",
                        isCurrent: pathname === "/docs/components/radio-group",
                    },
                    {
                        name: "Scroll Area",
                        href: "/docs/components/scroll-area",
                        isCurrent: pathname === "/docs/components/scroll-area",
                    },
                    {
                        name: "Select",
                        href: "/docs/components/select",
                        isCurrent: pathname === "/docs/components/select",
                    },
                    {
                        name: "Separator",
                        href: "/docs/components/separator",
                        isCurrent: pathname === "/docs/components/separator",
                    },
                    {
                        name: "Simple Dropzone",
                        href: "/docs/components/simple-dropzone",
                        isCurrent: pathname === "/docs/components/simple-dropzone",
                    },
                    {
                        name: "Skeleton",
                        href: "/docs/components/skeleton",
                        isCurrent: pathname === "/docs/components/skeleton",
                    },
                    {
                        name: "Stats",
                        href: "/docs/components/stats",
                        isCurrent: pathname === "/docs/components/stats",
                    },
                    {
                        name: "Switch",
                        href: "/docs/components/switch",
                        isCurrent: pathname === "/docs/components/switch",
                    },
                    {
                        name: "Table",
                        href: "/docs/components/table",
                        isCurrent: pathname === "/docs/components/table",
                    },
                    {
                        name: "Text Input",
                        href: "/docs/components/text-input",
                        isCurrent: pathname === "/docs/components/text-input",
                    },
                    {
                        name: "Textarea",
                        href: "/docs/components/textarea",
                        isCurrent: pathname === "/docs/components/textarea",
                    },
                    {
                        name: "Timeline",
                        href: "/docs/components/timeline",
                        isCurrent: pathname === "/docs/components/timeline",
                    },
                    {
                        name: "Toaster",
                        href: "/docs/components/toaster",
                        isCurrent: pathname === "/docs/components/toaster",
                    },
                    {
                        name: "Tooltip",
                        href: "/docs/components/tooltip",
                        isCurrent: pathname === "/docs/components/tooltip",
                    },
                    {
                        name: "Vertical Menu",
                        href: "/docs/components/vertical-menu",
                        isCurrent: pathname === "/docs/components/vertical-menu",
                    },
                ]}
            />
        </div>
    )
}
