// LoginPage.js
import React, { useState } from "react";
import axios from "axios";
// import jwt from 'jsonwebtoken'
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        // console.log(res.data);
        // const tokenData = jwt.decode(res.data.token)
        // console.log(tokenData);
        console.log(res.data.data.user);
        localStorage.setItem('userID',res.data?.data?.user?._id)
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 border border-black">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={login}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          {/* <h1 className="text-center mt-4">
            Don't have an account ?{" "}
            <span className="text-blue-500 font-bold">Sign up</span>
          </h1> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
