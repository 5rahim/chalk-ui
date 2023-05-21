import enUS from "date-fns"
import fr from "date-fns"

export const getDateLocaleLibrary = (locale: string) => locale.includes("fr") ? fr : enUS
