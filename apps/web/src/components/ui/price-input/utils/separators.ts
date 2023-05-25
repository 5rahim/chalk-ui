import { escapeRegExp } from "@/components/ui/price-input/utils/sanitize-value"

/**
 * Remove group separator (eg: 1,000 > 1000)
 */
export const removeSeparators = (value: string, separator = ","): string => {
    const reg = new RegExp(escapeRegExp(separator), "g")
    return value.replace(reg, "")
}
/**
 * Add group separator (eg: 2000 -> 2,000)
 */
export const addSeparators = (value: string, separator = ","): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
