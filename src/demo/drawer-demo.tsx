import { Button } from "@/workshop/button"
import { Drawer } from "@/workshop/drawer"
import { TextInput } from "@/workshop/text-input"

export default function DrawerDemo() {
    return (
        <Drawer
            trigger={<Button>Open drawer</Button>}
            title="Edit profile"
            description="Edit your profile information"
            footer={<Button intent="success-subtle">Save changes</Button>}
        >
            <div className="py-4">
                <TextInput label="Username" />
            </div>
        </Drawer>
    )
}
