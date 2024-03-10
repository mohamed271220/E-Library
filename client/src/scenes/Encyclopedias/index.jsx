import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import Items from "../../components/Items";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getBooks, getCategories, getEncyclopedias } from "../../constants/Http";
import Pagination from "../../components/Pagination";
import ErrorBlock from "../../components/ErrorBlock";
import { usePagination } from "../../hooks/usePagination";
const Encyclopedias = ({ user }) => {
  const searchElement = useRef();
  const [search, setSearch] = useState('');
  const [searchSnap, setSearchSnap] = useState('');
  const { currentPage, goToPreviousPage, goToPage, goToNextPage } = usePagination(1);
  const { data: encyclopedias, isPending, isError, error, refetch } = useQuery({
    queryKey: ["encyclopedias", searchSnap, currentPage],
    queryFn: ({ signal }) => getEncyclopedias({ signal, limit: 10, page: currentPage, search: search }),
  });


  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearch(searchTerm);
    setSearchSnap(searchTerm);
    goToPage(1);
    refetch();
  }


  useEffect(() => {
    if (!search) {
      setSearchSnap('');
    }
  }, [search])



  return (
    <div
      className="flex flex-col items-center justify-center w-full z-10">
      <div className="w-full px-5 pt-5 rounded-lg flex flex-wrap md:flex-row flex-col justify-between items-center gap-[2vh] " >
        <h1 className="text-[5vh] w-full whitespace-nowrap">All Encyclopedias:</h1>
        <form onSubmit={handleSearchSubmit} id="search-form" className="form-control-input flex flex-row w-full md:w-[50%] gap-3 pb-0 my-2">
          <input
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-md text-sm focus:outline-none"
            type="search"
            placeholder="Search for encyclopedias...(by title, publisher or subject)"
            ref={searchElement}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-3 !px-2 !py-1 !text-sm  h-10 rounded-lg text-white flex items-center gap-3 font-normal bg-dim-blue"><AiOutlineSearch color="white" />Search</button>
        </form>
      </div>
      {isPending && !isError ? <LoadingSkeleton type='feed' />
        :
        <Items type={"encyclopedias"} isError={false} error={error} items={encyclopedias?.encyclopedias} user={user} />
      }
      {
        isError && !isPending && <ErrorBlock title='Something went wrong' message={'err'} />
      }
      {
        !isError && !isPending && !encyclopedias?.encyclopedias?.length && <h1 className="text-[4vh] font-normal mx-auto">No encyclopedias found</h1>
      }
      <Pagination
        currentPage={currentPage}
        changePage={goToPage}
        totalPages={encyclopedias?.totalPages}
      />
    </div>
  );
};

export default Encyclopedias;
