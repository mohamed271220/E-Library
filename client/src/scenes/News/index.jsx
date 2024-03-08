import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../../constants/Http"
import { useEffect, useRef, useState } from "react"
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner"
import ErrorBlock from "../../components/ErrorBlock"
import Posts from "../../components/Posts"
import Pagination from "../../components/Pagination"
import { usePagination } from "../../hooks/usePagination"
import { AiOutlineSearch } from "react-icons/ai"
import LoadingSkeleton from "../../constants/Loading/SkeletonTwo/Skeleton"

const News = () => {
  const searchElement = useRef();
  const [search, setSearch] = useState('');
  const [searchSnap, setSearchSnap] = useState(false);
  const { currentPage, goToPage } = usePagination(1);
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => getPosts({ signal, searchTerm: search, limit: 10, page: currentPage })
  })
  const { data: newestData, isError: newestError, isPending: newestIsPending, error: newestErrorInfo, refetch: newestRefetch } = useQuery({
    queryKey: ['newestPosts'], queryFn: ({ signal }) => getPosts({ signal, limit: 3 })
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

  let content;

  if (isPending && !isError) {
    content = <LoadingSkeleton type='feed' />
  }


  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred while fetching the posts"
        error={error.info?.message || "failed"}
      />
    );
  }



  if (!isError && !isPending && !data) {
    content = <h1 className="text-[4vh] font-normal mx-auto">No posts found</h1>
  }

  if (data) {
    content = (<Posts posts={data?.posts} />
    )
  }

  return (
    <div>
      <div className="flex flex-col-reverse gap-[2vh] items-start  w-full
       p-5 rounded-lg shadow-lg 
       md:flex-row  
       px-[4vh] md:px-[121px]
      ">
        <div className="w-full md:w-[70%] p-5 rounded-lg  
        flex flex-col justify-center items-center gap-[2vh]
        ">
          <Pagination
            currentPage={currentPage}
            changePage={goToPage}
            totalPages={data?.totalPages}
          />
          <div className="text-center flex flex-col">
            {searchSnap !== '' && <h1 className="text-[2vh] font-semibold mx-auto">Search results : <span className="m-0 text-slate-400">{searchSnap}</span></h1>}
            <h1 className="text-[2.5vh] font-semibold mx-auto">{
              data?.posts?.length ? `Posts found (${data?.posts?.length})` : 'No posts found'}</h1>
          </div>
          {content}
          <Pagination
            currentPage={currentPage}
            changePage={goToPage}
            totalPages={data?.totalPages}
          />
        </div>
        <div className="w-full md:w-[30%]  p-5 rounded-lg flex flex-col justify-center items-center gap-[2vh]
        " >
          <form onSubmit={handleSearchSubmit} id="search-form" className="relative w-full">
            <input
              type="search"
              placeholder="Search posts"
              className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              ref={searchElement}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-3 bg-dim-blue !px-2 !py-1 !text-sm absolute top-0 right-0 h-10 rounded-lg"><AiOutlineSearch color="white" /></button>
          </form>
          <div className="w-full h-fit rounded-lg">
            <h2 className="text-[2.5vh] font-normal pb-[2vh]">Newest Posts</h2>
            {
              newestIsPending && !isError && <LoadingSpinner />
            }
            {newestError && !newestIsPending && <ErrorBlock title="An error occurred while fetching the posts" error={newestErrorInfo?.message || "failed"} />}
            {newestData && !newestError && <Posts isWidget={true} posts={newestData?.posts} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default News;