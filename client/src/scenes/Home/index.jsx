import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import Items from "../../components/Items";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getBooks } from "../../constants/Http";
import Pagination from "../../components/Pagination";
import ErrorBlock from "../../components/ErrorBlock";
const Home = ({ user }) => {
  const searchElement = useRef();
  const [search, setSearch] = useState('');
  const [searchSnap, setSearchSnap] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: response, isPending, isError, error, refetch } = useQuery({
    queryKey: ["books", searchSnap, currentPage],
    queryFn: ({ signal }) => getBooks({ signal, max: 8, page: currentPage, search: search }),
  });

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearch(searchTerm);
    setSearchSnap(searchTerm);
    setCurrentPage(1);
    refetch();
  }


  useEffect(() => {
    if (!search) {
      setSearchSnap('');
    }
  }, [search])


  const data2 = {
    "books": [
      {
        "_id": "1",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "21",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "31",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "41",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "15",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "16",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
      {
        "_id": "17",
        "title": "CURRENT COMMUNICATION DIFFICULTIES",
        "author": "ŞTEFAN VLĂDUŢESCU",
        "image": "https://storage.googleapis.com/furniro/2X56cF0.png",
      },
    ]
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full z-10">
      <div className="w-full px-5 pt-5 rounded-lg flex md:flex-row flex-col justify-between items-center gap-[2vh] " >
        <h1 className="text-[5vh]">All Books:</h1>
        <form onSubmit={handleSearchSubmit} id="search-form" className="relative w-full md:w-[50%]">
          <input
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            placeholder="Search for books...(by title or author)"
            ref={searchElement}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-3 !px-2 !py-1 !text-sm absolute top-0 right-0 h-10 rounded-none rounded-r-lg bg-dim-blue"><AiOutlineSearch color="white" /></button>
        </form>
      </div>
      {isPending && !isError ? <LoadingSkeleton type='feed' />
        :
        <Items type={"books"} isError={false} error={error} items={data2.books} user={user} />
      }
      {
        isError && !isPending && <ErrorBlock title='Something went wrong' message={'err'} />
      }
      <Pagination
        currentPage={currentPage}
        changePage={setCurrentPage}
        totalPages={response?.totalPages}
      />
    </div>
  );
};

export default Home;
