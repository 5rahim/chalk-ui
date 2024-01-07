## Uncontrolled form behavior

### Select

- Input type: `radio`
- Value type: `string`
- If not required, the value will not be submitted if no option is selected.

### Radio

- Input type: `radio`
- Value type: `string`
- If not required, the value will not be submitted if no option is selected.

### Switch

- Input type: `checkbox`
- Value type: `"on" | "off"`
- If not required, `"off"` will be submitted if the switch is not checked.

### Checkbox

- Input type: `checkbox`
- Value type: `"on" | "off" | "indeterminate"`
- If not required, `"off"` will be submitted if the checkbox is not checked.
- If required, `"on"` will need to be the value of the checkbox.

### PhoneInput

- Input type: `tel`
- Value type: `string`
- The selected country will also be submitted as a separate field of name `{input_name}_country`.

### CurrencyInput

- Input type: `text`
- Value type: `string`

### NumberInput

- Input type: `text`
- Value type: `string`

### Combobox

- Input type: `text`
- Value type: `string` (`JSON.stringify(["a", ...])`)

### DatePicker

- Input type: `date`
- Value type: `date` (`"yyyy-MM-dd"`)

### DateRangePicker

- Input type: `text`
- Value type: `string` (`"yyyy-MM-dd,yyyy-MM-dd"`)

### SimpleDropzone

- Input type: `file`
- Value type: `File[]`
