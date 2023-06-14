"use client"

import React, { useCallback } from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy, useUILocaleConfig } from "../core"
import { cva } from "class-variance-authority"
import { DataGridAnatomy, DataGridFilteringProps } from "."
import { Select } from "../select"
import { ColumnDef } from "@tanstack/react-table"
import { ShowOnly } from "../show-only"
import { CloseButton } from "../button"
import { DropdownMenu } from "../dropdown-menu"
import { CheckboxGroup } from "../checkbox"
import { RadioGroup } from "../radio-group"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DataGridFilterAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGridFilter__root",
        "flex gap-2 items-center"
    ])
})

export const DataGridActiveFilterAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGridActiveFilter__root",
        "py-1 px-2 rounded-[--radius] border border-[--border] flex gap-2 items-center"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * DataGridFilter
 * -----------------------------------------------------------------------------------------------*/

export interface DataGridFilterProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof DataGridFilterAnatomy> {
    children?: React.ReactNode
    column: ColumnDef<any>
    filterValue: any
    setFilterValue: (updater: any) => void
    filteringOptions: DataGridFilteringProps
    onRemove: () => void
}

export const DataGridFilter: React.FC<DataGridFilterProps> = React.forwardRef<HTMLDivElement, DataGridFilterProps>((props, ref) => {

    const { locale: lng } = useUILocaleConfig()

    const {
        children,
        rootClassName,
        className,
        /**/
        column,
        filteringOptions,
        filterValue,
        setFilterValue,
        onRemove,
        ...rest
    } = props

    const icon = filteringOptions.icon

    // Value formatter - if undefined, use the default behavior
    const valueFormatter = filteringOptions.valueFormatter || ((value: string) => value)

    // Get the options
    const options = filteringOptions.options ?? []

    // Update handler
    const handleUpdate = useCallback((value: any) => {
        let finalValue = value
        // Do something
        setFilterValue(finalValue)
    }, [])

    return (
        <div
            className={cn(DataGridFilterAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            <ShowOnly when={filteringOptions.type === "select" && (!options || options.length === 0)}>
                <div className={"text-red-500"}>/!\ "Select" filtering option passed without options</div>
            </ShowOnly>
            {/*Select*/}
            <ShowOnly when={filteringOptions.type === "select" && !!options && options.length > 0}>
                <Select
                    leftIcon={icon ? icon :
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                        </svg>}
                    leftAddon={filteringOptions.name}
                    options={[...options.map(n => ({ value: n.value, label: valueFormatter(n.value) }))]}
                    onChange={e =>
                        handleUpdate(e.target.value.toLowerCase())
                    }
                    size={"sm"}
                    fieldClassName={"w-fit"}
                    className="sm:w-auto pr-8 md:max-w-sm"
                />
            </ShowOnly>
            {/*Boolean*/}
            <ShowOnly when={filteringOptions.type === "boolean"}>
                <DropdownMenu
                    dropdownClassName={"right-[inherit] left"}
                    trigger={
                        <DataGridActiveFilter
                            options={filteringOptions}
                            value={valueFormatter(filterValue)}
                        />
                    }>
                    <DropdownMenu.Group>
                        <DropdownMenu.Item onClick={() => handleUpdate("true")}>
                            {valueFormatter("true") === "true" ? "True" : valueFormatter("true")}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => handleUpdate("false")}>
                            {valueFormatter("false") === "false" ? "False" : valueFormatter("false")}
                        </DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu>
            </ShowOnly>
            {/*Checkbox*/}
            <ShowOnly when={filteringOptions.type === "checkbox" && !!options.length}>
                <DropdownMenu
                    dropdownClassName={"right-[inherit] left"}
                    trigger={
                        <DataGridActiveFilter
                            options={filteringOptions}
                            value={Array.isArray(filterValue) ? filterValue.map((n: string) => valueFormatter(n)) : valueFormatter(filterValue)}
                        />}
                >
                    <DropdownMenu.Group className={"p-1"}>
                        {filteringOptions.options?.length && (
                            <CheckboxGroup
                                options={filteringOptions.options}
                                value={filterValue}
                                onChange={handleUpdate}
                                checkboxContainerClassName={"flex flex-row-reverse w-full justify-between"}
                                checkboxLabelClassName={"cursor-pointer"}
                            />
                        )}
                    </DropdownMenu.Group>
                </DropdownMenu>
            </ShowOnly>
            {/*Radio*/}
            <ShowOnly when={filteringOptions.type === "radio" && !!options.length}>
                <DropdownMenu
                    dropdownClassName={"right-[inherit] left"}
                    trigger={
                        <DataGridActiveFilter
                            options={filteringOptions}
                            value={Array.isArray(filterValue) ? filterValue.map((n: string) => valueFormatter(n)) : valueFormatter(filterValue)}
                        />}
                >
                    <DropdownMenu.Group className={"p-1"}>
                        {filteringOptions.options?.length && (
                            <RadioGroup
                                options={filteringOptions.options}
                                value={filterValue}
                                onChange={handleUpdate}
                                radioContainerClassName={"flex flex-row-reverse w-full justify-between"}
                                radioLabelClassName={"cursor-pointer"}
                            />
                        )}
                    </DropdownMenu.Group>
                </DropdownMenu>
            </ShowOnly>

            <CloseButton onClick={onRemove} size={"sm"}/>
        </div>
    )

})

DataGridFilter.displayName = "DataGridFilter"


interface DataGridActiveFilterProps extends React.ComponentPropsWithRef<"button">, ComponentWithAnatomy<typeof DataGridActiveFilterAnatomy> {
    children?: React.ReactNode
    options: DataGridFilteringProps
    value: any
}

export const DataGridActiveFilter: React.FC<DataGridActiveFilterProps> = React.forwardRef((props, ref) => {

    const { children, options, value, ...rest } = props

    const formattedValue = Array.isArray(value) ? (value.length > 2 ? [...value.slice(0, 2), "..."].join(", ") : value.join(", ")) : String(value)

    return (
        <button className={cn(DataGridAnatomy.filterDropdownButton(), "truncate overflow-ellipsis")} {...rest} ref={ref}>
            {options.icon && <span>{options.icon}</span>}
            <span>{options.name}:</span>
            <span className={"font-semibold flex flex-none overflow-hidden whitespace-normal"}>{formattedValue}</span>
        </button>
    )

})

DataGridActiveFilter.displayName = "DataGridActiveFilter"
