import React from 'react';

import Login from './Login';
import Home from './Home';
import { Ripple } from "@progress/kendo-react-ripple";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

const App = () => {
  return (
    <div>
    <Ripple>
      <RouterProvider router={router} />
      <ToastContainer />
    </Ripple>
  </div>
  );
};

export default App;
