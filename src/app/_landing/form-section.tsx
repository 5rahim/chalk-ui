"use client"
import { AppLayoutGrid, AppLayoutStack } from "@/workshop/app-layout"
import { Card } from "@/workshop/card"
import { defineSchema, Field, Form } from "@/workshop/form"
import { setDate, setMonth, setYear } from "date-fns"
import React from "react"
import { BiCheck, BiCheckCircle } from "react-icons/bi"
import { toast } from "sonner"

const schema = defineSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: z.date(),
    bounty: z.string()
        .refine(v => Number(v) >= 3_000_000_000,
            { message: "Bounty must be at least ฿3,000,000,000" }),
}))

export function FormSection() {

    return (
        <div className="container max-w-8xl py-20 lg:py-40 z-[1]">
            <AppLayoutGrid cols={4} breakBelow="xl" spacing="lg" className="flex-row-reverse lg:flex-col z-[1]">

                <AppLayoutStack className="col-span-2">

                    <pre
                        className="max-h-[850px] p-4 lg:p-8 overflow-x-auto rounded-lg border bg-gray-900 dark:bg-gray-950 relative"
                        data-language="tsx"
                        data-theme="default"
                    >
  <code
      className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
      data-language="tsx"
      data-theme="default"
  >
    <span className="line">
      <span style={{ color: "rgb(126, 203, 199)" }}>import</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>
        {" "}
          {"{"}defineSchema, Field, Form{"}"}{" "}
      </span>
      <span style={{ color: "rgb(126, 203, 199)" }}>from</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> </span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"@/workshop/form"</span>
    </span>
      {"\n"}
      <span className="line"> </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(126, 203, 199)" }}>const</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> schema = </span>
      <span style={{ color: "rgb(235, 200, 141)" }}>defineSchema</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>
        (({"{"} z, presets {"}"}){" "}
      </span>
      <span style={{ color: "rgb(126, 203, 199)" }}>=&gt;</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> z.</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>object</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>({"{"}</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"    "}name: z.</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>string</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>().</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>min</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>(</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>2</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>),</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>
        {"    "}birthday: presets.
      </span>
      <span style={{ color: "rgb(175, 156, 255)" }}>datePicker</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>,</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"    "}bounty: z.</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>string</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>()</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"        "}.</span>
      <span style={{ color: "rgb(235, 200, 141)" }}>refine</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>(v </span>
      <span style={{ color: "rgb(126, 203, 199)" }}>=&gt;</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> </span>
      <span style={{ color: "rgb(235, 200, 141)" }}>Number</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>(v) &gt;= </span>
      <span style={{ color: "rgb(235, 200, 141)" }}>3_000_000_000</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>,</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>
        {"            "}
          {"{"} message:{" "}
      </span>
      <span style={{ color: "rgb(222, 160, 96)" }}>
        "Bounty must be at least ฿3,000,000,000"
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}> {"}"})</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"}"}))</span>
    </span>
      {"\n"}
      <span className="line"> </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(126, 203, 199)" }}>export</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> </span>
      <span style={{ color: "rgb(126, 203, 199)" }}>function</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> </span>
      <span style={{ color: "rgb(238, 238, 238)", fontWeight: "bold" }}>
        FormDemo
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>() {"{"}</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"    "}</span>
      <span style={{ color: "rgb(126, 203, 199)" }}>return</span>
      <span style={{ color: "rgb(202, 202, 202)" }}> (</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"        "}&lt;</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Form</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"            "}schema
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"{"}schema{"}"}
      </span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"            "}onSubmit
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(175, 156, 255)" }}>{"{"}data </span>
      <span style={{ color: "rgb(126, 203, 199)" }}>=&gt;</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> {"{"}</span>
      <span style={{ color: "rgb(137, 137, 137)" }}>/* ... */</span>
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"}"}
          {"}"}
      </span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"            "}defaultValues
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(175, 156, 255)" }}>{"{"}</span>
      <span style={{ color: "rgb(137, 137, 137)" }}>/* ... */</span>
      <span style={{ color: "rgb(175, 156, 255)" }}>{"}"}</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>{"        "}</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"            "}&lt;</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>div</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> className</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"flex gap-3"</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>
        {"                "}&lt;
      </span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Field.Text</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> name</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"name"</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> label</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"Name"</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>/&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>
        {"                "}&lt;
      </span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Field.DatePicker</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> name</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"birthday"</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> label</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"Birthday"</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>/&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"            "}&lt;/</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>div</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"            "}&lt;</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Field.Currency</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"                "}name
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"bounty"</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"                "}label
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"Bounty"</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>
        {"                "}prefix
      </span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"฿"</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(175, 156, 255)" }}>{"            "}</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>/&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"            "}&lt;</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Field.Submit</span>
      <span style={{ color: "rgb(175, 156, 255)" }}> role</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>=</span>
      <span style={{ color: "rgb(222, 160, 96)" }}>"save"</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;Save&lt;/</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Field.Submit</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"        "}&lt;/</span>
      <span style={{ color: "rgb(132, 191, 249)" }}>Form</span>
      <span style={{ color: "rgb(202, 202, 202)" }}>&gt;</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"    "})</span>
    </span>
      {"\n"}
      <span className="line">
      <span style={{ color: "rgb(202, 202, 202)" }}>{"}"}</span>
    </span>
  </code>
</pre>


                </AppLayoutStack>


                <AppLayoutStack className="col-span-2 order-first xl:order-last">

                    <h1 className="text-pretty">Fully-featured Form</h1>
                    <p className="text-lg lg:text-xl font-medium text-[--muted] text-pretty">Build forms effortlessly with little to no boilerplate.
                    Powered by React Hook Form and Zod.</p>

                    <ul className="space-y-1">
                      <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg"/>Type safe</li>
                      <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg"/>Validation</li>
                      <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg"/>Error messages</li>
                      <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg"/>No boilerplate</li>
                      <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg"/>15+ Input components</li>
                    </ul>

                    <Card className="p-4 relative overflow-hidden">
                        <Form
                            schema={schema}
                            onSubmit={data => {
                                toast("Form submitted successfully!", {
                                    description:
                                        <pre className="max-w-full overflow-x-auto p-1 rounded-[--radius] bg-[--subtle] border text-sm">{JSON.stringify(
                                            data,
                                            null,
                                            2)}</pre>,
                                    position: "bottom-right",
                                })
                            }}
                            defaultValues={{ name: "Luffy", birthday: setYear(setDate(setMonth(new Date(), 4), 5), 1999), bounty: "1500000000" }}
                        >
                            <div className="flex gap-3">
                                <Field.Text name="name" label="Name" />
                                <Field.DatePicker name="birthday" label="Birthday" />
                            </div>
                            <Field.Currency name="bounty" label="Bounty" prefix="฿" />
                            <Field.Submit className="w-full" intent="gray-outline" role="save">Save</Field.Submit>
                        </Form>
                    </Card>

                </AppLayoutStack>

            </AppLayoutGrid>
        </div>
    )
}
