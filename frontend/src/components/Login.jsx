import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();




  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user input
    if (!user.userName || !user.password) {
      toast.error("Please fill out both fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login", 
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login Response:", res);

      if (res.data._id) {
        toast.success("Login Successful!");
        navigate("/"); 
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
     
      console.error("Login Error: ", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }

    setUser({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 min-h-screen flex items-center justify-center">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter User Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to={"/register"}>
              <span className="text-blue-200">Signup</span>
            </Link>
          </p>
          <button
            className="btn btn-block btn-sm mt-2 border border-s-lime-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
