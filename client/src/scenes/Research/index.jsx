import { Link, useParams } from "react-router-dom";

import { getBookById, getJournalById, getResearchById } from "../../constants/Http";
import Skeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { FiChevronDown, FiEdit2, FiPlusCircle } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';


const Research = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [openedIndex, setOpenedIndex] = useState(null);

  const user = useSelector(state => state.auth.data);

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

  const addToLibraryHandler = async () => {
    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/`,
        { number: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      if (response) {
        toast.update(id, {
          render: "Research added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add research to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['research', id],
    queryFn: ({ signal }) => getResearchById({ signal, id }),

  })

  if (isPending) {
    return <Skeleton type={'menu'} />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3 relative">
      {
        user && user.role === "admin"
 &&
        <div className="flex absolute bg-black rounded-lg bg-opacity-15 gap-[1vh] top-0 right-0 p-[1vh] ">
          <Link to={`/admin/addResearch?id=${id}`} className="btn-3 border-none bg-dim-blue p-3"><FiEdit2 color="white" /></Link>
          <button className="btn-3 border-none bg-dim-blue p-3"><AiFillDelete color="white" /></button>
        </div>
      }
      <div className="research flex flex-col gap-2 ">
        <div className="info w-full md:px-9 px-4 gap-4 py-[2vh] flex md:flex-row flex-col ">
          {/* images  */}
          <div className="md:mx-0 mx-auto flex lg:flex-row flex-col-reverse gap-[2vh] w-full md:w-[50%]">
            <img className="md:w-[85%] md:h-[110vh] rounded-lg" src={data.research.image} alt="" />
          </div>
          {/* details */}
          <div className="flex flex-col gap-4 w-full md:w-[40%]">
            <h2 className="text-[4.5vh] fond-semibold">{data.research.title}</h2>
            <h2 className="text-[2vh]  font-bold">Written By :<p className="text-secondary">{" "}{data.research.author}</p> </h2>
            <h2 className="text-[2vh]  font-bold">Written in :<p className="text-secondary">{" "}{data.research.year}</p> </h2>
            <div>
              <p className="text-[2vh] font-bold">abstract :</p>
              <hr className="w-[100%]" />
              <p className="text-[1.7vh]">{data.research.abstract}</p>
            </div>
            <h2 className="text-[2vh]  font-semibold">specialization :<p className="text-secondary">{" "}{data.research.specialization}</p> </h2>
            <h2 className="text-[2vh]  font-semibold">citations :<p className="text-secondary">{" "}{data.research.citations}</p> </h2>
            <h2 className="text-[2vh]  font-semibold">DOI :<p className="text-secondary">{" "}{data.research.doi}</p> </h2>
            <div className="flex flex-row items-center  text-[3vh] gap-[3vh] mt-[3vh]">
              <div className="btn-3 border-none bg-primary hover:py-[1.5vh] hover:px-[7vh] hover:rounded-[5px]">
                <button onClick={() => {
                }}>Add to library </button>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* editions */}
        <div className="volumes w-full md:px-9 px-4 gap-4 py-[2vh] flex  flex-col ">
          <h2 className="text-[5vh] fond-semibold">Read now:</h2>
          <iframe src={data.research.pdfLink} style={{ width: '100%', height: '500px' }}></iframe>
        </div>
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
    </div>
  );
};

export default Research;
