import type { Meta, StoryObj } from "@storybook/react"
import { Pagination, PaginationEllipsis, PaginationItem, PaginationTrigger } from "@/workshop/pagination"

const meta = {
    title: "Components/Navigation/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Pagination {...args}>
                <PaginationTrigger direction="previous" data-disabled={true} />
                <PaginationItem value={1} data-selected={true} />
                <PaginationItem value={2} />
                <PaginationEllipsis />
                <PaginationItem value={8} />
                <PaginationItem value={10} />
                <PaginationTrigger direction="next" />
            </Pagination>
        )
    },
} satisfies Meta<typeof Pagination>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}
