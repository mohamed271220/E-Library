import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePagination = (initialPage) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const navigate = useNavigate();

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            navigate(`?page=${currentPage - 1}`);
        }
    };

    const goToPage = (number) => {
        setCurrentPage(number);
        navigate(`?page=${number}`);
    };

    const goToNextPage = (totalPages) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            navigate(`?page=${currentPage + 1}`);
        }
    };

    return {
        currentPage,
        goToPreviousPage,
        goToPage,
        goToNextPage,
    };
};