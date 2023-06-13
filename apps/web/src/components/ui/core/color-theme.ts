import clsx from "clsx"

/* -------------------------------------------------------------------------------------------------
 * Tailwind Color Mode
 * -----------------------------------------------------------------------------------------------*/

/**
 * Tailwind color mode utility function
 *
 * @example
 * tcm("bg-gray-{200,800}")
 * // => "bg-gray-200 dark:bg-gray-800"
 *
 * // Use
 * <div className={cn("px-1", tcm("border-{gray-200,blue-500}"))} />
 *
 * /!\ The classes need to be in the Tailwind safeList
 * @param input
 */
export const tcm = (input: string | string[] | null | undefined) => {
    if (!!input) {
        // 1. Join the input into a single string
        const joinedInput: string = Array.isArray(input) ? input.join(" ") : input

        // 2. Get all classes
        const classes = joinedInput.split(/\s+/)

        // 3. Extract dark-mode classes
        let outputArr = []
        // 3.1. Loop through classes
        for (let i = 0; i < classes.length; i++) {
            let current = classes[i]
            if (current) {
                if (current.includes("{") && current.includes("}")) {
                    // 3.2 Get light/dark values between braces
                    let substring = current.substring(
                        current.indexOf("{") + 1,
                        current.lastIndexOf("}")
                    )
                    const values = substring.split(",")
                    // 3.3. If we have 2 values, replace current class with both formats
                    if (values.length === 2) {
                        // 3.3.1. Get prefix (e.g: bg-)
                        const prefix = current.replace(/\{.*}/, "").replace("{", "").replace("}", "")
                        // 3.3.2. New formatting
                        current = `${prefix}${values[0]} dark:${prefix}${values[1]}`
                        outputArr.push(current)
                    }
                } else {
                    outputArr.push(`${current}`)
                }
            }
        }
        console.log(outputArr.join(" "))
        return clsx(outputArr)
    }
}

/* -------------------------------------------------------------------------------------------------
 * Colors
 * -----------------------------------------------------------------------------------------------*/

export const ColorPalette = [
    "brand",
    "purple",
    "blue",
    "amber",
    "green",
    "yellow",
    "cyan",
    "lime",
    "sky",
    "red",
    "pink",
    "orange",
    "stone",
    "teal",
    "neutral",
    "fuchsia",
    "violet",
    "slate",
    "zinc",
    "emerald",
    "indigo",
    "gray",
    "rose",
]
export type UIColor = (typeof ColorPalette)[number];
