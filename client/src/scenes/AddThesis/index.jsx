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

const researchSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  university: Yup.string().required("University is required"),
  degree: Yup.string().required("Degree is required"),
  year: Yup.number()
    .required("Year is required")
    .integer("Year must be an integer")
    .min(1900, "Year must be later than 1900")
    .max(new Date().getFullYear(), "Year must be at or before current year"),
  abstract: Yup.string().required("abstract is required"),
  supervisor: Yup.string().required("supervisor is required"),
  citations: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .integer('Must be an integer'),
  pdfLink: Yup.string().required("Thesis file is required"),
  doi: Yup.string(),
  keywords: Yup.array().of(Yup.string()),
  department: Yup.string().required("Department is required"),
  image: Yup.string(),
});

const initialValues = {
  title: "",
  author: "",
  image: "",
  year: 1900,
  abstract: "",
  supervisor: "",
  pdfLink: "",
  citations: 0,
  doi: "",
  keywords: [],
  university: "",
  degree: "",
  department: "",
};


const ResearchForm = () => {
  const [addedPhotos, setAddedPhotos] = useState();
  const [addedPdfs, setAddedPdfs] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setFieldValueRef = useRef();

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
        setIsLoading(false);
      });
    setIsLoading(false);
  }
  function removePhoto() {
    setIsLoading(true);
    setAddedPhotos('');
    setIsLoading(false);
  }
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
            render: "Book added successfully",
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
          render: "Failed to add book.",
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


  const formSubmitHandler = async (values, onSubmitProps) => {
    const id = toast.loading("Please wait...");
    setIsLoading(true);
    try {
      const researchData = {
        title: values.title,
        author: values.author,
        image: values.image,
        year: values.year,
        abstract: values.abstract,
        supervisor: values.supervisor,
        pdfLink: values.pdfLink,
        citations: values.citations,
        doi: values.doi,
        keywords: values.keywords,
        university: values.university,
        degree: values.degree,
        department: values.department,
      };
      const response = await axios.post("/api/admin/theses", researchData, {
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
        validationSchema={researchSchema}
        onSubmit={formSubmitHandler}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting
          , handleBlur, setFieldValue,
          handleChange }) => {
          const isFormFilled = values.title && values.author && values.year && values.image && values.abstract;
          setFieldValueRef.current = setFieldValue;
          return <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[2vh] p-[4vh]"
          >
            <h1 className="text-[4.5vh]">Add a new thesis:</h1>
            <div className="form-control">
              <div className="form-control-input">
                <label htmlFor="title">Title</label>
                <Field type="text" name="title" placeholder="Write the thesis's title." />
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
                <label htmlFor="year">Year of publication</label>
                <Field type="number" name="year" placeholder="Put the year." />
                <ErrorMessage name="year" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="abstract">Abstract</label>
                <Field as="textarea" type="text" name="abstract" placeholder="Put the abstract." />
                <ErrorMessage name="abstract" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="supervisor">Supervisor</label>
                <Field type="text" name="supervisor" placeholder="Put the supervisor." />
                <ErrorMessage name="supervisor" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="citations">Citations</label>
                <Field type="number" min={0} name="citations" placeholder="Put the citations." />
                <ErrorMessage name="citations" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="doi">DOI</label>
                <Field type="text" name="doi" placeholder="Put the DOI." />
                <ErrorMessage name="doi" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="university">University</label>
                <Field type="text" name="university" placeholder="Put the university." />
                <ErrorMessage name="university" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="degree">Degree</label>
                <Field type="text" name="degree" placeholder="Put the degree." />
                <ErrorMessage name="degree" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <label htmlFor="department">Department</label>
                <Field type="text" name="department" placeholder="Put the department." />
                <ErrorMessage name="department" component="div"
                  className="invalid-feedback" />
              </div>
              <div className="form-control-input">
                <FieldArray name="keywords">
                  {(arrayHelpers) => (
                    <div>
                      <h3>Add keywords</h3>
                      {values.keywords.map((keyword, index) => {
                        const keywordErrors = (errors.keywords?.length && errors.keywords[index]) || "";
                        const keywordTouched = (touched.keywords?.length && touched.keywords[index]) || false;
                        return (
                          <div className="inner-div" key={index}>
                            <label htmlFor={`keywords.${index}`}>keyword</label>
                            <Field
                              type="text"
                              name={`keywords.${index}`}
                              placeholder="Enter the keyword of the product (eg: new,hot)"
                              id="keyword"
                              className={
                                "form-control" +
                                (keywordErrors && keywordTouched ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage
                              name={`Keywords.${index}`}
                              component="div"
                              className="invalid-feedback"
                            />
                            <div>
                              <button
                                className="btn-3 bg-white"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.remove(index);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        className="btn-3 bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          arrayHelpers.push("");
                        }}
                      >
                        Add another keyword
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>


              <div className="form-control__collection">
                <label htmlFor="pdf" className="label-upload">Upload thesis&rsquo;s main PDF</label>
                {addedPdfs &&
                  <>
                    <div className="form-control__uploader">
                      <p>{addedPdfs}</p>
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
              <div className="form-control__collection">
                <label htmlFor="file" className="label-upload">Upload thesis&rsquo;s main image</label>
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
              Submit {console.log(errors)}
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
export default ResearchForm;