import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/workshop/tabs"

const meta = {
    title: "Components/Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        return (
            <div className="w-full">
                <Tabs
                    {...args}
                    defaultValue="account"
                    className="w-[800px]"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci deserunt hic, iste maxime nihil numquam officia
                            optio, qui quis quo reprehenderit tempore vel. Ab at deleniti nihil perspiciatis velit.
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam atque delectus deserunt dignissimos eaque et eum
                            eveniet, ipsam iure minus molestias natus officiis omnis optio quis soluta tempore voluptatem!
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}
