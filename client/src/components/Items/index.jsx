import Item from "../Item";
import ErrorBlock from "../ErrorBlock";
import { useMutation } from "@tanstack/react-query";
import { saveItemToLibrary } from "../../constants/Http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const config = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    draggable: true,
    progress: undefined,
    theme: "light",
};

const Items = ({ items, type, error, isError }) => {

    const user = useSelector((state) => state.auth.data);
    const token = useSelector((state) => state.auth.token);
    if (isError) {
        return <ErrorBlock title='Something went wrong' message={error} />
    }

    const handleSaveItem = async (item) => {
        const signal = new AbortController().signal;
        const id = toast.loading("Please wait...");
        try {
            await saveItemToLibrary({ signal, id: item.id, type: item.type, token: token });
            toast.update(id, {
                render: "Item added successfully",
                type: "success",
                ...config,
                isLoading: false,
            });
        } catch (error) {
            toast.update(id, {
                render: "Item already added.",
                type: "error",
                isLoading: false,
                ...config,
            });
        }
    };

    return (
        <section className=" md:py-[25px] py-[20px] lg:px-[100px] px-[5vh] flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-wrap justify-center items-start  flex-row  gap-[2vh] ">
                {items?.map((item) => (
                    <Item
                        key={item._id}
                        item={item}
                        user={user}
                        type={type}
                        handleSaveItem={handleSaveItem}
                    />
                ))}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
};

export default Items;
