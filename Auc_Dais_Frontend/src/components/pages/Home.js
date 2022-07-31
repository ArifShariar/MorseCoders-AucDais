import React, { useEffect } from "react";
import Carousels from "../RecomendedAuctions";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../App.css'


export default function () {
  const notify = () => {
    toast.success("User Created",
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        },
    );
  }

  const { state } = useLocation();

  return (
    <>
       <Carousels /> 
       <div>
        
       </div>
        <Footer />
    </>
  )
}
