import * as z from "zod"
import components from "../templates/components.json"

const baseUrl = process.env.COMPONENTS_BASE_URL ?? "https://ui.rahim.app"

const componentSchema = z.object({
   component: z.string(),
   name: z.string(),
   dependencies: z.array(z.string()).optional(),
   family: z.array(z.string()).optional(),
   files: z.array(
      z.object({
         name: z.string(),
         dir: z.string(),
         content: z.string(),
      }),
   ),
})

export type Component = z.infer<typeof componentSchema>

const componentsSchema = z.array(componentSchema)

/**
 * Get the component file
 */
export async function getAvailableComponents() {
   try {
      // const response = await fetch(`${baseUrl}/api/components`)
      // const components = await response.json()
      //return componentsSchema.parse(components)
      
      /** For now, we get the components from the package **/
      return components as Component[]
      
   }
   catch (error) {
      throw new Error(
         `Failed to fetch components`,
      )
   }
}
