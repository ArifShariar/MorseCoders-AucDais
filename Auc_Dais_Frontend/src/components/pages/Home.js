import React from "react";
import Carousels from "../RecomendedAuctions";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from 'react-bootstrap/Container';
import "../Card.css"

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
      <Container className="home-element-padding">
          <Carousels />
      </Container> 
  )
}
