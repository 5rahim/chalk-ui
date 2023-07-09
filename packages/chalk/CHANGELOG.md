# @rahimstack/chalk-ui

## 0.5.7

### Patch Changes

- [`d001e34`](https://github.com/5rahim/chalk-ui/commit/d001e3431609b299b8e37b0ea4f277ef1612c8b2) Thanks [@5rahim](https://github.com/5rahim)! - Publish changes from v0.5.5 and v0.5.6, allow `update` to exit process while in loop

## 0.5.6

### Patch Changes

- [`4084628`](https://github.com/5rahim/chalk-ui/commit/40846284bf536528d1d82a957e6d29f194ff8a3f) Thanks [@5rahim](https://github.com/5rahim)! - Fixed `update` prompt

## 0.5.5

### Patch Changes

- [`8484500`](https://github.com/5rahim/chalk-ui/commit/8484500c4bfc26067b0c67880377f451e90c9c67) Thanks [@5rahim](https://github.com/5rahim)! - Changes

  - **DataGrid**: Made `isLoading` and `enableRowSelection` optional
  - **DataGrid**: Introduced `getFilteringType` for `createDataGridColumns`. Allowed the use of other meta props with
    helpers like `withFiltering` through decoupling
  - **Toast**: Toast element is now customizable
  - **Calendar**: Fixed title style
  - **LoadingSpinner**: Introduced standalone `Spinner` component
  - [BREAKING] **TypesafeForm**: `submit-field`. Property `loadingScreen` renamed to `loadingOverlay` .
    Property `showLoadingScreenOnSuccess` renamed to `showLoadingOverlayOnSuccess`
  - **Fields**: Updated some comments

## 0.5.4

### Patch Changes

- [`0ef7a96`](https://github.com/5rahim/chalk-ui/commit/0ef7a96ad41fcc7eb2b1dbad10653e9fbb9da328) Thanks [@5rahim](https://github.com/5rahim)! - Update README.md

## 0.5.3

### Patch Changes

- [`c63d916`](https://github.com/5rahim/chalk-ui/commit/c63d91679d9d25cb60396c830c6ca431f0cb8798) Thanks [@5rahim](https://github.com/5rahim)! - Changes

  - **PageHeader**: Fixed component props and ref
  - **Fields**: Fixed _RadioCards_ and _SegmentedControl_ data attributes
  - **PriceInput**: Remove unused import
  - **CLI**: Refactored commands
  - **CLI**: `update` can now display the differences in the terminal

## 0.5.2

### Patch Changes

- [`ea8e19c`](https://github.com/5rahim/chalk-ui/commit/ea8e19c493c9aa6f6a1d95e86c3b96c6a4d094ce) Thanks [@5rahim](https://github.com/5rahim)! - Changes

  - **Core**: Removed `SSRProvider` from UIProvider
  - **PriceInput**: Fixed "maximum update depth exceeded" error
  - **Fields**: Removed `onBlur` prop
  - **RadioGroup**: Fixed `data-selected` props
  - **TimeInput**: Fixed type error

## 0.5.1

### Patch Changes

- [`18eda32`](https://github.com/5rahim/chalk-ui/commit/18eda32b611989c597183b8d6f86e28047da4b1c) Thanks [@5rahim](https://github.com/5rahim)! - Changes

  - **NumberInput**: Updated control border colors
  - **Input**: Updated dark mode border colors

## 0.5.0

### Minor Changes

- [`c4ac966`](https://github.com/5rahim/chalk-ui/commit/c4ac966a7281d07cba276c1db1ec87010d13a4c8) Thanks [@5rahim](https://github.com/5rahim)!

  - **CLI**: "update" can now install/update dependencies
  - **MultiSelect**: Fixed "maximum update depth exceeded" error
  - **Combobox**: (In the list) Display option's value when there is no label

## 0.4.2

### Patch Changes

- [`c84e85f`](https://github.com/5rahim/chalk-ui/commit/c84e85fda32fdc5c3c81379d2495b13478720682) Thanks [@5rahim](https://github.com/5rahim)!

  - **TypesafeForm**: Fixed RadioGroup, RadioCards, SegmentedControl default value not showing
  - Changed attribute `data-[current=]` to `data-[selected=]`
  - Updated dependencies

## 0.4.1

### Patch Changes

- [`7aa3a6f`](https://github.com/5rahim/chalk-ui/commit/7aa3a6faad5ebbdf6ab7eac38a7eaf7a196ff3be) Thanks [@5rahim](https://github.com/5rahim)! - Fix: Publish previous update

## 0.4.0

### Minor Changes

- [`b037261`](https://github.com/5rahim/chalk-ui/commit/b037261f583c1c74ca945a1dd5ce27e0e492d0df) Thanks [@5rahim](https://github.com/5rahim)!

  #### CLI

  - Added "update" command
  - Refactored some commands

  #### Components

  - **Checkbox**: Fixed visual shift when selected
  - **SWitch**: Removed commented legacy code
  - Updated dependencies

## 0.3.2

### Patch Changes

- [`15c400f`](https://github.com/5rahim/chalk-ui/commit/15c400f09c24d85bd841d20b53a2af5bd91ae53e) Thanks [@5rahim](https://github.com/5rahim)! - Support manual dependency installation

## 0.3.1

### Patch Changes

- [`5b74393`](https://github.com/5rahim/chalk-ui/commit/5b7439321e49f9237bd1dc26f590792e9829a5b6) Thanks [@5rahim](https://github.com/5rahim)! - Fix incorrect package.json

## 0.3.0

### Minor Changes

- [`3ee61b7`](https://github.com/5rahim/chalk-ui/commit/3ee61b76a9268dcd31a1f616b5a962702170ba4a) Thanks [@5rahim](https://github.com/5rahim)! - "clean" will now ask for confirmation. "init" will install main dependencies after writing files. Catch errors when
  installing dependencies.

## 0.2.0

### Minor Changes

- [`4d9fe2b`](https://github.com/5rahim/chalk-ui/commit/4d9fe2ba05bb5217e687f6faaf6fdc30b5770c8c) Thanks [@5rahim](https://github.com/5rahim)! - "add" will now detect already added components. "remove" will not uninstall shared dependencies.

## 0.1.0

### Minor Changes

- [`5fdf31a`](https://github.com/5rahim/chalk-ui/commit/5fdf31af911479f40c736dd72785191f9a1e5f62) Thanks [@5rahim](https://github.com/5rahim)! - Refactor commands

## 0.0.2

### Patch Changes

- [`f4e7701`](https://github.com/5rahim/chalk-ui/commit/f4e770198065be2ea0d7c9991fa7a5f7c5ff8f8b) Thanks [@5rahim](https://github.com/5rahim)! - Dependency installation

## 0.0.1

### Patch Changes

- [`fbf85e6`](https://github.com/5rahim/chalk-ui/commit/fbf85e6b5f68ec7bbe5abcd9002fcf595c3aa9e9) Thanks [@5rahim](https://github.com/5rahim)! - Release
