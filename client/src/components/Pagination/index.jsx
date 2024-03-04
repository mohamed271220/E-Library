import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Pagination = ({
    currentPage,
    changePage,
    totalPages
}) => {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');

        if (page !== null && page !== currentPage) {
            changePage(Number(page));
        }
    }, [location, currentPage, changePage]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // if you want a smooth scrolling effect
        });
    };

    return (
        <div className="Pagination w-full flex justify-center">
            <ul className="flex flex-row flex-wrap justify-center w-[80%] items-center gap-[2vh]">
                {currentPage > 1 && (
                    <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                        <Link to={`?page=${currentPage - 1}`} onClick={scrollToTop}>
                            Previous
                        </Link>
                    </li>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <li
                        className={`${currentPage === number
                            ? "bg-dim-blue text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            : " bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            }`}
                        key={number}
                    >
                        <Link to={`?page=${number}`} onClick={scrollToTop}>
                            {number}
                        </Link>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                        <Link to={`?page=${currentPage + 1}`} onClick={scrollToTop}>
                            Next
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Pagination;