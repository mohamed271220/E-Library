import { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBlock } from '../../../components/ErrorBlock'
import './index.css';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
    name: Yup.string().required('Required'),
    image: Yup.mixed().required('Required'),
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


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addedPhotos, setAddedPhotos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const setFieldValueRef = useRef();

    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('image', values.image);
            const data = await axios.post(`/auth/signup`, formData);
            if (data) {
                toast.update(id, {
                    render: "Logged in successfully",
                    type: "success",
                    ...config,
                    isLoading: false,
                });

            }
            dispatch(
                authActions.login({
                    userId: data.data.userId,
                    token: data.data.token,
                    data: data.data,
                })
            );

            setIsLoading(false);
            navigate('/');
            onSubmitProps.onCancel();
        } catch (err) {
            setIsLoading(false);
            setError(err || 'Something went wrong' || err?.response?.data.message);
            toast.update(id, {
                render: "Failed to login.",
                type: "error",
                isLoading: false,
                ...config,
            });

        }
    };

    function uploadPhoto(ev) {
        setIsLoading(true);
        const file = ev.target.files;
        const data = new FormData();
        data.append("photos", file[0]);
        axios
            .post("/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { data: filename } = response;
                setFieldValueRef.current('image', filename[0]);
                setAddedPhotos(filename[0])
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    function removePhoto() {
        setIsLoading(true);
        setAddedPhotos('');
        setIsLoading(false);
    }

    return (
        <div className="login-container">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: '',
                    image: null,
                }}
                validationSchema={SignupSchema}
                onSubmit={formSubmitHandler}
            >
                {({ values, errors, touched, handleSubmit, isSubmitting
                    , handleBlur, setFieldValue }) => {
                    const isFormEmpty = Object.values(values).some((value) => value === '');
                    setFieldValueRef.current = setFieldValue;
                    return <Form
                        className="flex flex-col gap-[2vh] p-[4vh]"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-control">

                            <h2>SignUp</h2>
                            <div className="form-control-input">
                                <label htmlFor="email">E-mail</label>
                                <Field type="email" name="email" placeholder="example@example.com" />
                                <ErrorMessage name="email" component="div" />
                            </div>

                            <div className="form-control-input">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" placeholder="Make sure that your password is strong" />
                                <ErrorMessage name="password" component="div" />
                            </div>

                            <div className="form-control-input">
                                <label htmlFor="name">Name</label>
                                <Field type="text" name="name" placeholder="Please enter your name" />
                                <ErrorMessage name="name" component="div" />
                            </div>

                            <div className="form-control__collection">
                                <label htmlFor="file" className="label-upload">Upload pfp</label>
                                {addedPhotos &&
                                    <>
                                        <div className="form-control__uploader">
                                            <img src={addedPhotos}
                                                alt="" />
                                            <button
                                                onClick={() => removePhoto()}
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
                                        name="file"
                                        id=""
                                        className="hidden"
                                        onChange={uploadPhoto}
                                        multiple={false}
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
                        </div>
                        <button type="submit" disabled={isSubmitting || Object.keys(errors).length !== 0 || isLoading || isFormEmpty} className="center button login-button">
                            Signup
                        </button>
                        {errors.submit && <div className="error">{errors.submit}</div>}
                    </Form>
                }}
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
            </Formik>
            <Link to={"/auth/login"}>
                <button className="sec-acc-btn">
                    Already have an account? Sign in
                </button>
            </Link>
            {error && <ErrorBlock message={error} />}
        </div>
    );
};

export default Signup;