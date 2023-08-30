import React from 'react';
import { ToastContainer } from "react-toastify";
import Sidebar from './Sidebar';

import Products from './Products';

function Home() {
    return (
        
        <div className="d-flex">
        <ToastContainer />
        <Sidebar />
        <div className="flex-grow-1 p-3">
        <Products />
        </div>
        </div>
    
    );
}

export default Home;