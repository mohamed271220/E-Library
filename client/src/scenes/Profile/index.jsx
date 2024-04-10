import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { getProfile } from "../../constants/Http";
import { useSelector } from "react-redux";
import Skeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import ErrorBlock from "../../components/ErrorBlock";
import Carousel from "../../components/Carousel";
import SavedItems from "../../components/SavedItems";

const index = () => {
  const token = useSelector(state => state.auth.token);
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => getProfile({ signal, token }),
  })
  if (isPending) {
    return <div className=" flex justify-center items-center min-h-[100vh]">
      <Skeleton type={'menu'} />
    </div>;
  }
  if (isError) {
    return <div className='flex h-[100vh] justify-center items-center'>
      <ErrorBlock title={"Not found"} message={error.message} />
    </div>
  }
  return (
    <div className="min-h-[100vh] flex flex-col gap-[2vh]">
      <div className="info">
        <div className="flex flex-col justify-center items-center gap-[1.5vh]">
          <img src={data.user.image} alt="profile" className="w-[10vh] h-[10vh] rounded-full object-cover" />
          <div className="flex flex-col justify-center items-center" >
            <h1 className="font-semibold text-[2.5vh]">{data.user.name}</h1>
            <h1 className=" text-[2vh]">{data.user.email}</h1>
          </div>
        </div>
      </div>
      <SavedItems title="Saved books" items={data.user.savedBooks} type="books" refetch={refetch} />
      <SavedItems title="Saved journals" items={data.user.savedJournals} type="journals" refetch={refetch} />
      <SavedItems title="Saved encyclopedias" items={data.user.savedEncyclopedias} type="encyclopedias" refetch={refetch} />
      <SavedItems title="Saved theses" items={data.user.savedTheses} type="theses" refetch={refetch} />
      <SavedItems title="Saved researches" items={data.user.savedResearches} type="researches" refetch={refetch} />
    </div>
  )
}

export default index