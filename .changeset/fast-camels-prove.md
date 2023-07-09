---
"@rahimstack/chalk-ui": patch
---

Changes

- **DataGrid**: Made `isLoading` and `enableRowSelection` optional
- **DataGrid**: Introduced `getFilteringType` for `createDataGridColumns`. Allowed the use of other meta props with
  helpers like `withFiltering` through decoupling
- **Toast**: Toast element is now customizable
- **Calendar**: Fixed title style
- **LoadingSpinner**: Introduced standalone `Spinner` component
- [BREAKING] **TypesafeForm**: `submit-field`. Property `loadingScreen` renamed to `loadingOverlay` .
  Property `showLoadingScreenOnSuccess` renamed to `showLoadingOverlayOnSuccess`
- **Fields**: Updated some comments
