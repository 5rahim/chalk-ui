"use client"

import React, { useCallback, useEffect, useId, useState } from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy, useUILocaleConfig } from "../core"
import { cva } from "class-variance-authority"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Accept, FileError, useDropzone } from "react-dropzone"
import { IconButton } from "../button"
import locales from "./locales.json"
import { humanFileSize } from "./helpers"
import { FileUploadHandler } from "./use-file-upload-handler"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DropzoneAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Dropzone__root",
        "mb-2 cursor-pointer hover:text-[--text-color] flex items-center justify-center p-4 border border-[--border] rounded-[--radius] border-dashed",
        "gap-3 text-sm sm:text-base",
        "outline-none ring-[--ring] focus-visible:ring-2",
        "text-[--muted] transition ease-in-out hover:border-[--text-color]",
        "data-[drag-active=true]:border-brand-500",
        "data-[drag-reject=true]:border-[--red]",
    ]),
    list: cva([
        "UI-Dropzone__list",
        "flex rounded-md flex-wrap divide-y divide-[--border]"
    ]),
    listItem: cva([
        "UI-Dropzone__listItem",
        "flex items-center justify-space-between relative p-1 hover:bg-[--highlight] w-full overflow-hidden"
    ]),
    listItemDetailsContainer: cva([
        "UI-Dropzone__listItemDetailsContainer",
        "flex items-center gap-2 truncate w-full"
    ]),
    listItemTitle: cva([
        "UI-Dropzone__listItemTitle",
        "truncate max-w-[180px] text-[.9rem]"
    ]),
    listItemSize: cva([
        "UI-Dropzone__listItemSize",
        "text-xs uppercase text-center font-semibold align-center text-[--muted]"
    ]),
    listItemRemoveButton: cva([
        "UI-Dropzone__listItemRemoveButton",
        "ml-2 rounded-full"
    ]),
    imagePreviewGrid: cva([
        "UI-Dropzone__imagePreviewGrid",
        "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-8 h-full gap-x-2 gap-y-2"
    ]),
    imagePreviewContainer: cva([
        "UI-Dropzone__imagePreviewContainer",
        "col-span-1 row-span-1 aspect-square"
    ]),
    imagePreview: cva([
        "UI-Dropzone__imagePreview",
        "relative bg-transparent border border-[--border] h-full bg-center bg-no-repeat bg-contain rounded-md overflow-hidden",
        "col-span-1 row-span-1"
    ]),
    imagePreviewRemoveButton: cva([
        "UI-Dropzone__imagePreviewRemoveButton",
        "absolute top-1 right-1"
    ]),
    fileIcon: cva([
        "UI-Dropzone__fileIcon",
        "w-5 h-5 flex-none"
    ]),

})

/* -------------------------------------------------------------------------------------------------
 * Dropzone
 * -----------------------------------------------------------------------------------------------*/

export interface DropzoneProps extends Omit<React.ComponentPropsWithRef<"div">, "onChange" | "onDrop" | "onError">,
    ComponentWithAnatomy<typeof DropzoneAnatomy>,
    BasicFieldOptions {
    onChange?: (files: File[]) => void,
    name?: string
    withImagePreview?: boolean
    multiple?: boolean
    uploadHandler?: FileUploadHandler
    /**/
    accept?: Accept
    minSize?: number
    maxSize?: number
    maxFiles?: number
    preventDropOnDocument?: boolean
    noClick?: boolean
    noDrag?: boolean
    onError?: (err: Error) => void
    validator?: <T extends File>(file: T) => FileError | FileError[] | null
}

