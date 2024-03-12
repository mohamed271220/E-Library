import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Pagination = ({
    currentPage,
    changePage,
    totalPages,
    setCurrentPage
}) => {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');
    }, [location, currentPage, changePage]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // if you want a smooth scrolling effect
        });
    };


    return (
        <div className="Pagination w-full flex justify-center text-white">
            <ul className="flex flex-row flex-wrap justify-center w-[80%] items-center gap-[2vh]">
                {currentPage > 1 && (
                    <li className="bg-secondary hover:bg-dim-blue transition-all  px-[2vh] py-[1vh] text-[2vh] rounded-[3px] cursor-pointer" onClick={() => { scrollToTop(); changePage(currentPage - 1); setCurrentPage(currentPage - 1) }}>
                        <Link to={`?page=${currentPage - 1}`} >
                            Previous
                        </Link>
                    </li>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <li
                        className={`${currentPage === number
                            ? "bg-dim-blue text-white px-[2vh] py-[1vh] text-[2vh] rounded-[3px] cursor-pointer"
                            : " bg-secondary hover:bg-dim-blue transition-all px-[2vh] py-[1vh] text-[2vh] rounded-[3px] cursor-pointer"
                            }`}
                        key={number}
                        onClick={() => { scrollToTop(); changePage(number); setCurrentPage(number) }}
                    >
                        <Link to={`?page=${number}`}>
                            {number}
                        </Link>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li className="bg-secondary hover:bg-dim-blue transition-all px-[2vh] py-[1vh] text-[2vh] rounded-[3px] cursor-pointer"
                        onClick={() => { scrollToTop(); changePage(currentPage + 1); setCurrentPage(currentPage + 1); }}
                    >
                        <Link to={`?page=${currentPage + 1}`} >
                            Next
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Pagination;