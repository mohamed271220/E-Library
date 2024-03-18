import Modal from "../Modal";
import { BsBagPlus, BsFillXCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    volumeNumber: Yup.number()
        .required('Required'),
    publicationYear: Yup.date()
        .required('Required'),
    pdfLink: Yup.string().required('Required'),
});



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


const AddVolumeModal = ({ type, onClose, isOpen, editionData, refetch }) => {
    const itemId = useParams().id;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [addedPdfs, setAddedPdfs] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const setFieldValueRef = useRef();
    const token = useSelector((state) => state.auth.token);

    const formSubmit = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        setIsLoading(true);
        try {
            const data = {
                volumeNumber: values.volumeNumber,
                publicationYear: values.publicationYear,
                pdfLink: values.pdfLink
            };
            const response = editionData ?
                await axios.put(`/api/admin/${type}/${itemId}/volumes/${editionData._id}`, data, {
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json'
                    },
                })
                : await axios.post(`/api/admin/${type}/${itemId}/volumes`, data, {
                    headers: {
                        Authorization: "Bearer " + token,
                        'Content-Type': 'application/json'
                    },
                });
            if (response) {
                toast.update(id, {
                    render: "Volume added successfully",
                    type: "success",
                    ...config,
                    isLoading: false,
                });
            }
            onClose();
            refetch();
            onSubmitProps.resetForm();
        } catch (error) {
            toast.update(id, {
                render: `Error: ${error.message}`,
                type: "error",
                ...config,
                isLoading: false,
            });
        } finally {
            setIsLoading(false);
        }
    };

    function uploadPdf(ev) {
        const id = toast.loading("Please wait...");
        setIsLoading(true);
        const file = ev.target.files;
        const data = new FormData();
        data.append("pdfs", file[0]);
        axios
            .post("/upload/pdfs", data, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { data: filename } = response;
                setFieldValueRef.current('pdfLink', filename[0]);
                setAddedPdfs(filename[0])
                if (response) {
                    toast.update(id, {
                        render: "Pdf added successfully",
                        type: "success",
                        ...config,
                        isLoading: false,
                    });
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                toast.update(id, {
                    render: "Failed to add pdf.",
                    type: "error",
                    isLoading: false,
                    ...config,
                });
            });
    }
    function removePdf() {
        setIsLoading(true);
        setAddedPdfs('');
        setIsLoading(false);
    }

    const initialValues = editionData
        ? {
            volumeNumber: editionData.volumeNumber,
            publicationYear: editionData.publicationYear,
            pdfLink: editionData.pdfLink
        }
        : {
            volumeNumber: '', publicationYear: '', changes: '', pdfLink: ''
        };

    useEffect(() => {
        if (editionData) {
            setAddedPdfs([editionData.pdfLink]);
        }
    }, [editionData]);


    return (
        <>
            <Modal isForm={true} isOpen={isOpen} onClose={onClose}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={formSubmit}
                >
                    {({ values, errors, touched, handleSubmit, isSubmitting
                        , handleBlur, setFieldValue,
                        handleChange }) => {
                        const isFormFilled = values.volumeNumber && values.publicationYear && values.pdfLink
                        setFieldValueRef.current = setFieldValue;
                        return <Form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-[2vh] p-[4vh]"
                        >
                            <h1 className="text-[4.5vh]">Add a new Volume:</h1>
                            <div className="form-control">
                                <div className="form-control-input">
                                    <label htmlFor="volumeNumber">Volume number</label>
                                    <Field type="number" min={1} name="volumeNumber" placeholder="Put the edition number." />
                                    <ErrorMessage name="volumeNumber" component="div"
                                        className="invalid-feedback" />
                                </div>
                                <div className="form-control-input">
                                    <label htmlFor="publicationYear">Publication date </label>
                                    <Field type="date" name="publicationYear" placeholder="Put the publication date." />
                                    <ErrorMessage name="publicationYear" component="div"
                                        className="invalid-feedback" />
                                </div>
                                <div className="form-control__collection">
                                    <label htmlFor="pdf" className="label-upload">Upload research&rsquo;s main PDF</label>
                                    {addedPdfs &&
                                        <>
                                            <div className="form-control__uploader">
                                                <iframe src={addedPdfs} style={{ width: '100%' }}></iframe>
                                                <button
                                                    onClick={() => removePdf()}
                                                    className="btn-1 "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    }
                                    <label className="form-control__label">
                                        <input
                                            type="file"
                                            name="pdf"
                                            id="pdf"
                                            className="hidden"
                                            accept="application/pdf"
                                            onChange={uploadPdf}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                            />
                                        </svg>
                                        Upload
                                    </label>
                                </div>

                                <button disabled={!isFormFilled || isSubmitting || Object.keys(errors).length !== 0 || isLoading} className="btn-3 mt-4" type="submit">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    }}
                </Formik>
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

export default AddVolumeModal;
