import React from "react"
import { useToast } from "@/components/ui/toast"
import { AppLayout } from "@/components/ui/app-layout"
import { DemoNavbar } from "@/app/test/ClientTest"
import { Card } from "@/components/ui/card"

export const UITest_Stacked: React.FC<{ children?: React.ReactNode }> = (props) => {

    const { children, ...rest } = props
    const toast = useToast()

    return (
        <>
            <AppLayout>
                <AppLayout.Header>
                    <DemoNavbar/>
                </AppLayout.Header>
                <AppLayout.Content>
                    <div className={"container max-w-7xl py-5"}>
                        <Card>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur debitis ea eum laudantium libero nihil
                            quasi quidem quis, recusandae ullam ut vero! Consequuntur id minima natus quo voluptas.
                        </Card>
                    </div>
                </AppLayout.Content>
                <AppLayout.Footer className={"text-center font-medium text-[--muted] pb-10"}>
                    Copyright &copy; 5rahim
                </AppLayout.Footer>
            </AppLayout>
        </>
    )

}
