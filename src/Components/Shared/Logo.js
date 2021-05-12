import React from "react"
import styled from "styled-components";
import PhotoLogo from "../../Assets/Images/logo.jpg";

/* const LogoWrapper = styled.div`
    width:100%;
    height:10vh;
`; */

const ImgLogo = styled.img`
  border-radius:5px;
  width:10vw;
  height:10vh;
  text-align: center;
  align-items: center;
  margin-bottom: 2vh;
`;

const Logo = () => {

  return (
    <ImgLogo src={PhotoLogo}/>
  );
};

export default Logo;