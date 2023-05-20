"use client"

import { customizeStyleLibrary, cva, defineStyleAnatomy, UIProvider } from "ui"
import React from "react"

interface ClientProvidersProps {
   children?: React.ReactNode
}

export const ClientProviders: React.FC<ClientProvidersProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <UIProvider
         config={{ locale: "fr" }}
      >
         {children}
      </UIProvider>
   )
   
}
