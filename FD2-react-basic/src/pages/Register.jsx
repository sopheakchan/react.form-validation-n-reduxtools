import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
const fieldStyle = "rounded-md border border-gray-200";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Password must match"),
  lastName: Yup.string()
    .min(3, "Last name is too short")
    .required("Last name is required"),
  firstName: Yup.string()
    .min(3, "First name is too short")
    .required("First name is required"),
});

const Register = () => {
  const [viewPassword, setViewPassword] = useState(false);
 const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }
  function handleViewConfirmPassword() {
    setViewConfirmPassword(!viewConfirmPassword);
  }

  async function handleRegister(values){
    const {email, password, confirmPassword, lastName, firstName} = values; 
    try {
      const response = await fetch('https://store.istad.co/api/user/register/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password1: password,
          password2: confirmPassword,
          first_name: firstName,
          last_name: lastName
        })
      })
      const data = await response.json();
      if(data) {
        console.log("User registered successfully")
        toast.success("User registered successfully")
      } else {
        toast.error("Fail to register user")
        console.log("Fail to register user")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full p-10 h-screen  justify-center items-center flex-col  bg-blue-700">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          lastName: "",
          firstName: "",
        }}
        onSubmit={(value, { setSubmitting, resetForm }) => {
          console.log(value);
          handleRegister(value)
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex bg-white gap-4 rounded-lg w-1/2 p-10  flex-col ">
              <div className="flex w-full flex-col">
                <label htmlFor="email">Email:</label>
                <Field
                  className={fieldStyle}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm italic"
                />
              </div>
              <div className="flex w-full relative flex-col">
                <label htmlFor="password">Password:</label>
                <Field
                  className={fieldStyle}
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm italic"
                />


<div onClick={handleViewPassword} className="absolute top-[40px] right-[10px]">
                  {viewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex relative w-full flex-col">
                <label htmlFor="password">Confirm Password:</label>
                <Field
                  className={fieldStyle}
                  name="confirmPassword"
                  type={viewConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm italic"
                />
                 <div onClick={handleViewConfirmPassword} className="absolute top-[40px] right-[10px]">
                  {viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="firstName">First name:</label>
                <Field
                  className={fieldStyle}
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 text-sm italic"
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="lastName">Last name:</label>
                <Field
                  className={fieldStyle}
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-sm italic"
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
