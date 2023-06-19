import type { Meta, StoryObj } from "@storybook/react"
import { Accordion } from "../components/ui/accordion"

const meta = {
    title: "Components/Data Display/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Accordion {...args}>
                <Accordion.Item title={"Easy to use"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aperiam, at eveniet inventore laudantium molestias
                    necessitatibus odio optio placeat provident quaerat recusandae sapiente sed, sint sunt vero voluptas voluptates voluptatum?
                </Accordion.Item>
                <Accordion.Item title={"Customizable"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, porro, reprehenderit. Aliquid cupiditate delectus deleniti
                    dicta dolore dolorum expedita harum illo, maiores mollitia quibusdam rerum similique sit suscipit totam vero.
                </Accordion.Item>
                <Accordion.Item title={"Tailwind"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur enim minima minus odio officiis optio quisquam quo, rem.
                    Adipisci consectetur, corporis cupiditate dolore eaque eligendi inventore ullam. Labore optio, tenetur.
                </Accordion.Item>
            </Accordion>
        )
    },
    args: {
        triggerClassName: "",
        containerClassName: "",
        panelClassName: "",
        itemClassName: "",
    },
    parameters: {
        docs: {
            source: {
                code: null
            }
        }
    }
} satisfies Meta<typeof Accordion>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {}
}
