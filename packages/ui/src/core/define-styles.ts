import { cva } from "class-variance-authority"
import { defineStyleAnatomy } from "./style-anatomy"
import { StyleLibrary, UIStyleLibrary } from "./style-library"

// ------------------------------------------------------------------------------------------------- //

const extendAnatomy = <Key extends keyof UIStyleLibrary>(component: Key, object: Partial<UIStyleLibrary[Key]>): UIStyleLibrary[Key] => {
   return defineStyleAnatomy({
      ...StyleLibrary[component],
      ...object,
   }) as UIStyleLibrary[Key]
}

type CustomizeStyleLibraryCallback = ({ anatomy, part }: {
   anatomy: typeof defineStyleAnatomy,
   extendAnatomy: typeof extendAnatomy,
   part: typeof cva
}) => Partial<UIStyleLibrary>

/**
 * @example
 * <UIProvider styleLibrary={customizeStyleLibrary(({ anatomy, extendAnatomy, part }) => ({
 *    Switch: extendAnatomy({
 *       label: part(null)
 *    })
 * }))}>
 * // anatomy -> Replaces the whole anatomy
 * // extendAnatomy -> Replace part of the anatomy
 * // part -> cva
 * @param callback
 */
export const customizeStyleLibrary = (callback: CustomizeStyleLibraryCallback): UIStyleLibrary => {
   
   return {
      ...StyleLibrary,
      ...callback({
         anatomy: defineStyleAnatomy,
         extendAnatomy: extendAnatomy,
         part: cva,
      }),
   }
   
}
