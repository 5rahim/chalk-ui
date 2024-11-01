export const BasicFieldOptionsProps = [
    {
        "name": "id",
        "required": false,
        "description": "* The id of the field. If not provided, a unique id will be generated.",
        "value": "string | undefined",
    },
    {
        "name": "name",
        "required": false,
        "description": "* The form field name.",
        "value": "string",
    },
    {
        "name": "label",
        "required": false,
        "description": "* The label of the field.",
        "value": "React.ReactNode",
    },
    {
        "name": "labelProps",
        "required": false,
        "description": "* Additional props to pass to the label element.",
        "value": "React.LabelHTMLAttributes<HTMLLabelElement>",
    },
    {
        "name": "help",
        "required": false,
        "description": "* Help or description text to display below the field.",
        "value": "React.ReactNode",
    },
    {
        "name": "error",
        "required": false,
        "description": "* Error text to display below the field.",
        "value": "string",
    },
    {
        "name": "required",
        "required": false,
        "description": "* If `true`, the field will be required.",
        "value": "boolean",
    },
    {
        "name": "disabled",
        "required": false,
        "description": "* If `true`, the field will be disabled.",
        "value": "boolean",
    },
    {
        "name": "readonly",
        "required": false,
        "description": "* If `true`, the field will be readonly.",
        "value": "boolean",
    },
]
export const InputStylingProps = [
    {
        "name": "intent",
        "required": false,
        "description": "The style of the input.",
        "value": "\"basic\" | \"filled\" | \"unstyled\"",
    },
    {
        "name": "leftAddon",
        "required": false,
        "description": "",
        "value": "React.ReactNode",
    },
    {
        "name": "leftIcon",
        "required": false,
        "description": "",
        "value": "React.ReactNode",
    },
    {
        "name": "rightAddon",
        "required": false,
        "description": "",
        "value": "React.ReactNode",
    },
    {
        "name": "rightIcon",
        "required": false,
        "description": "",
        "value": "React.ReactNode",
    },
]
export const BaseChartProps = {
    "kind": "type",
    "name": "BaseChartProps",
    "typeProps": [
        {
            "name": "data",
            "required": true,
            "description": "* The data to be displayed in the chart. * An array of objects. Each object represents a data point.",
            "value": "any[] | null | undefined",
        },
        {
            "name": "categories",
            "required": true,
            "description": "* Data categories. Each string represents a key in a data object. * e.g. [\"Jan\", \"Feb\", \"Mar\"]",
            "value": "string[]",
        },
        {
            "name": "index",
            "required": true,
            "description": "* The key to map the data to the axis. It should match the key in the data object. * e.g. \"value\"",
            "value": "string",
        },
        {
            "name": "colors",
            "required": false,
            "description": "* Color palette to be used in the chart.",
            "value": "ChartColor[]",
        },
        {
            "name": "valueFormatter",
            "required": false,
            "description": "* Changes the text formatting for the y-axis values.",
            "value": "ChartValueFormatter",
        },
        {
            "name": "startEndOnly",
            "required": false,
            "description": "* Show only the first and last elements in the x-axis. Great for smaller charts or sparklines. * @default false",
            "value": "boolean",
        },
        {
            "name": "showXAxis",
            "required": false,
            "description": "* Controls the visibility of the X axis. * @default true",
            "value": "boolean",
        },
        {
            "name": "showYAxis",
            "required": false,
            "description": "* Controls the visibility of the Y axis. * @default true",
            "value": "boolean",
        },
        {
            "name": "yAxisWidth",
            "required": false,
            "description": "* Controls width of the vertical axis. * @default 56",
            "value": "number",
        },
        {
            "name": "showAnimation",
            "required": false,
            "description": "* Sets an animation to the chart when it is loaded. * @default true",
            "value": "boolean",
        },
        {
            "name": "showTooltip",
            "required": false,
            "description": "* Controls the visibility of the tooltip. * @default true",
            "value": "boolean",
        },
        {
            "name": "showLegend",
            "required": false,
            "description": "* Controls the visibility of the legend. * @default true",
            "value": "boolean",
        },
        {
            "name": "showGridLines",
            "required": false,
            "description": "* Controls the visibility of the grid lines. * @default true",
            "value": "boolean",
        },
        {
            "name": "autoMinValue",
            "required": false,
            "description": "* Adjusts the minimum value in relation to the magnitude of the data. * @default false",
            "value": "boolean",
        },
        {
            "name": "minValue",
            "required": false,
            "description": "* Sets the minimum value of the shown chart data.",
            "value": "number",
        },
        {
            "name": "maxValue",
            "required": false,
            "description": "* Sets the maximum value of the shown chart data.",
            "value": "number",
        },
        {
            "name": "allowDecimals",
            "required": false,
            "description": "* Controls if the ticks of a numeric axis are displayed as decimals or not. * @default true",
            "value": "boolean",
        },
        {
            "name": "emptyDisplay",
            "required": false,
            "description": "* Element to be displayed when there is no data. * @default `<></>`",
            "value": "React.ReactElement",
        },
    ],
}
