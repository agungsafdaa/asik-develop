import React  from "react";
// Sections

import Header from "../components/Sections/Header";
import SliderArea from "../components/Sections/Slider";
import WidgetArea from "../components/Sections/WidgetArea";

// import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
// import Pricing from "../components/Sections/Pricing";
// import Contact from "../components/Sections/Contact";

import  '../style/css/main.css';

export default function Landing(props) {
 
  return (
    <>
      {/* <TopNavbar /> */}
      <Header />
       <SliderArea />
      <WidgetArea />
      <Blog />
   
     
    </>
  );
}


