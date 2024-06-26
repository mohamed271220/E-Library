import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Item = ({ item, user, type, handleSaveItem, isSaved, handleRemoveItem }) => {
    return (
        <Link to={`/${type}/${item._id}`} className="relative w-[28vh]  bg-[#F4F5F7]" >
            <div>
                <div className="relative">
                    <img src={item.image} className=" w-[28vh]  h-[45vh]" alt=" " />
                    {user &&
                        <div onClick={(e) => {
                            e.preventDefault();
                            handleSaveItem({ id: item._id, type: type })
                        }
                        } className="lg:hidden absolute bottom-1 right-1 rounded-full h-10 w-10 bg-white bg-opacity-60 text-dim-yellow flex items-center justify-center text-2xl hover:bg-primary transition-all ">
                            <span className="m-0 ">
                                <AiFillPlusCircle color={"rgb(6 0 92)"} />
                            </span>
                        </div>
                    }
                </div>
                <div className="py-3 flex flex-col px-2 gap-2">
                    <h3 className=" text-[2vh] font-semibold">{item.title}</h3>
                    <p className="text-gray-700  text-[1.8vh]">
                        {type === "journals" || type === "encyclopedias" ? item.publisher : item.author}
                    </p>

                </div>
            </div>
            <div
                className="h-full hidden lg:flex flex-col justify-center items-center w-[28vh]  absolute opacity-0  bg-slate-950/30 text-white bottom-0 transition-all hover:bottom-30 hover:h-220 hover:opacity-100 hover:shadow-lg shadow-dim-blue hover:z-10" >
                {
                    user && !isSaved && <button onClick={(e) => {
                    e.preventDefault();
                    handleSaveItem({ id: item._id, type: type })
                }}
                    className="bg-white rounded hover:shadow-lg shadow-white text-dim-blue text-[2vh] font-bold opacity-1 py-[1.5vh] px-[4vh] mb-[1vh]">
                    Save to library
                </button>
                }
                {
                    user && isSaved && <button onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem({ id: item._id, type: type })
                }}
                    className="bg-white rounded hover:shadow-lg shadow-white text-red-500 text-[1.7vh] font-bold opacity-1 py-[1.5vh] px-[4vh] mb-[1vh]">
                    Remove from library
                </button>
                }
                {!user && <Link className="bg-white rounded hover:shadow-lg shadow-white text-dim-blue text-[2vh] font-bold opacity-1 py-[1.5vh] px-[4vh] mb-[1vh]" to='/auth/login'>
                    Save to library
                </Link>
                }
            </div>
        </Link>
    );
};

export default Item;
