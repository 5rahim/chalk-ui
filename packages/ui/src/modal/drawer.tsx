import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@rahimstack/tailwind-utils"
import { cva, VariantProps } from "class-variance-authority"
import React, { Fragment } from "react"
import { CloseButton } from "../button"
import { ComponentWithAnatomy, defineStyleAnatomy, useStyleLibrary } from "../core"

export const DrawerAnatomy = defineStyleAnatomy({
   panel: cva("UI-Drawer__panel", {
      variants: {
         size: { md: "", lg: "", xl: "", full: "" },
         placement: { top: "", right: "", left: "", bottom: "" },
      },
      defaultVariants: {
         size: "md",
         placement: "right",
      },
   }),
   container: cva("UI-Drawer__container flex h-full flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-xl"),
   body: cva("UI-Drawer__body relative flex-1 pl-4 pr-4 pb-4 sm:pl-6 sm:pr-6 sm:pb-6"),
   header: cva("UI-Drawer__header flex w-full justify-between items-center p-4 sm:p-6 pb-0"),
   title: cva("UI-Drawer__title text-lg font-semibold"),
   closeButton: cva("UI-Drawer__closeButton"),
})

export interface DrawerProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof DrawerAnatomy>,
   VariantProps<typeof DrawerAnatomy.panel> {
   isOpen: boolean
   withCloseButton?: boolean
   onClose: () => void
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
   
   const {
      children,
      className,
      size = "md",
      placement = "right",
      withCloseButton = false,
      isOpen,
      onClose,
      title,
      closeButtonClassName,
      panelClassName,
      titleClassName,
      headerClassName,
      bodyClassName,
      containerClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   let animation = {
      enter: "transform transition ease-in-out duration-500 sm:duration-500",
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leave: "transform transition ease-in-out duration-500 sm:duration-500",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
   }
   
   if (placement == "bottom") {
      animation = {
         ...animation,
         enterFrom: "translate-y-full",
         enterTo: "translate-y-0",
         leaveFrom: "translate-y-0",
         leaveTo: "translate-y-full",
      }
   } else if (placement == "top") {
      animation = {
         ...animation,
         enterFrom: "-translate-y-full",
         enterTo: "translate-y-0",
         leaveFrom: "translate-y-0",
         leaveTo: "-translate-y-full",
      }
   } else if (placement == "left") {
      animation = {
         ...animation,
         enterFrom: "-translate-x-full",
         enterTo: "translate-x-0",
         leaveFrom: "translate-x-0",
         leaveTo: "-translate-x-full",
      }
   }
   
   return (
      <>
         <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
               as="div"
               className={cn(
                  "relative z-50",
                  // elementStyles({ }),
                  className,
               )}
               onClose={onClose}
               {...rest}
               ref={ref}
            >
               
               {/*Overlay*/}
               <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
               </Transition.Child>
               
               <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div
                        className={cn(
                           "pointer-events-none fixed flex",
                           {
                              "inset-y-0 max-w-full": (placement == "right" || placement == "left"),
                              "inset-x-0": (placement == "top" || placement == "bottom"),
                              //
                              "pl-0": placement == "right",
                              //
                              "right-0": placement == "right",
                              "left-0": placement == "left",
                              "top-0": placement == "top",
                              "bottom-0": placement == "bottom",
                           },
                        )}
                     >
                        <Transition.Child
                           as={Fragment}
                           {...animation}
                        >
                           <Dialog.Panel
                              className={cn(
                                 "pointer-events-auto relative",
                                 {
                                    "w-screen": (placement == "right" || placement == "left" || placement == "top" || placement == "bottom"),
                                    // Right or Left
                                    "max-w-md": size == "md" && (placement == "right" || placement == "left"),
                                    "max-w-2xl": size == "lg" && (placement == "right" || placement == "left"),
                                    "max-w-5xl": size == "xl" && (placement == "right" || placement == "left"),
                                    "max-w-full": size == "full" && (placement == "right" || placement == "left"),
                                    // Top or Bottom
                                    "h-[100vh] max-h-[50vh]": size == "md" && (placement == "bottom" || placement == "top"),
                                    "h-[100vh] max-h-[70vh]": size == "lg" && (placement == "bottom" || placement == "top"),
                                    "h-[100vh] max-h-[80vh]": size == "xl" && (placement == "bottom" || placement == "top"),
                                    "h-[100vh] min-h-screen": size == "full" && (placement == "bottom" || placement == "top"),
                                 },
                              )}
                           >
                              
                              {/*Container*/}
                              <div className={cn(StyleLibrary.Drawer.container(), containerClassName)}>
                                 <div
                                    className={cn(StyleLibrary.Drawer.header(), headerClassName)}
                                 >
                                    <Dialog.Title className={cn(StyleLibrary.Drawer.title(), titleClassName)}>{title}</Dialog.Title>
                                    
                                    {withCloseButton && (
                                       <CloseButton
                                          onClick={() => onClose()}
                                          className={cn(closeButtonClassName)}
                                       />
                                    )}
                                 
                                 </div>
                                 <div className={cn(StyleLibrary.Drawer.body(), bodyClassName)}>
                                    {children}
                                 </div>
                              </div>
                           </Dialog.Panel>
                        
                        </Transition.Child>
                     </div>
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
      </>
   )
   
})

Drawer.displayName = "Drawer"
