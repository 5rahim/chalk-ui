import { SimpleDropzone } from "@/workshop/simple-dropzone"
import { Switch } from "@/workshop/switch"
import * as React from "react"

export default function SimpleDropzoneDemo() {
    const [imagePreview, setImagePreview] = React.useState(false)

    return (
        <div className="w-full space-y-4">
            <SimpleDropzone
                label="Images"
                accept={{ "image/*": [] }}
                multiple
                withImagePreview={imagePreview}
            />
            <Switch value={imagePreview} onValueChange={setImagePreview} label="Image preview" />
        </div>
    )
}
