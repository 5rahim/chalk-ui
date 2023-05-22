"use client"

import React from "react"
import { Badge } from "../../components/ui/badge"

interface ClientTestProps {
   children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <div className="mt-10">
         <Badge>Hello</Badge>
      </div>
   )
   
}
