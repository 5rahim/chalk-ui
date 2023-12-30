import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Multiselect } from "../multiselect/multiselect"

const meta = {
    title: "Components/Forms/Multiselect",
    component: Multiselect,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        const [{ value }, updateArgs] = useArgs()

        return (
            <div className="min-[900px]:w-[800px] min-w-full">
                <Multiselect
                    {...args}
                    multiple={false}
                    value={value}
                    onChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        options: [
            {
                value: "next.js",
                label: "Next.js",
            },
            {
                value: "sveltekit",
                label: "SvelteKit",
            },
            {
                value: "nuxt.js",
                label: "Nuxt.js",
            },
            {
                value: "remix",
                label: "Remix",
            },
            {
                value: "astro",
                label: "Astro",
            },
        ],
        label: "Label",
        placeholder: "Select frameworks...",
        emptyMessage: "No framework found",
        value: ["next.js"],
        // allowCustomValue: false,
        // withFiltering: true,
        // returnValueOrLabel: "label",
        // options: [
        //     { value: "1", label: "Option 1" },
        //     { value: "2", label: "Option 2" },
        //     { value: "3", label: "Option 3" },
        //     { value: "4", label: "Option 4" },
        // ],
    },
} satisfies Meta<typeof Multiselect>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

// export const Suggestions: Story = {
//     args: {
//         label: "Country",
//         placeholder: "Enter your country",
//         options: [
//             { value: "us", label: "United States" },
//             { value: "ci", label: "Côte d'Ivoire" },
//             { value: "jp", label: "Japan" },
//             { value: "br", label: "Brazil" },
//         ],
//         withFiltering: true,
//         allowCustomValue: true,
//         returnValueOrLabel: "label",
//         noOptionsMessage: undefined,
//     },
// }
