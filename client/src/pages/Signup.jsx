import React, { useState } from 'react'
// import axios from 'axios'
import { axiosInstance } from '../config/axiosIntances'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const Signup = () => {

  const  navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("data : " , formData)

      const res = await axiosInstance.post('/api/user/signup', formData);
       navigate("/login")
      console.log("response : " , res.data);
      toast.success("Signup successful. ")
      // alert(res.data.msg || 'Check your email!')
    } catch (err) {
      console.log("response : " , err);
        toast.error("Signup failed!");
      // alert(err.response?.data?.msg || 'Signup failed')
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
          <form 
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

      <input
        name="username"
        className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="text"
        placeholder="Username"
        required
        onChange={handleChange}
      />

      <input
        name="email"
        className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
      />

      <input
        name="password"
        className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="password"
        placeholder="Password"
        required
        onChange={handleChange}
      />

      <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
        Create Account
      </button>

      <p className="text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-500 underline">Log In</a>
      </p>

    </form>
    </div>
  )
}

export default Signup
