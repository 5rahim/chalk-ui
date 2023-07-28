import React, { useState } from "react"
import { ColumnSort } from "@tanstack/react-table"

export type DataGridPaginationModel = { pageIndex: number, limit: number }
export type DataGridFilteringModel = { globalFilterValue: string, filters: { id: string, value: unknown }[] }
export type DataGridSortingModel = { columns: ColumnSort[] }

export type DataGridServerSideModels = {
    pagination: DataGridPaginationModel
    filtering: DataGridFilteringModel
    sorting: DataGridSortingModel
}

export type DataGridServerSideModel = {
    all: DataGridServerSideModels
    /**
     * @internal
     */
    internal_setPaginationModel: (params: DataGridPaginationModel) => void
    paginationModel: DataGridPaginationModel
    /**
     * @internal
     */
    internal_setFilteringModel: (params: DataGridFilteringModel) => void
    filteringModel: DataGridFilteringModel
    /**
     * @internal
     **/
    internal_setSortingModel: (params: DataGridSortingModel) => void
    sortingModel: DataGridSortingModel
    isFiltering: boolean
}

export interface DataGridServerSideModelProps {
    initialState?: {
        pageIndex?: number
        rowsPerPage?: number
        globalFilterValue?: string
        filters?: DataGridFilteringModel["filters"],
        sorting?: DataGridSortingModel["columns"]
    }
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
export const useDataGridServerSideModel = (defaultProps?: DataGridServerSideModelProps): DataGridServerSideModel => {
    const initialState = defaultProps?.initialState

    const _1: DataGridPaginationModel = {
        pageIndex: initialState?.pageIndex ?? 0,
        limit: initialState?.rowsPerPage ?? 5
    }
    const _2: DataGridFilteringModel = {
        globalFilterValue: initialState?.globalFilterValue ?? "",
        filters: initialState?.filters ?? []
    }
    const _3: DataGridSortingModel = {
        columns: initialState?.sorting ?? []
    }

    const [pagination, setPagination] = useState<DataGridPaginationModel>(_1)
    const [filtering, setFiltering] = useState<DataGridFilteringModel>(_2)
    const [sorting, setSorting] = useState<DataGridSortingModel>(_3)

    const isFiltering = React.useMemo(() => filtering.globalFilterValue !== "" || filtering.filters.length > 0, [filtering])

    return {
        all: React.useMemo(() => ({ pagination, filtering, sorting }), [sorting, pagination, filtering]),
        /**/
        paginationModel: React.useMemo(() => pagination, [pagination]),
        internal_setPaginationModel: (props: DataGridPaginationModel) => setPagination(props),
        /**/
        filteringModel: React.useMemo(() => filtering, [filtering]),
        internal_setFilteringModel: (props: DataGridFilteringModel) => setFiltering(props),
        isFiltering: isFiltering,
        /**/
        sortingModel: React.useMemo(() => sorting, [sorting]),
        internal_setSortingModel: (props: DataGridSortingModel) => setSorting(props),
    }
}
