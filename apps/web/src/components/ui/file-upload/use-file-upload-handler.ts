import { useState } from "react"

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

// TODO: Type of the returned object from your implementation
// eg: type FileUploadObject = { url: string, ext: string }
type FileUploadObject = any

type FileUploadReturn<A extends "single" | "multiple"> = A extends "single" ? FileUploadObject : FileUploadObject[]

/* -------------------------------------------------------------------------------------------------
 * Hook
 * -----------------------------------------------------------------------------------------------*/

export function useFileUploadHandler<A extends "single" | "multiple">(singleOrMultiple: A) {

    const [files, setFiles] = useState<File[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [uploaded, setIsUploaded] = useState(false)

    return {
        hasFiles: files.length > 0,
        isUploading,
        uploaded,
        multiple: singleOrMultiple === "multiple",

        populateFiles: (files: File[] | undefined | null) => {
            setFiles(files ?? [])
        },

        removeFiles: () => {
            setFiles([])
        },

        /**
         * @example
         * type FileUploadObject = { url: string, ext: string }
         * const res = await profilePictureUploader.uploadSingleFile()
         * if (res) mutate({ ...data, picture: res.url })
         */
        uploadFiles: async () => {

            let results: FileUploadReturn<A> | null = null

            setIsUploading(true)

            // TODO: Uncomment the code below with your own implementation of `uploadFiles`
            // const res = await uploadFiles(files)
            // if (!res.error && !!res.data) {
            //     setIsUploading(false)
            //     setIsUploaded(true)
            //     results = objects!
            // }

            return results

        },
    }

}

export type FileUploadHandler = ReturnType<typeof useFileUploadHandler>
