import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Item from "../Item"
import { saveItemToLibrary } from '../../constants/Http';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ErrorBlock from '../ErrorBlock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
        <div
            onClick={() => onClick()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-black bg-opacity-30 text-white flex items-center justify-center h-12 w-12 hover:bg-opacity-85 transition-all"
            {...rest}
        >
            <IoIosArrowForward color='white' size={30} />
        </div>
    );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
        <div
            onClick={() => onClick()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-black bg-opacity-30 text-white flex items-center justify-center h-12 w-12 hover:bg-opacity-85 transition-all"
            {...rest}
        >
            <IoIosArrowBack color='white' size={30} />
        </div>
    );
};



const Index = ({ items, type, error, isError }) => {
    const user = useSelector((state) => state.auth.data);
    const token = useSelector((state) => state.auth.token);
    if (isError) {
        return <div className='flex h-[100vh] justify-center items-center'>
         <ErrorBlock title='Something went wrong' message={error || ""} />;
        </div>
    }

    const handleRemoveItem = async ({ type, id }) => {
        const toastId = toast.loading("Please wait...");
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/remove-from-saved-${type}/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                }
            })
            toast.update(toastId, {
                render: "Item removed successfully",
                type: "success",
                ...config,
                isLoading: false,
            });
            window.location.reload();
        } catch (error) {
            toast.update(toastId, {
                render: "Item already removed.",
                type: "error",
                isLoading: false,
                ...config,
            });
        }
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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
        },
        extraLargeDesktop: {
            breakpoint: { max: 3000, min: 2560 },
            items: 5.5,
        },
        largeDesktop: {
            breakpoint: { max: 2559, min: 2300 },
            items: 5,
        },
        extraMediumDesktop: {
            breakpoint: { max: 2299, min: 2048 },
            items: 4.5,
        },
        mediumDesktop: {
            breakpoint: { max: 2047, min: 1800 },
            items: 4.5,
        },
        smallMediumDesktop: {
            breakpoint: { max: 1799, min: 1440 },
            items: 4.25,
        },
        desktop: {
            breakpoint: { max: 1439, min: 1024 },
            items: 3.5,
        },
        smallDesktop: {
            breakpoint: { max: 1023, min: 900 },
            items: 3,
        },
        largeTablet: {
            breakpoint: { max: 899, min: 800 },
            items: 1.3,
        },
        tablet: {
            breakpoint: { max: 799, min: 700 },
            items: 1.2,
        },
        smallTablet: {
            breakpoint: { max: 699, min: 600 },
            items: 1.09,
        },
        mobileExtraLarge: {
            breakpoint: { max: 599, min: 500 },
            items: 1.05,
        },
        mobileLarge: {
            breakpoint: { max: 499, min: 400 },
            items: 1,
        },
        mobileMedium: {
            breakpoint: { max: 399, min: 300 },
            items: 1,
        },
        mobileSmall: {
            breakpoint: { max: 299, min: 200 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 199, min: 0 },
            items: 1,
        },
    };



    return (
        <>
            <div>
                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    className='z-10'
                    customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}

                >
                    {items.map((book, i) => (
                        <div key={i} className='w-[28vh]'>
                            <Item isSaved={true}
                                user={user} type={type} item={book}
                                handleSaveItem={handleSaveItem}
                                handleRemoveItem={() => { handleRemoveItem({ type: type, id: book._id }) }}
                            />
                        </div>
                    ))}
                </Carousel>
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
        </>
    );
};

export default Index;
