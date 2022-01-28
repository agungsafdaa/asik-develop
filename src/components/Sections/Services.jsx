import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";

// Assets



// Import Swiper styles


export default function Services() {
  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
