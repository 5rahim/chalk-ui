import { Button } from "@/workshop/button"
import { Modal } from "@/workshop/modal"
import { Skeleton } from "@/workshop/skeleton"
import { TextInput } from "@/workshop/text-input"

export default function ModalDemo() {
    return (
        <div className="flex gap-2 flex-wrap">
            <Modal
                trigger={<Button>Open modal</Button>}
                title="Edit profile"
                description="Edit your profile information"
                footer={<Button intent="success-subtle">Save changes</Button>}
            >
                <TextInput label="Username" />
            </Modal>
            <Modal
                trigger={<Button>Open scrollable modal</Button>}
                title="Edit profile"
                description="Edit your profile information"
                footer={<Button intent="success-subtle">Save changes</Button>}
                size="lg"
            >
                <TextInput label="Username" />
                <Skeleton className="h-[1300px]">

                </Skeleton>
            </Modal>
        </div>
    )
}
