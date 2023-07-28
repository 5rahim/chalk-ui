import styles from "./style.module.css"

export function OptionTable({ options }: { options: [string, string, any] }) {
   return (
      <div
         className={
            "-mx-6 mt-6 mb-4 overflow-x-auto overscroll-x-contain px-6 pb-4 " +
            styles.container
         }
      >
         <table className="w-full border-collapse text-sm">
            <thead>
            <tr className="border-b dark:border-gray-700 py-4 text-left">
               <th className="py-2 font-semibold">Option</th>
               <th className="py-2 pl-6 font-semibold">Type</th>
               <th className="py-2 px-6 font-semibold">Description</th>
            </tr>
            </thead>
            <tbody className="align-baseline text-gray-900 dark:text-gray-100">
            {options.map(([option, type, description]) => (
               <tr
                  key={option}
                  className="border-b dark:border-gray-800 border-gray-100"
               >
                  <td className="whitespace-pre py-4 font-mono text-md font-semibold leading-6 text-violet-600 dark:text-violet-200">
                     <span className="border dark:border-gray-700 rounded-[--radius] py-1 px-2 bg-slate-50 dark:bg-gray-800">
                         {option}
                     </span>
                  </td>
                  <td className="whitespace-pre py-4 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                      {type}
                  </td>
                   <td className="py-4 pl-6 text-gray-800 dark:text-gray-400">{description}</td>
               </tr>
            ))}
            </tbody>
         </table>
      </div>
   )
}


export function PropsTable({ title, options }: { title: "Props" | "Return" | "Schema", options: [string, string, any] }) {
   return (
       <div className="overflow-hidden rounded-md my-4 border-[--border]">
           <div
               className="bg-gray-100 dark:bg-gray-800 w-full py-2 text-center font-bold"
           >{title}</div>
           <div
               className={
                   "overflow-x-auto overscroll-x-contain p-2 bg-gray-50 dark:bg-gray-900"}
           >
               <table className="w-full border-collapse text-sm px-6 pb-4">
                   <thead>
                   <tr className="border-b py-4 text-left dark:border-neutral-700">
                       <th className="py-2 font-semibold">Property</th>
                       <th className="py-2 pl-6 font-semibold">Type</th>
                       <th className="py-2 px-6 font-semibold">Description</th>
                   </tr>
                   </thead>
                   <tbody className="align-baseline text-gray-900 dark:text-gray-100 divide-y divide-gray-100 dark:divide-neutral-700/50">
                   {options.map(([option, type, description]) => (
                       <tr
                           key={option}
                           className=""
                       >
                           <td className="whitespace-pre py-2 font-mono text-md tracking-wide font-semibold leading-6 text-violet-600 dark:text-violet-300">
                               {option}
                           </td>
                           <td className=" py-2 pl-6 font-mono text-md tracking-wide font-semibold leading-6 text-slate-500 dark:text-slate-400">
                               {type}
                           </td>
                     <td className="py-2 pl-6">{description}</td>
                  </tr>
               ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}
