import { Button } from "@/workshop/button"
import { Modal } from "@/workshop/modal"
import { TextInput } from "@/workshop/text-input"

export default function ModalDemo() {
    return (
        <Modal
            trigger={<Button>Open modal</Button>}
            title="Edit profile"
            description="Edit your profile information"
            footer={<Button intent="success-subtle">Save changes</Button>}
        >
            <TextInput label="Username" />
        </Modal>
    )
}
