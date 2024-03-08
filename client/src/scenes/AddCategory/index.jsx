import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorBlock from '../../components/ErrorBlock';
import { useSelector } from 'react-redux';

const AddCategorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
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

const AddCategory = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        try {
            const response = await axios.post(`/api/admin/categories`, {
                name: values.name,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                },
            });
            if (response) {
                toast.update(id, {
                    render: "Successfully added a new category",
                    type: "success",
                    ...config,
                    isLoading: false,
                });

            }
            setIsLoading(false);
            navigate('/');
            onSubmitProps.onCancel();
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            setError(err?.response?.data.message);
            toast.update(id, {
                render: "Failed to add a category.",
                type: "error",
                isLoading: false,
                ...config,
            });
        }

    }

    return (
        <div>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={AddCategorySchema}
                onSubmit={formSubmitHandler}
            >
                {({ values, errors, touched, handleSubmit, isSubmitting
                    , handleBlur, setFieldValue }) => {
                    const isFormEmpty = Object.values(values).some((value) => value === '');
                    return <Form
                        className="flex flex-col gap-[2vh] p-[4vh]"
                        onSubmit={handleSubmit}
                    >
                        {errors.submit && <p className="error">{errors.submit}</p>}
                        <div className='form-control'>
                            <h2 className='text-[4vh]'>Add a category:</h2>
                            <div className="form-control-input">
                                <label htmlFor="name">Category name:</label>
                                <Field name="name">
                                    {({ field, form }) => (
                                        <input
                                            {...field}
                                            type="name"
                                            placeholder="Enter category name(eg. Computer science)"
                                            className={form.errors.name && form.touched.name ? 'error' : ''}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage className='error-message' name="name" component="div" />
                            </div>
                        </div>
                        <button disabled={isSubmitting || Object.keys(errors).length !== 0 || isLoading || isFormEmpty} className="btn-3" type="submit">
                            Submit
                        </button>
                    </Form>
                }}
            </Formik>
            {error && <ErrorBlock message={error} />}
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

export default AddCategory;