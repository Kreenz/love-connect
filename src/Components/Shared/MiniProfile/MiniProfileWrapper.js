import React from "react"
import styled from "styled-components";

const ImgLogo = styled.div`
  ${props=>`
    background: url("${props.imgFondo}") no-repeat center;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    ${props?.styles}
`}`


const MiniProfileWrapper = (props) =>{
    return(
        <ImgLogo imgFondo={props.user.photos[0]}>
        </ImgLogo>
    );
}

export default MiniProfileWrapper