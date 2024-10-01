import React, {FC} from 'react';

import {PropsType} from './pagination.types';
import s from './pagination.module.scss';

export const Pagination: FC<PropsType> = ({
    filter,
    totalItemsCount,
    currentPage,
    onPageChanged,
    pageSize,
    halfPaginationSize = 4,
}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    let minPage = currentPage - halfPaginationSize;
    if (minPage < 1) {
        minPage = 1;
    }

    let maxPage = currentPage + halfPaginationSize;
    if (maxPage > pagesCount) {
        maxPage = pagesCount;
    }

    let previousPage = currentPage - 1;
    if (previousPage < 1) {
        previousPage = 1;
    }

    let nextPage = currentPage + 1;
    if (nextPage > pagesCount) {
        nextPage = currentPage;
    }

    const pages = [];
    for (let i = minPage; i <= maxPage; i++) {
        const page = (
            <span
                onClick={() => onPageChanged(i, filter)}
                key={i}
                className={i === currentPage ? s.active : undefined}
            >
                {i}
            </span>
        );
        pages.push(page);
    }

    return (
        <div className={`${s.pagination}`}>
            <span
                onClick={() => onPageChanged(1, filter)}
            >
                &laquo;
            </span>
            &nbsp;
            <span
                onClick={() => onPageChanged(previousPage, filter)}
            >
                &lt;
            </span>
            {pages}
            <span
                onClick={() => onPageChanged(nextPage, filter)}
            >
                &gt;
            </span>
            &nbsp;
            <span
                onClick={() => onPageChanged(pagesCount, filter)}
            >
                &raquo;
            </span>
        </div>
    );
};

