import type { Meta, StoryObj } from "@storybook/react"
import { Pagination, PaginationProps } from "../components/ui/pagination"

const meta = {
    title: "Components/Navigation/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Pagination {...args}>
                <Pagination.Trigger direction="left" data-disabled={true}/>
                <Pagination.Item value={1} data-selected={true}/>
                <Pagination.Item value={2}/>
                <Pagination.Ellipsis/>
                <Pagination.Item value={8}/>
                <Pagination.Item value={10}/>
                <Pagination.Trigger direction="right"/>
            </Pagination>
        )
    }
} satisfies Meta<typeof Pagination>


export default meta
type Story = StoryObj<PaginationProps>;

export const Basic: Story = {
    args: {}
}
