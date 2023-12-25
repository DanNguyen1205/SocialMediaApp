import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import IoniaBg from "../images/Ionia_bg2.jpg"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import "../main.css"
import axios, * as others from "axios"

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${IoniaBg})`
};

export const Signup = () => {
  //Rules for validation
  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
    email: yup.string().email("Not email format").required("Your email is required"),
    age: yup.number("Must be a number").positive("Must be a positive number").integer("Must be a whole number").min(18).required("Your age is required"),
    password: yup.string().min(6).max(20).required("A password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords don't match").required(),
  })

  const {register, handleSubmit, formState:{errors} } = useForm({
    //How our schema will look like
    resolver: yupResolver(schema),
  });

  // useForm({
  //   defaultValues: {
  //     fullName: 'defaultvalue',
  //     email: 'defaultvalue@live.dk',
  //     age: 18,
  //     password: 123123,
  //     confirmPassword: 123123
  //   }
  // })

  const navigate = useNavigate();

  async function onSubmit(data) {
    console.log(data);

    axios.post('http://localhost:8081/Ioniagram/Signup', data)
    .then(res => navigate('/Ioniagram/Login'))
    .catch((err) => {
      if(err.response.status === 400){
        setEmailExistsMsg(err.response.data)
      }
    })


  }

  const [emailExistsMsg, setEmailExistsMsg] = useState("");

  return (
    <>
      <div className='flex h-screen justify-center items-center bg-neutral-400'>
        <div className='flex flex-row justify-center items-center w-4/5 h-4/5 shadow-lg border-r-2 rounded-full'>

          <div id='signUpPicture' className='hidden md:flex flex-col justify-center space-y-10 items-center text-white' style={sectionStyle}>
            <img src={IoniaIcon} className='w-1/2 lg:w-1/4' alt="" />
            <section className='flex flex-col justify-center items-center p-4'>
              <h1 className='font-extrabold text-4xl'>Signup for Ioniagram today!</h1>
              <h3 className='font-semibold text-2xl'>Join 3.000.000 fellow Ionians</h3>
            </section>
          </div>

          <div id='signUpForm' className='flex flex-col justify-center items-center space-x-2 space-y-5 w-full md:w-2/5 h-full bg-neutral-200 p-4'>
            <h1 className='font-extrabold text-2xl'>Please create an account</h1>
            {/* Login form */}
            <form className='flex flex-col justify-center w-full space-y-3' onSubmit={handleSubmit(onSubmit)}>
              <input className='p-2' type="text" placeholder='Enter full name' {...register("fullName")}/>
              <p className='errorMsg'>{errors.fullName?.message}</p>
              <input className='p-2' type="number" placeholder='Enter age' {...register("age")}/>
              <p className='errorMsg'>{errors.age?.message}</p>
              <input className='p-2' type="text" placeholder='Enter email' {...register("email")}/>
              <p className='errorMsg'>{errors.email?.message}{emailExistsMsg}</p>
              <input className='p-2' type="password" placeholder='Enter password' {...register("password")}/>
              <p className='errorMsg'>{errors.password?.message}</p>
              <input className='p-2' type="password" placeholder='Enter password again' {...register("confirmPassword")}/>
              <p className='errorMsg'>{errors.confirmPassword?.message}</p>
              <button type='submit' className='bg-blue-200 p-2'>Create account</button>
              <div className='flex space-x-5'>
              <p>Already have an account?</p>
              <Link to="/Ioniagram/Login" className='font-semibold'>Login</Link>
            </div>
            </form>
          </div>

        </div>
      </div>
    </>

  )
}

export default Signup