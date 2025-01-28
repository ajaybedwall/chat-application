import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

// import './App.css'

const router = createBrowserRouter([
  { path: "/", 
    element: <HomePage/>
   },
  { path: "/register", 
    element: <Signup/>
   },
  { path: "/login", 
    element: <Login/>
   },
]);


function App() {

  return (
    <div className="flex items-center justify-center h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
