import { cn } from "@rahimstack/tailwind-utils"
import * as React from "react"
import { useState } from "react"

interface CodePreviewProps {
   children?: React.ReactNode
   preview: React.ReactNode
}

const CodePreview: React.FC<CodePreviewProps> = (props) => {
   
   const { children, preview, ...rest } = props
   
   const [displayCode, setDisplayCode] = useState(false)
   
   return (
      <div className="py-6">
         <div className="flex relative">
            <a onClick={() => setDisplayCode(false)} className={cn("py-2 px-4 block")}>Preview</a>
            <a onClick={() => setDisplayCode(true)} className={cn("py-2 px-4 block")}>Code</a>
         </div>
         <div className="border rounded-md">
            {!displayCode && <div className="flex justify-center items-center p-10 min-h-[350px]">
                <div className="max-w-[70%] w-full">
                   {preview}
                </div>
            </div>}
            {displayCode && <div className="pt-4 pl-4 pr-4">
               {children}
            </div>}
         </div>
      </div>
   )
   
}

export default CodePreview