export const Dropzone: React.FC<DropzoneProps> = React.forwardRef<HTMLDivElement, DropzoneProps>((props, ref) => {

    const { locale: lng } = useUILocaleConfig()

    const [{
        children,
        rootClassName,
        className,
        listClassName,
        listItemClassName,
        listItemDetailsContainerClassName,
        listItemRemoveButtonClassName,
        listItemSizeClassName,
        listItemTitleClassName,
        imagePreviewGridClassName,
        imagePreviewContainerClassName,
        imagePreviewRemoveButtonClassName,
        imagePreviewClassName,
        fileIconClassName,
        onChange,
        withImagePreview,
        uploadHandler,
        /**/
        accept,
        minSize,
        maxSize,
        maxFiles,
        preventDropOnDocument,
        noClick,
        noDrag,
        onError,
        validator,
        multiple,
        ...rest
    }, basicFieldProps] = extractBasicFieldProps(props, useId())

    const _multiple = (uploadHandler?.multiple !== undefined) ? uploadHandler.multiple : multiple

    // Keep track of files
    const [files, setFiles] = useState<File[]>([])

    // When the user drops/chooses files
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Emit the new files
        handleChange(acceptedFiles)
        // Update files - add the preview
        setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
            preview: URL.createObjectURL(file),
        })))
    }, [])

    // When the user removes a file
    const handleRemove = useCallback((file: number) => {
        setFiles(p => {
            const newFiles = [...p]
            newFiles.splice(file, 1)
            handleChange(newFiles) // Emit the new files
            return newFiles
        })
    }, [])

    const handleChange = useCallback((files: File[]) => {
        if (onChange) {
            onChange(files)
            if (uploadHandler) {
                uploadHandler.populateFiles(files)
            }
        }
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        onDrop,
        multiple: _multiple,
        minSize,
        maxSize,
        maxFiles,
        preventDropOnDocument,
        noClick,
        noDrag,
        onError: (e) => {
            onError && onError(e)
            console.error(e)
        },
        validator,
        accept,
    })

    // clean up
    useEffect(() => () => {
        files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    }, [files])

    return (
        <BasicField
            {...basicFieldProps}
        >
            <div
                className={cn(
                    DropzoneAnatomy.root(),
                    rootClassName,
                    className,
                )}
                data-drag-active={isDragActive}
                data-drag-reject={isDragReject}
                {...getRootProps()}
            >
                <input
                    id={basicFieldProps.id}
                    name={basicFieldProps.name ?? "files"}
                    {...getInputProps()}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
                <span>
                    {locales["download"][lng]}
                </span>
            </div>

            {maxSize && <div className={"text-sm text-[--muted] font-medium"}>{`≤`} {humanFileSize(maxSize, 0)}</div>}

            {!withImagePreview && <div className={cn(DropzoneAnatomy.list(), listClassName)}>
                {files?.map((file: any, index) => {

                    let Icon: React.ReactElement

                    if (["image/jpeg", "image/png", "image/jpg", "image/webm"].includes(file.type)) {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <circle cx="10" cy="13" r="2"/>
                            <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"/>
                        </svg>
                    } else if (file.type.includes("video")) {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <path d="m10 11 5 3-5 3v-6Z"/>
                        </svg>
                    } else if (file.type.includes("audio")) {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path
                                d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z"/>
                            <path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z"/>
                            <path d="M2 19v-3a6 6 0 0 1 12 0v3"/>
                        </svg>
                    } else if (file.type.includes("pdf") || file.type.includes("document") || file.type.includes("txt") || file.type.includes("text")) {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" x2="8" y1="13" y2="13"/>
                            <line x1="16" x2="8" y1="17" y2="17"/>
                            <line x1="10" x2="8" y1="9" y2="9"/>
                        </svg>
                    } else if (file.type.includes("compressed") || file.type.includes("zip") || file.type.includes("archive")) {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path
                                d="M22 20V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h6"/>
                            <circle cx="16" cy="19" r="2"/>
                            <path d="M16 11v-1"/>
                            <path d="M16 17v-2"/>
                        </svg>
                    } else {
                        Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={cn(DropzoneAnatomy.fileIcon(), fileIconClassName)}>
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                    }

                    return (

                        <div
                            key={file.name}
                            className={cn(DropzoneAnatomy.listItem(), listItemClassName)}
                        >
                            <div
                                className={cn(DropzoneAnatomy.listItemDetailsContainer(), listItemDetailsContainerClassName)}>
                                {Icon}
                                <p className={cn(DropzoneAnatomy.listItemTitle(), listItemTitleClassName)}>{file.name}</p>
                                <p className={cn(DropzoneAnatomy.listItemSize(), listItemSizeClassName)}>{humanFileSize(file.size)}</p>
                            </div>
                            <IconButton
                                size="xs"
                                intent="gray-basic"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="w-4 h-4">
                                        <path d="M3 6h18"/>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                        <line x1="10" x2="10" y1="11" y2="17"/>
                                        <line x1="14" x2="14" y1="11" y2="17"/>
                                    </svg>
                                }
                                className={cn(DropzoneAnatomy.listItemRemoveButton(), listItemRemoveButtonClassName)}
                                onClick={() => handleRemove(index)}
                            />
                        </div>
                    )
                })}
            </div>}

            {withImagePreview && <div className={cn(DropzoneAnatomy.imagePreviewGrid(), imagePreviewGridClassName)}>
                {files?.map((file: any, index) => {
                    return (
                        <div key={file.name}
                             className={cn(DropzoneAnatomy.imagePreviewContainer(), imagePreviewContainerClassName)}>
                            <div
                                className={cn(DropzoneAnatomy.imagePreview(), imagePreviewClassName)}
                                style={{
                                    backgroundImage: file ? `url(${file.preview})` : undefined,
                                }}
                            >
                                <IconButton
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                             className="w-4 h-4">
                                            <line x1="18" x2="6" y1="6" y2="18"/>
                                            <line x1="6" x2="18" y1="6" y2="18"/>
                                        </svg>
                                    }
                                    intent="alert"
                                    size="xs"
                                    className={cn(DropzoneAnatomy.imagePreviewRemoveButton(), imagePreviewRemoveButtonClassName)}
                                    onClick={() => handleRemove(index)}
                                />
                            </div>
                            <div
                                className={cn(DropzoneAnatomy.listItemDetailsContainer(), listItemDetailsContainerClassName)}>
                                <p className={cn(DropzoneAnatomy.listItemTitle(), listItemTitleClassName)}>{file.name}</p>
                                <p className={cn(DropzoneAnatomy.listItemSize(), listItemSizeClassName)}>{humanFileSize(file.size)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>}

        </BasicField>
    )

})

Dropzone.displayName = "Dropzone"
