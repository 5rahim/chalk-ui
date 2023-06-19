import enUS from "date-fns/locale/en-US"
import fr from "date-fns/locale/fr"

export const getDateLocaleLibrary = (locale: string) => locale.includes("fr") ? fr : enUS
