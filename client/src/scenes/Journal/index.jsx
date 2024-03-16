import { Link, useParams } from "react-router-dom";

import { getBookById, getJournalById } from "../../constants/Http";
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


const Journal = () => {
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
          render: "Journal added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add journal to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['journal', id],
    queryFn: ({ signal }) => getJournalById({ signal, id }),

  })

  const journalVolume = [
    {
      volumeNumber: 1,
      publicationDate: "2021-10-10",
      pdfLink: "https://storage.googleapis.com/furniro/Ph.d Neutrosophic.pdf",
    },
    {
      volumeNumber: 1,
      publicationDate: "2021-10-10",
      pdfLink: "https://storage.googleapis.com/furniro/Ph.d Neutrosophic.pdf",
    }
  ]

  if (isPending) {
    return <Skeleton type={'menu'} />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3 relative">
      {/* user && user.role === "admin" */}
      {
        true &&
        <div className="flex absolute bg-black rounded-lg bg-opacity-15 gap-[1vh] top-0 right-0 p-[1vh] ">
          <Link to={`/admin/addJournal?id=${id}`} className="btn-3 border-none bg-dim-blue p-3"><FiEdit2 color="white" /></Link>
          <button className="btn-3 border-none bg-dim-blue p-3"><AiFillDelete color="white" /></button>
        </div>
      }
      <div className="journal flex flex-col gap-2 ">
        <div className="info w-full md:px-9 px-4 gap-4 py-[2vh] flex md:flex-row flex-col ">
          {/* images  */}
          <div className="md:mx-0 mx-auto flex lg:flex-row flex-col-reverse gap-[2vh] w-full md:w-[50%]">
            <img className="md:w-[85%] md:h-[110vh] rounded-lg" src={data.journal.image} alt="" />
          </div>
          {/* details */}
          <div className="flex flex-col gap-4 w-full md:w-[40%]">
            <h2 className="text-[4.5vh] fond-semibold">{data.journal.title}</h2>
            <h2 className="text-[2vh]  font-bold">Published By :<p className="text-secondary">{" "}{data.journal.publisher}</p> </h2>
            <div>
              <p className="text-[2vh] font-bold">Subject :</p>
              <hr className="w-[100%]" />
              <p className="text-[1.7vh]">{data.journal.subject}</p>
            </div>
            <h2 className="text-[2vh]  font-semibold">ISSN :<p className="text-secondary">{" "}{data.journal.ISSN}</p> </h2>
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
          <h2 className="text-[5vh] fond-semibold">Volumes</h2>
          <div className="flex flex-col gap-4 w-full overflow-auto">
            <table className="table-auto w-full ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th>Volume Number</th>
                  <th>Publication Date</th>
                  <th> - </th>
                  {/* user?.role === "admin" */}
                  {
                    true && (
                      <th>Actions</th>
                    )}
                </tr>
              </thead>
              <tbody>

                {
                  journalVolume.map((volume, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr
                          onClick={() => setOpenedIndex(index === openedIndex ? null : index)}
                          className={`cursor-pointer ${openedIndex === index ? 'bg-blue-200 border-b-0' : ''}`}
                        >
                          <td>{volume.volumeNumber}</td>
                          <td>{volume.publicationDate}</td>
                          <td>
                            <button className="btn-3 px-[1vh] bg-dim-blue text-[1.6vh] font-normal text-white flex items-center">
                              open
                              <FiChevronDown color="white" className={`transition-transform duration-500 ml-2 ${openedIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                          </td>
                          {/* user?.role === "admin" */}
                          {
                            true && (
                              <td>
                                <button className="btn-3 p-[1.5vh] bg-dim-blue  text-[1.6vh] font-normal text-white"><FiEdit2 color="white" /></button>
                                <button className="btn-3 p-[1.5vh] bg-dim-blue  text-[1.6vh] font-normal text-white ml-2"><AiFillDelete color="white" /></button>
                              </td>
                            )}
                        </tr>
                        <AnimatePresence>
                          {openedIndex === index && (
                            <motion.tr className="bg-blue-100" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                              <td colSpan="4">
                                <iframe src={volume.pdfLink} style={{ width: '100%', height: '500px' }}></iframe>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    )
                  })
                }
       {/* user?.role === "admin" */}      {         
        true  &&  <tr className="border-0">
                  <td colSpan="4" className="text-center cursor-pointer">
                    <button className="flex items-center justify-center">
                      <FiPlusCircle className="mr-2" color="green-400" />
                      Add new volumes
                    </button>
                  </td>
                </tr>}
              </tbody>
            </table>
          </div>
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

export default Journal;