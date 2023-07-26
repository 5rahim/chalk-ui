import React, { useState } from "react"
import { ColumnSort } from "@tanstack/react-table"

export type DataGridPaginationParams = { pageIndex: number, limit: number }
export type DataGridFilteringParams = { globalFilterValue: string, filters: { id: string, value: unknown }[] }
export type DataGridSortingParams = { columns: ColumnSort[] }

export type DataGridServerSideModelProps = {
    pagination: DataGridPaginationParams
    filtering: DataGridFilteringParams
    sorting: DataGridSortingParams
}

export type DataGridServerSideModel = {
    models: DataGridServerSideModelProps
    setPaginationModel: (params: DataGridPaginationParams) => void
    paginationModel: DataGridPaginationParams
    setFilteringModel: (params: DataGridFilteringParams) => void
    filteringModel: DataGridFilteringParams
    setSortingModel: (params: DataGridSortingParams) => void
    sortingModel: DataGridSortingParams
    isFiltering: boolean
}
/**
 *
 * @param defaultProps
 *
 * Returns an object containing helper functions for manually paginating and filtering.
 *
 * @example
 * const serverSideModel = useDataGridServerSideModel()
 *
 * const res = useQuery({
 *     queryKey: ["data", serverSideModel.getParams()],
 *     queryFn: () => fetchFromFakeServer(serverSideModel.getParams()),
 *     keepPreviousData: true, refetchOnWindowFocus: false
 * })
 *
 * return (
 *     <DataGrid<T>
 *         {...data}
 *         serverSideModel={serverSideModel}
 *         isFetching={dataQuery.isFetching}
 *         rowCount={totalCount}
 *         enableServerSideFiltering
 *         enableServerSideSorting
 *         enableServerSideRowSelection
 *     />
 * )
 */
export const useDataGridServerSideModel = (defaultProps?: { itemsPerPage?: number }): DataGridServerSideModel => {
    const _1: DataGridPaginationParams = { pageIndex: 0, limit: defaultProps?.itemsPerPage ?? 0 }
    const _2: DataGridFilteringParams = { globalFilterValue: "", filters: [] }
    const _3: DataGridSortingParams = { columns: [] }

    const [pagination, setPagination] = useState<DataGridPaginationParams>(_1)
    const [filtering, setFiltering] = useState<DataGridFilteringParams>(_2)
    const [sorting, setSorting] = useState<DataGridSortingParams>(_3)

    const isFiltering = React.useMemo(() => filtering.globalFilterValue !== "" || filtering.filters.length > 0, [filtering])

    return {
        models: React.useMemo(() => ({ pagination, filtering, sorting }), [sorting, pagination, filtering]),
        /**/
        paginationModel: React.useMemo(() => pagination, [pagination]),
        setPaginationModel: (props: DataGridPaginationParams) => setPagination(props),
        /**/
        filteringModel: React.useMemo(() => filtering, [filtering]),
        setFilteringModel: (props: DataGridFilteringParams) => setFiltering(props),
        isFiltering: isFiltering,
        /**/
        sortingModel: React.useMemo(() => sorting, [sorting]),
        setSortingModel: (props: DataGridSortingParams) => setSorting(props),
    }
}
