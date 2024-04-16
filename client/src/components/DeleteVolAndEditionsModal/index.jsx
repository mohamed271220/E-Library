import Modal from "../Modal";
import { useState } from "react";
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';

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


const DeleteVolAndEditionsModal = ({ type, onClose, isOpen, id, vid }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const deleteItem = async (type, id, vid) => {
        await axios.delete(`api/admin/${type}/${id}${(type === 'books' ? "/editions/" : "/volumes/") + vid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Deleted successfully', config);
                navigate('/books', { replace: true });
            }
        }).catch((err) => {
            toast.error(err.response.data.message, config);
        });
    };

    return (
        <>
            <Modal isForm={true} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col justify-center items-center gap-[5vh]">
                <h1 className="text-[4.5vh]">Are you sure you want to delete this item?</h1>
                <div className="flex flex-row w-full justify-between">
                <button className="btn-3 bg-red-600 border-red-600 text-white hover:bg-red-800" onClick={() => deleteItem(type, id, vid)}>Confirm</button>
                <button className="btn-3 bg-white" onClick={onClose}>Cancel</button>
                </div>
            </div>
            </Modal>
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
        </>
    );
};

export default DeleteVolAndEditionsModal;
