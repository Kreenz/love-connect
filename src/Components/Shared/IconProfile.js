import React from "react"
import styled from "styled-components";

import PhotoLogo from "../../Assets/Images/logo.jpg";

const LogoWrapper = styled.div`
`

const ImgLogo = styled.img`
  border-radius:5px;
`;

const Logo = () => {

  return (
    <LogoWrapper>
        <ImgLogo src={PhotoLogo}/>
    </LogoWrapper>
  );
};

export default Logo;