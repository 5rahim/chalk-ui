import { Pagination, PaginationEllipsis, PaginationItem, PaginationTrigger } from "@/workshop/pagination"

export default function PaginationDemo() {
    return (
        <Pagination>
            <PaginationTrigger direction="previous" data-disabled={true} />
            <PaginationItem value={1} data-selected={true} />
            <PaginationItem value={2} />
            <PaginationEllipsis />
            <PaginationItem value={8} />
            <PaginationItem value={10} />
            <PaginationTrigger direction="next" />
        </Pagination>
    )
}
