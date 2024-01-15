import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader } from "@/workshop/app-layout"
import { Avatar } from "@/workshop/avatar"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"

export default function AppLayoutDemo() {
    return (
        <AppLayout>
            <AppLayoutHeader>
                <div className="w-full h-[60px] border-b bg-brand-50 dark:bg-gray-900">
                    <div className="flex h-full w-full justify-between items-center px-4">
                        <div className="text-lg font-bold">Logo</div>
                        <DropdownMenu
                            trigger={<div className="flex items-center gap-2 cursor-pointer">
                                <Avatar size="xs" />
                                <p className="text-sm">5rahim</p>
                            </div>}
                        >
                            <DropdownMenuItem>My account</DropdownMenuItem>
                            <DropdownMenuItem>Sign out</DropdownMenuItem>
                        </DropdownMenu>
                    </div>
                </div>
            </AppLayoutHeader>
            <AppLayoutContent className="container max-w-7xl py-5 h-64 bg-indigo-50 dark:bg-gray-600">
                <div className="bg-[--background] w-full h-full" />
            </AppLayoutContent>
            <AppLayoutFooter className="bg-green-50 dark:bg-gray-800 text-center text-sm font-medium text-[--muted] py-4">
                Chalk UI
            </AppLayoutFooter>
        </AppLayout>
    )
}
