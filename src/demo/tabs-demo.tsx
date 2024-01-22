import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/workshop/tabs"

export default function TabsDemo() {
    return (
        <div className="max-w-[600px] border rounded-[--radius]">
            <Tabs
                defaultValue="account"
            >
                <TabsList className="grid w-full grid-cols-2 border-b">
                    <TabsTrigger value="account">
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        Password
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <div className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci deserunt hic, iste maxime nihil numquam officia optio,
                        qui quis quo reprehenderit tempore vel. Ab at deleniti nihil perspiciatis velit.
                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <div className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam atque delectus deserunt dignissimos eaque et eum
                        eveniet, ipsam iure minus molestias natus officiis omnis optio quis soluta tempore voluptatem!
                    </div>
                </TabsContent>
            </Tabs>
        </div>

    )
}
