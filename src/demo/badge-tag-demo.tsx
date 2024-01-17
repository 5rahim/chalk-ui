import { Badge } from "@/workshop/badge"
import * as React from "react"

export default function BadgeDemo() {
    const [visible, setVisible] = React.useState(true)

    return (
        <>
            {visible && (
                <Badge
                    tag
                    isClosable
                    onClose={() => setVisible(false)}
                >
                    Tag
                </Badge>
            )}
        </>
    )
}
