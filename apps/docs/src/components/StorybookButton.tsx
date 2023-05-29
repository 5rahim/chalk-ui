import * as React from "react"

interface StorybookButtonProps {
   name?: string
   slug: string
}

const StorybookButton: React.FC<StorybookButtonProps> = (props) => {

    const { slug, name, ...rest } = props

    return (
      <a href={"https://chalk-storybook.rahim.app/?path=/docs/" + slug} target="_blank">
         <span className="px-4 py-2 rounded-md border dark:border-gray-700 inline-flex gap-2 items-center font-medium mt-4 transition ring-red-500 hover:ring-1 dark:hover:border-gray-600">
            <span className="text-red-600 dark:text-red-400">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-code"
               >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
               </svg>
            </span>
            Code examples
         </span>
      </a>
   )

}

export default StorybookButton
