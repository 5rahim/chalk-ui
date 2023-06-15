import { Alert } from "@/components/ui/alert"
import { AlertDemo } from "@/app/(docs)/components/AlertDemo"

export default {
    alert: {
        title: "Alert",
        baseComponent: () => <AlertDemo/>
    }
} as Record<string, any>
