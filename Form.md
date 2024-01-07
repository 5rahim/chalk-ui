## Uncontrolled form behavior

### Select

- Input type: `radio`
- Value type: `string`
- If not required, the value will not be submitted if no option is selected.

### RadioGroup

- Input type: `radio`
- Value type: `string`
- If not required, the value will not be submitted if no option is selected.

### Switch

- Input type: `checkbox`
- Value type: `"on" | "off"`
- If not required, `"off"` will be submitted if the switch is not checked.
- If required, `"on"` will need to be the value of the checkbox (The switch needs to be checked).

### Checkbox

- Input type: `checkbox`
- Value type: `"on" | "off" | "indeterminate"`
- If not required, `"off"` will be submitted if the checkbox is not checked.
- If required, `"on"` will need to be the value of the checkbox (The checkbox needs to be checked).

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
- If not required, an empty string will be submitted if the input is empty.

### Combobox

- Input type: `text`
- Value type: `string` (`JSON.stringify(["a", ...])`)
- A stringified array of selected values will be submitted.
- If not required, a stringified empty array will be submitted if no option is selected.

### CheckboxGroup

- Input type: `text`
- Value type: `string` (`JSON.stringify(["a", ...])`)
- A stringified array of selected values will be submitted.
- If not required, a stringified empty array will be submitted if no option is selected.

### Autocomplete

- Input type: `text`
- Value type: `string`
- Only the value of the input will be submitted.
- If not required, an empty string will be submitted if the input is empty.

### DatePicker

- Input type: `date`
- Value type: `date` (`"yyyy-MM-dd"`)
- If not required, an empty string will be submitted if the input is empty.

### DateRangePicker

- Input type: `text`
- Value type: `string` (`"yyyy-MM-dd,yyyy-MM-dd"`)
- If not required, an empty string will be submitted if the input is empty.

### SimpleDropzone

- Input type: `file`
- Value type: `File[]`
