import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../components/ui/button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/Button",
   component: Button,
   tags: ["autodocs"],
   args: {
      children: "Button",
   },
} satisfies Meta<typeof Button>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {
      children: "Button",
   },
}
export const Loading: Story = {
   args: {
      isLoading: true,
   },
}
export const Disabled: Story = {
   args: {
      isDisabled: true,
   },
}

export const Large: Story = {
   args: {
      size: "lg",
   },
}
export const XLarge: Story = {
   args: {
      size: "xl",
   },
}

export const Small: Story = {
   args: {
      size: "sm",
   },
}

export const Colors: Story = {
   render: () => (
      <div className="flex flex-row gap-2 flex-wrap">
         <Button intent="primary">Button</Button>
         <Button intent="primary-subtle">Button</Button>
         <Button intent="primary-outline">Button</Button>
         <Button intent="primary-link">Button</Button>

          <Button intent="alert">Button</Button>
         <Button intent="alert-subtle">Button</Button>
         <Button intent="alert-outline">Button</Button>
         <Button intent="alert-link">Button</Button>

          <Button intent="success">Button</Button>
         <Button intent="success-subtle">Button</Button>
         <Button intent="success-outline">Button</Button>
         <Button intent="success-link">Button</Button>

          <Button intent="warning">Button</Button>
         <Button intent="warning-subtle">Button</Button>
         <Button intent="warning-outline">Button</Button>
         <Button intent="warning-link">Button</Button>

          <Button intent="gray">Button</Button>
         <Button intent="gray-subtle">Button</Button>
         <Button intent="gray-outline">Button</Button>
         <Button intent="gray-link">Button</Button>

          <Button intent="white">Button</Button>
         <Button intent="white-subtle">Button</Button>
         <Button intent="white-outline">Button</Button>
         <Button intent="white-link">Button</Button>
      </div>
   ),
}
