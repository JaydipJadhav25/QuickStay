import React from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config/axiosIntances'
import {toast} from "sonner"
import useAuth from '../context/useAuth'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const {  login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

        const res = await axiosInstance.post('/api/user/login', formData);
        console.log("data : " , res.data);
         login(res.data.user.email , res.data.user.role);
        localStorage.setItem("token",res.data.token);

        toast.success("Sigin successful.")
        navigate("/");
        // alert();

    } catch (err) {

      // alert(err.response?.data?.msg || "")
      toast.error("Something went wrong")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
      <div className='w-full flex justify-center items-center h-screen p-2.5'>
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8">
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">
      login
      </h1>

      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>



      <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email id"
          className="border-none outline-none ring-0"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-none outline-none ring-0"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
          Login
      </button>

      <p
        onClick={() => setState(prev => prev === "login" ? "register" : "login")}
        className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
      >
        {/* {state === "login" ? "?" : "Already have an account?"} */}
        Don't have an account
       <Link to={"/signup"}>
           <span className="text-indigo-500 hover:underline ml-1">click here</span>
       </Link>
      </p>
    </form>
      </div>
  )
}

export default Login
