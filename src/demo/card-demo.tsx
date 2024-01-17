import { Button } from "@/workshop/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/workshop/card"
import { TextInput } from "@/workshop/text-input"

export default function CardDemo() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    Create an account
                </CardTitle>
                <CardDescription>
                    Create a new account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TextInput
                    className="w-full"
                    placeholder="Username"
                />
            </CardContent>
            <CardFooter>
                <Button>
                    Continue
                </Button>
            </CardFooter>
        </Card>
    )
}
