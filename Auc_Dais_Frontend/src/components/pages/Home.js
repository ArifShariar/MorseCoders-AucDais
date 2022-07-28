import React from "react";
import Carousels from "../RecomendedAuctions";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";

import '../../App.css'

export default function () {

  const { state } = useLocation();
  //alert(state.id);

  return (
    <>
       <Carousels /> 
       <div>
        
       </div>
        <Footer />
    </>
  )
}
