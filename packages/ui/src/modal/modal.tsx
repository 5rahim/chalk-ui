"use client"

import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@rahimstack/tailwind-utils"
import { cva, VariantProps } from "class-variance-authority"
import React, { Fragment } from "react"
import { CloseButton, defineStyleAnatomy, useStyleLibrary } from ".."
import { ComponentWithAnatomy } from "../core"

export const ModalAnatomy = defineStyleAnatomy({
   title: cva("UI-Modal__title text-lg font-medium leading-6"),
   panel: cva("UI-Modal__panel w-full transform overflow-hidden rounded-none sm:rounded-md bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all relative", {
      variants: {
         size: {
            sm: "sm:max-w-md",
            md: "sm:max-w-lg",
            lg: "sm:max-w-xl",
            xl: "sm:max-w-2xl",
         },
      },
      defaultVariants: {
         size: "md",
      },
   }),
   body: cva("UI-Modal__body mt-2"),
   closeButton: cva("UI-Modal__closeButton absolute right-2 top-2"),
})

export interface ModalProps extends React.ComponentPropsWithRef<"div">,
   ComponentWithAnatomy<typeof ModalAnatomy>,
   VariantProps<typeof ModalAnatomy.panel> {
   isOpen: boolean,
   onClose: () => void
   title?: string
   withCloseButton?: boolean
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
   
   const {
      children,
      className,
      isOpen,
      onClose,
      title,
      size,
      panelClassName,
      titleClassName,
      closeButtonClassName,
      bodyClassName,
      withCloseButton,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   return (
      <>
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
               </Transition.Child>
               
               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel
                           className={cn(
                              StyleLibrary.Modal.panel({ size }),
                              panelClassName,
                           )}
                           {...rest}
                        >
                           {title && <Dialog.Title
                               as="h3"
                               className={cn(StyleLibrary.Modal.title(), titleClassName)}
                           >
                              {title}
                           </Dialog.Title>}
                           
                           {withCloseButton &&
                               <CloseButton onClick={onClose} className={cn(StyleLibrary.Modal.closeButton(), closeButtonClassName)} />}
                           
                           <div className={cn(StyleLibrary.Modal.body(), bodyClassName)}>
                              {children}
                           </div>
                        
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
   
})

Modal.displayName = "Modal"
