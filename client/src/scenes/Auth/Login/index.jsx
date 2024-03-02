import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions } from '../shared/features/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../shared/Loading/LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';
import '../Signup/index.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBlock } from '../../../components/ErrorBlock'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
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


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        try {
            const response = await axios.post(`/auth/login`, {
                email: values.email,
                password: values.password,
            });
            if (response) {
                toast.update(id, {
                    render: "Logged in successfully",
                    type: "success",
                    ...config,
                    isLoading: false,
                });

            }
            dispatch(
                authActions.login({
                    userId: response.data.userId,
                    token: response.data.token,
                    data: response.data,
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

    }

    return (
        <div className="login-container">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={formSubmitHandler}
            >
                {({ values, errors, touched, handleSubmit, isSubmitting
                    , handleBlur, setFieldValue }) => {
                    const isFormEmpty = Object.values(values).some((value) => value === '');
                    return <Form
                        className="flex flex-col gap-[2vh] p-[4vh]"
                        onSubmit={handleSubmit}
                    >
                        {errors.submit && <p className="errmsg">{errors.submit}</p>}

                        <div className='form-control'>
                            <h2>Login</h2>
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
                        </div>

                        <button type="submit" disabled={isSubmitting || Object.keys(errors).length !== 0 || isLoading || isFormEmpty} className="center button login-button">
                            Login
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
            <Link to={"/auth/signup"}>
                <button className="sec-acc-btn">
                    Don&apos;t have an account? Sign up
                </button>
            </Link>
            {error && <ErrorBlock message={error} />}
        </div>
    );
};

export default Login;