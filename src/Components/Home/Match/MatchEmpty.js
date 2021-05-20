import React from "react"
import styled from "styled-components";

import userLocation from "../../../Assets/Images/Icons/user_location.png";

const Wrapper = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        width: 80vw;
        color: black;
        background-color: #9eabe4;
        background-image: linear-gradient(315deg,#9eabe4 0%,#77eed8 74%);
        ${props?.styles}
`}`

const ColWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:50%;
    width:35%;
`;

const InfoText = styled.span`
    font-weight:600;
    font-size:3vh;
`;

const InfoImage = styled.img`
    margin-top:10vh;
    width:auto;
    height:30%;
`

const MatchEmpty = (props) => {

    return (
        <Wrapper>
            <ColWrapper>
                <InfoText>No hay mas matches por la zona, o bien has deshabilitado la ubicación</InfoText>
                <InfoImage src={userLocation} alt={"Localizacion"}></InfoImage>
            </ColWrapper>
        </Wrapper>
    );
};

export default MatchEmpty;