"use client"

import React from "react"
import { UIProvider } from "ui"

interface ClientProvidersProps {
   children?: React.ReactNode
}

export const ClientProviders: React.FC<ClientProvidersProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <UIProvider config={{ locale: "fr" }}>
         {children}
      </UIProvider>
   )
   
}
