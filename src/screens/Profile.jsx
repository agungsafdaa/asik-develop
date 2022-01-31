import React from "react";


// import Projects from "../components/Sections/Projects";
import Breadcumbs from "../components/Sections/Breadcumbs";
import MediaBanner from "../components/Sections/MediaBanner";

import { useLocation } from 'react-router-dom'
export default function Profile(props) {
    const location = useLocation();
    console.log(location.pathname);
  return (
    <>
    
     
       
      <Breadcumbs />
      <MediaBanner/>
   
     
    </>
  );
}


