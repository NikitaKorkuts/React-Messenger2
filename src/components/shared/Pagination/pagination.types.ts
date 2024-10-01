import {FilterType} from '../../../store/users/users.types';

export type PropsType = {
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number, filter: FilterType) => void
    pageSize: number
    halfPaginationSize?: number
    filter: FilterType
}