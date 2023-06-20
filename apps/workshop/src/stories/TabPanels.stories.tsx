import type { Meta, StoryObj } from "@storybook/react"
import { TabPanels, TabPanelsProps } from "../components/ui/tabs"
import { BiCog } from "@react-icons/all-files/bi/BiCog"

const meta = {
    title: "Components/Navigation/TabPanels",
    component: TabPanels,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <TabPanels {...args}>
                <TabPanels.Nav>
                    <TabPanels.Tab>Home</TabPanels.Tab>
                    <TabPanels.Tab>Orders</TabPanels.Tab>
                    <TabPanels.Tab><BiCog className="w-5 h-5"/><span>Settings</span></TabPanels.Tab>
                </TabPanels.Nav>
                <TabPanels.Container className="pt-4">
                    <TabPanels.Panel>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet autem consequuntur, eius hic minus neque,
                        nesciunt obcaecati
                        perferendis placeat quae quasi repudiandae rerum. Assumenda consequatur facere id maiores quae.
                    </TabPanels.Panel>
                    <TabPanels.Panel>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto cum delectus dicta dolores enim, harum impedit
                        ipsa laboriosam
                        nemo nesciunt nostrum perspiciatis quae quibusdam quis sequi sint vitae voluptas.
                    </TabPanels.Panel>
                    <TabPanels.Panel>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate doloremque eveniet magnam numquam odit quibusdam,
                        veniam? Ab
                        cumque dignissimos dolorem nesciunt odit? Deserunt dolores nam, rem saepe suscipit ut vitae!
                    </TabPanels.Panel>
                </TabPanels.Container>
            </TabPanels>
        )
    }
} satisfies Meta<typeof TabPanels>


export default meta
type Story = StoryObj<TabPanelsProps>;

export const Primary: Story = {
    args: {}
}

export const Pills: Story = {
    args: {
        navClassName: "border-none",
        tabClassName: "border-none data-[selected=true]:bg-brand-50 data-[selected=true]:dark:bg-[--highlight] rounded-[--radius] transition"
    }
}
