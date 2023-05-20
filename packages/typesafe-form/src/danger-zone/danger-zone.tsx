'use client'

import { cn } from '@rahimstack/tailwind-utils'
import {
   Button, ComponentWithAnatomy, DangerZoneAnatomy, LoadingOverlay, Modal, useDisclosure, useStyleLibrary, useUILocaleConfig,
} from '@rahimstack/ui'
import React, { useState } from 'react'
import locale from './locale'

export interface DangerZoneProps extends React.ComponentPropsWithRef<'div'>, ComponentWithAnatomy<typeof DangerZoneAnatomy> {
   action: string
   onDelete?: () => void
   /**
    * @default true
    **/
   showLoadingOverlayOnDelete?: boolean
   locale?: 'fr' | 'en'
}

export const DangerZone = React.forwardRef<HTMLDivElement, DangerZoneProps>((props, ref) => {
   
   const {
      children,
      action,
      onDelete,
      className,
      locale: lng,
      showLoadingOverlayOnDelete = true,
      titleClassName,
      iconClassName,
      containerClassName,
      dialogBodyClassName,
      dialogTitleClassName,
      dialogActionClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   const { locale: configLng } = useUILocaleConfig()
   
   const _lng = (lng ?? configLng) as 'fr' | 'en'
   
   const modal = useDisclosure(false)
   
   const [blockScreen, setBlockScreen] = useState<boolean>(false)
   
   return (
      <>
         <LoadingOverlay show={blockScreen} />
         
         <div className={cn(StyleLibrary.DangerZone.container(), containerClassName, className)}>
            <span className={cn(StyleLibrary.DangerZone.icon(), iconClassName)}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
               </svg>
            </span>
            <div>
               <h2 className={cn(StyleLibrary.DangerZone.title(), titleClassName)}>{locale['name'][_lng]}</h2>
               <p className=""><span className="font-semibold">{action}</span>. {locale['irreversible_action'][_lng]}</p>
               <Button
                  size="sm"
                  intent="alert-subtle"
                  className="mt-2"
                  leftIcon={<span className="w-4">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path>
                     </svg>
                  </span>}
                  onClick={modal.open}
               >{locale['delete'][_lng]}</Button>
            </div>
         </div>
         
         <Modal isOpen={modal.isOpen} onClose={modal.close}>
            <h3 className={cn(StyleLibrary.DangerZone.dialogTitle(), dialogTitleClassName)}>
               {locale['confirm_delete'][_lng]}
            </h3>
            <div className={cn(StyleLibrary.DangerZone.dialogBody(), dialogBodyClassName)}>
               {locale['irreversible_action'][_lng]}
            </div>
            
            <div className={cn(StyleLibrary.DangerZone.dialogAction(), dialogActionClassName)}>
               <Button
                  intent="gray-outline"
                  size="sm"
                  onClick={modal.close}
               >{locale['cancel'][_lng]}</Button>
               <Button
                  intent="alert" size="sm" onClick={() => {
                  modal.close()
                  showLoadingOverlayOnDelete && setBlockScreen(true)
                  onDelete && onDelete()
               }}
               >{locale['delete'][_lng]}</Button>
            </div>
         </Modal>
      </>
   )
   
})
