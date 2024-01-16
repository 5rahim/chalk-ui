import { Breadcrumbs } from "@/workshop/breadcrumbs"

export default function BreadcrumbsDemo() {
    return (
        <Breadcrumbs
            rootHref="#"
            items={[
                {
                    href: "#",
                    isCurrent: false,
                    name: "Project",
                },
                {
                    href: "#",
                    isCurrent: true,
                    name: "Team members",
                },
            ]}
        />
    )
}
