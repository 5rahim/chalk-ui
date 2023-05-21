import * as z from "zod"
import contents from "../templates/component-contents.json"
import components from "../templates/components.json"

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!

const baseUrl = process.env.COMPONENTS_BASE_URL ?? "https://chalk.rahim.app"

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
      const snapshot = (contents as { component: string, files: Component["files"] }[])
      
      // Replace the file contents
      return components.map((component: Component) => {
         return {
            component: component.component,
            name: component.name,
            dependencies: component.dependencies,
            family: component.family,
            files: snapshot.filter(n => n.component === component.component)[0]?.files ?? [],
         }
      })
      
   }
   catch (error) {
      throw new Error(
         `Failed to fetch components`,
      )
   }
}
