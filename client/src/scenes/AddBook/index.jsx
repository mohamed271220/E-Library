import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../constants/Http";

const bookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string(),
  category: Yup.string(),
});

const initialValues = {
  title: "",
  author: "",
  image: "",
  description: "",
  category: ""
};


const BookForm = () => {
  const [addedPhotos, setAddedPhotos] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const setFieldValueRef = useRef();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories({ signal }),
  });

  const token = useSelector((state) => state.auth.token);
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
  function uploadPhoto(ev) {
    setIsLoading(true);
    const file = ev.target.files;
    const data = new FormData();
    data.append("photos", file[0]);
    axios
      .post("/upload/photos", data, {
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
        setImgErr(true);
        setIsLoading(false);
      });
    setIsLoading(false);
  }
  function removePhoto() {
    setIsLoading(true);

    setAddedPhotos('');
    setIsLoading(false);
  }

  const formSubmitHandler = async (values, onSubmitProps) => {
    const id = toast.loading("Please wait...");
    setIsLoading(true);
    try {
      const postData = {
        title: values.title,
        author: values.author,
        image: values.image,
        description: values.description,
        category: values.category === "" ? null : values.category,
      };
      const response = await axios.post("/api/admin/books", postData, {
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
      });
      if (response) {
        toast.update(id, {
          render: "Book added successfully",
          type: "success",
          ...config,
          isLoading: false,
        });
      }
      navigate("/");
      onSubmitProps.resetForm();
    } catch (error) {
      setIsLoading(false);
      toast.update(id, {
        render: "Failed to add book.",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={bookSchema}
        onSubmit={formSubmitHandler}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting
          , handleBlur, setFieldValue,
          handleChange }) => {
          const isFormFilled = Object.entries(values).every(([key, value]) => {
            if (key === 'category') {
              return true;
            }
            return value !== '';
          });
          setFieldValueRef.current = setFieldValue;
          return <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[2vh] p-[4vh]"
          >
            <h1 className="text-[4.5vh]">Add a new book:</h1>
            <div className="form-control">
              <div className="form-control-input">
                <label htmlFor="title">Title</label>
                <Field type="text" name="title" placeholder="Write the book's title." />
                <ErrorMessage name="title" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="author">Author</label>
                <Field type="text" name="author" placeholder="Write the name of the writer." />
                <ErrorMessage name="author" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="description">Description</label>
                <Field as="textarea" type="text" name="description" placeholder="Put a relevant description." />
                <ErrorMessage name="description" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="category">Category</label>
                <Field as="select" name="category">
                  {data?.categories?.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                  <option value="">Others</option>
                </Field>
              </div>
              <div className="form-control__collection">
                <label htmlFor="file" className="label-upload">Upload book&rsquo;s main image</label>
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
                    readId=""
                    className="hidden"
                    onChange={uploadPhoto}
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
            <button disabled={!isFormFilled || isSubmitting || Object.keys(errors).length !== 0 || isLoading} className="btn-3" type="submit">
              Submit
            </button>
          </Form>
        }}
      </Formik>
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
export default BookForm;