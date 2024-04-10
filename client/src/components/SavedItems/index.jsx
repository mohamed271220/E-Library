import Carousel from "../Carousel";


const index = ({ title, items, type, refetch }) => (
    <div className="p-[5vh] pt-[6vh] m-[2vh] flex flex-col  border-2 border-gray-200 rounded-md gap-[2vh]">
        <h2 className="font-semibold text-[2.5vh]">{title}</h2>
        {items.length > 0 ? <Carousel refetch={refetch} items={items} type={type} /> : <p className="text-center font-semibold  text-[2.7vh]">No {type} saved yet</p>}
    </div>
);

export default index