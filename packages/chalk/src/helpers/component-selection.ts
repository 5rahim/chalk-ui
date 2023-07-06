import { Component } from "@/src/helpers/components"
import prompts from "prompts"

export async function promptForComponents(components: Component[]) {
    const { components: selectedComponents } = await prompts({
        type: "multiselect",
        name: "components",
        message: "Select the components",
        hint: "Space to select. A to select all. I to invert selection.",
        instructions: false,
        choices: components.filter(n => n.component !== "core").map((component) => ({
            title: component.name,
            value: component,
        })),
    })

    return selectedComponents
}
