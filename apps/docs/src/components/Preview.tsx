import * as React from "react"

interface PreviewProps {
   children?: React.ReactNode
}

const Preview: React.FC<PreviewProps> = (props) => {

    const { children, ...rest } = props

    return (
      <div className="py-6">
         <div className="flex justify-center items-center border dark:border-gray-800 rounded-md p-10 min-h-[250px] relative">
            <div className="max-w-[70%] w-full space-y-6">
               {children}
            </div>
         </div>
      </div>
   )

}

export default Preview
