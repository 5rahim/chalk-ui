"use client"

import React from "react"

interface ClientTestProps {
   children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <div className="mt-10">
         Hello
      </div>
   )
   
}
