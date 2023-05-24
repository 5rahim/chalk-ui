/* -------------------------------------------------------------------------------------------------
 * Light/Dark mode Tailwind
 * -----------------------------------------------------------------------------------------------*/

import { cva } from "class-variance-authority"

export const cm = (input: string | string[] | null | undefined) => {
    if (!!input) {
        // 1. Join the input into a single string
        const joinedInput: string = Array.isArray(input) ? input.join(" ") : input

        // 2. Get all classes
        const classes = joinedInput.split(/\s+/)

        // 3. Extract dark-mode classes
        let outputCVA = cva(input)
        let outputArr = []
        // 3.1. Loop through classes
        for (let i = 0; i < classes.length; i++) {
            let current = classes[i]
            if (current) {
                if (current.includes("{{") && current.includes("}}")) {
                    // 3.2 Get light/dark values between braces
                    let substring = current.substring(
                        current.indexOf("{{") + 2,
                        current.lastIndexOf("}}")
                    )
                    const values = substring.split(",")
                    // 3.3. If we have 2 values, replace current class with both formats
                    if (values.length === 2) {
                        // 3.3.1. Get prefix (e.g: bg-)
                        const prefix = current.replace(/\{\{.*}}/, "").replace("{{", "").replace("}}", "")
                        // 3.3.2. New formatting
                        current = `${prefix}${values[0]} dark:${prefix}${values[1]}`
                        outputArr.push(current)
                    }
                } else {
                    outputArr.push(`${current} dark:${current}`)
                }
            }
            // console.log(current)
        }
        console.log(outputArr.join(" "))
        return cva(outputArr.join(" "))()
    }
}
