import { Button } from "@/workshop/button"
import { toast } from "sonner"

export default function ToasterDemo() {
    return (
        <div className="w-fit flex flex-col gap-2">
            <Button
                intent="gray-outline"
                onClick={() =>
                    toast("Event has been created", {
                        description: "Go to your settings to change your preferences.",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        position: "bottom-right"
                    })
                }
            >
                Basic
            </Button>
            <Button
                intent="gray-outline"
                onClick={() =>
                    toast.info("Email sent", {
                        description: "Go to your settings to change your preferences.",
                    })
                }
            >
                Info
            </Button>
            <Button
                intent="gray-outline"
                onClick={() =>
                    toast.warning("Warning!", {
                        description: "Go to your settings to change your preferences.",
                    })
                }
            >
                Warning
            </Button>
            <Button
                intent="gray-outline"
                onClick={() =>
                    toast.error("Error!", {
                        description: "Go to your settings to change your preferences.",
                    })
                }
            >
                Error
            </Button>
            <Button
                intent="gray-outline"
                onClick={() =>
                    toast.success("Success!", {
                        description: "Go to your settings to change your preferences.",
                    })
                }
            >
                Success
            </Button>
        </div>
    )
}
