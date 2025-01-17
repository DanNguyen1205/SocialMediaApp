import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import IoniaBg from "../images/Ionia_bg.jpg"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import "../main.css"
import axios, * as others from "axios"
import { useAuth } from "../components/auth" 
 
var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${IoniaBg})`
};

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Not email format").required("Your email is required"),
    password: yup.string().min(6).max(20).required("A password is required"),
  })

  const {register, handleSubmit, formState:{errors} } = useForm({
    //How our schema will look like
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuth();

  async function onSubmit(data) {

    axios.post("http://localhost:8081/Ioniagram/Login", data,)
    .then((res) =>{ 
      if(res.data != null){
        auth.login(data)

        console.log("Saving user ID: " + res.data[0].idusers);
        localStorage.setItem("userid", JSON.stringify(res.data[0].idusers))
        localStorage.setItem("fullName", JSON.stringify(res.data[0].fullName))

        navigate("/Ioniagram", {replace:true})

      }


    })
    .catch(err => console.log(err))
  }



  return (
    <>
      <div className='flex h-screen justify-center items-center bg-neutral-400'>
        <div className='flex flex-row justify-center items-center w-4/5 h-4/5 shadow-lg border-r-2 rounded-full'>

          <div id='loginsidepicture' className='hidden md:flex flex-col justify-center space-y-10 items-center text-white' style={sectionStyle}>
            <img src={IoniaIcon} className='w-1/2 lg:w-1/4' alt="" />
            <section className='flex flex-col justify-center items-center p-4'>
              <h1 className='font-extrabold text-4xl'>Welcome to Ioniagram</h1>
              <h3 className='font-semibold text-2xl'>The best way to connect with your fellow ionians</h3>
            </section>
          </div>

          <div id='loginform' className='flex flex-col justify-center items-center space-x-2 space-y-5 w-full md:w-2/5 h-full bg-neutral-200 p-4'>
            <h1 className='font-extrabold text-2xl'>Please login to your account</h1>
            {/* Login form */}
            <form className='flex flex-col justify-center w-full space-y-3' onSubmit={handleSubmit(onSubmit)}>
              <input className='p-2' type="email" placeholder='Insert email' {...register("email")}/>
              <input className='p-2' type="password" placeholder='Insert password' {...register("password")}/>
              {/* <input type="submit" onClick={submit} value={"Login"} className='bg-blue-200' /> */}
              <button type='submit' className='bg-blue-200 p-2'>Login</button>
              {/* <div className='flex space-x-1'>
                <label for="checkbox">Remember me</label><br></br>
                <input type="checkbox" id="checkbox" name="checkbox" />
              </div> */}
            </form>
            <button className='font-semibold'>Forgot password?</button>
            <div className='flex space-x-5'>
              <p>Dont have an account?</p>
              <Link to="/Ioniagram/Signup" className='font-semibold'>Register</Link>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default Login