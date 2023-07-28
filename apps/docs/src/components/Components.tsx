import Preview from "@/components/Preview"
import { StorybookButton } from "@/components/StorybookButton"
import { Accordion } from "@/components/ui/accordion"
import { createTypesafeFormSchema, Field, TypesafeForm } from "@/components/ui/typesafe-form"
import { useFileUploadHandler } from "@/components/ui/file-upload"
import { useState } from "react"


export type RegistryProps = {
    name: string,
    title: string,
    slug: string,
    render: () => JSX.Element
}

export const Registry: RegistryProps[] = [
    {
        name: "accordion",
        title: "Accordion",
        slug: "components-data-display-accordion--docs",
        render: () => (
            <Accordion>
                <Accordion.Item title="Easy to use">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aperiam.
                </Accordion.Item>
                <Accordion.Item title="Customizable">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, porro.
                </Accordion.Item>
                <Accordion.Item title="Tailwind">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur enim.
                </Accordion.Item>
            </Accordion>
        ),
    },
    {
        name: "typesafe-form",
        title: "TypesafeForm",
        slug: "components-data-display-accordion--docs",
        render: () => {

            const [data, setData] = useState<any>(undefined)

            const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
                name: z.string().min(2),
                phone: presets.phone,
            }))

            return (
                <>
                    <TypesafeForm
                        schema={testSchema}
                        onSubmit={data => {
                            console.log(data)
                            setData(data)
                        }}
                    >
                        <Field.Text
                            label={"Name"}
                            name={"name"}
                        />
                        <Field.PhoneNumber
                            label={"Phone"}
                            name={"phone"}
                        />
                        <Field.Submit>Submit</Field.Submit>
                    </TypesafeForm>
                    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
                </>
            )
        },
    },
    {
        name: "typesafe-form-loading-overlay",
        title: "TypesafeForm",
        slug: "components-data-display-accordion--docs",
        render: () => {

            const [data, setData] = useState<any>(undefined)

            const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
                name: z.string().min(2),
            }))

            return (
                <>
                    <TypesafeForm
                        schema={testSchema}
                        onSubmit={data => {
                            console.log(data)
                            setData(data)
                        }}
                    >
                        <Field.Text
                            label={"Name"}
                            name={"name"}
                        />
                        <Field.Submit role={"create"}/>
                    </TypesafeForm>
                    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
                </>
            )
        },
    },
    {
        name: "typesafe-form-dropzone",
        title: "TypesafeForm",
        slug: "components-data-display-accordion--docs",
        render: () => {

            const [data, setData] = useState<any>(undefined)

            const uploadHandler = useFileUploadHandler("single")

            const schema = createTypesafeFormSchema(({ z, presets }) => z.object({
                profile_picture: presets.dropzone,
            }))

            return (
                <>
                    <TypesafeForm
                        schema={schema}
                        onSubmit={async data => {
                            const image = await uploadHandler.uploadFiles()
                            if (image) {
                                setData(data)
                            }
                        }}
                    >
                        <Field.Dropzone
                            label={"Profile picture"}
                            name={"profile_picture"}
                            accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
                            withImagePreview
                            uploadHandler={uploadHandler}
                        />
                        <Field.Submit role={"create"}/>
                    </TypesafeForm>
                </>
            )
        },
    },
]

export type Components = typeof Registry

export const Components = () => {
    return (
        <div className={"mt-4 space-y-6"}>
            {Registry.map(component => {
                return <div>
                    <h2 className={"font-semibold text-3xl"}>{component.title}</h2>
                    <Preview>
                        {component.render()}
                    </Preview>
                </div>
            })}
        </div>
    )
}

export const ComponentShowcase = (props: { component: string }) => {
    const component = Registry.find(a => a.name === props.component)
    if (!component) return "N/A"
    return (
        <div className={"mt-6 space-y-6"}>
            <div>
                <StorybookButton slug={component.slug}/>
                <Preview>
                    {component.render()}
                </Preview>
                In order to install the component, run the following command:
            </div>
        </div>
    )
}
