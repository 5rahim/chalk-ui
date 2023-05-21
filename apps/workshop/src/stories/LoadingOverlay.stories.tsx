import type { Args, Meta, StoryObj } from "@storybook/react"
import { LoadingOverlay } from "ui"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Overlays/LoadingOverlay",
   component: LoadingOverlay,
   args: {
      show: true,
   },
   tags: ["autodocs"],
   render: (args: Args) => (
      <div className="relative">
         <LoadingOverlay {...args} />
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio expedita explicabo id natus sed! Beatae dolor ducimus eos eveniet ex
         fugit ipsa ipsam nihil nobis recusandae repellendus sint, ut voluptatum!
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio expedita explicabo id natus sed! Beatae dolor ducimus eos eveniet ex
         fugit ipsa ipsam nihil nobis recusandae repellendus sint, ut voluptatum!
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio expedita explicabo id natus sed! Beatae dolor ducimus eos eveniet ex
         fugit ipsa ipsam nihil nobis recusandae repellendus sint, ut voluptatum!
      </div>
   ),
} satisfies Meta<typeof LoadingOverlay>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {},
}
