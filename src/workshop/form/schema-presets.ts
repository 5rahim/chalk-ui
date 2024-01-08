import _isDate from "lodash/isDate"
import { z } from "zod"

/**
 * @internal
 * createTypesafeFormSchema presets
 */
export const schemaPresets = {
    name: z.string().min(2).trim(),
    select: z.string().min(1),
    checkboxGroup: z.array(z.string()),
    multiSelect: z.array(z.string()),
    autocomplete: z.object({ label: z.string(), value: z.string().nullable() }),
    time: z.object({ hour: z.number().min(0).max(23), minute: z.number().min(0).max(59) }),
    phone: z.string().min(10, "Invalid phone number"),
    boolean: z.boolean(),
    files: z.array(z.custom<File>()).refine(
        // Check if all items in the array are instances of the File object
        (files) => files.every((file) => file instanceof File), { message: "Expected a file" },
    ),
    filesOrEmpty: z.array(z.custom<File>()).min(0).refine(
        // Check if all items in the array are instances of the File object
        (files) => files.every((file) => file instanceof File), { message: "Expected a file" },
    ),
    dateRangePicker: z.object({ from: z.date(), to: z.date() })
        .refine(data => _isDate(data.from) && _isDate(data.to), { message: "Incorrect dates" }),
    datePicker: z.date(),
}
