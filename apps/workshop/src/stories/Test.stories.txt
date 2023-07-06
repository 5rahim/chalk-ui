import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Drawer } from "../components/ui/modal"
import { createTypesafeFormSchema, Field, TypesafeForm } from "../components/ui/typesafe-form"
import { MultiSelect } from "../components/ui/multi-select"

const testSchema = createTypesafeFormSchema(({ z }) => z.object({
    options: z.array(z.string())
}))

const meta = {
    title: "Test/Debugging",
    component: undefined,
    tags: ["autodocs"],
    render: (args) => {

        const [open, setOpen] = useState(false)

        return (
            <>
                <MultiSelect
                    name="options"
                    options={[
                        { value: "Option 1" },
                        { value: "Option 2" },
                        { value: "Option 3" },
                    ]}
                />
                <Button onClick={() => setOpen(true)}>Open</Button>
                <Drawer isOpen={open} onClose={() => setOpen(false)} isClosable>
                    <MultiSelect
                        name="options"
                        options={[
                            { value: "Option 1" },
                            { value: "Option 2" },
                            { value: "Option 3" },
                        ]}
                    />
                    <TypesafeForm schema={testSchema} onSubmit={console.log}>
                        <Field.MultiSelect
                            name="options"
                            options={[
                                { value: "Option 1" },
                                { value: "Option 2" },
                                { value: "Option 3" },
                            ]}
                        />
                        <Field.Combobox
                            name="test"
                            options={[
                                { value: "Option 1" },
                                { value: "Option 2" },
                                { value: "Option 3" },
                            ]}
                        />
                    </TypesafeForm>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, accusantium aliquam corporis dolor dolores eaque eveniet id in neque
                    nesciunt officia perspiciatis quidem repellendus repudiandae sed sit suscipit vel veniam!
                </Drawer>
            </>
        )
    },
    args: {},
} satisfies Meta<any>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {}
}
