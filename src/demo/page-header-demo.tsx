import { Avatar } from "@/workshop/avatar"
import { Button } from "@/workshop/button"
import { PageHeader } from "@/workshop/page-header"
import { BiEditAlt } from "react-icons/bi"

export default function PageHeaderDemo() {
    return (
        <PageHeader
            image={<Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" size="lg" />}
            title="One Piece"
            description="Manga by Oda Eiichiro"
            action={<>
                <Button intent="gray-outline" leftIcon={<BiEditAlt />}>Action</Button>
            </>}
            className="w-full"
        />
    )
}
