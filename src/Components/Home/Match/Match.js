import React, { useState, useEffect } from "react"
import styled from "styled-components";

import MatchMenu from "./MatchMenu";

import Photo1 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/1.jpeg";
import Photo2 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/2.jpeg";
import Photo3 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/3.jpg";
import Photo4 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/4.jpg";

const Wrapper = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-items:center;
        height: 100vh;
        width: 80vw;
        ${props?.styles}
`}`

const InfoWrapper = styled.div`
    ${props =>`
    width:100%;
    display:flex;
    flex-direction:column;
`}`

const InfoData = styled.span`
    color:white;
    font-size:4vh;
    -webkit-text-stroke-width: 0.1vh;
    -webkit-text-stroke-color: black;
    margin-left: 1%;
`;

const MatchContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height: 100vh;
    width: 45vw;
`

const MatchProfileImg = styled.div`
    ${props=>`
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 45vw;
        height: 85vh;
        border-radius:2vh;
        background: url(${props.userImage}) no-repeat center;
        background-color: lightblue;
        background-size: 100% auto;
        ${props?.styles}
`}`

const Match = (props) => {
    const[ImgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        //buscas el primer usuario que puedas encontrar para el userMatch, userId
        if(props.userMatch.userId == null){
          props.setUserMatch({
            userId: "hE238nlUZVoHsvRDrpQL",
            username: "Marc Ortiz",
            age:21,
            distance:11,
            recent:null,
            tastes:[],
            photos:[Photo1, Photo2, Photo3, Photo4]
          })
        }
    });

    return (
        <Wrapper>
            <MatchContainer>
                <MatchProfileImg userImage={props.userMatch?.photos[ImgIndex]}>
                    <InfoWrapper>
                        <InfoData>{props.userMatch.username}</InfoData>
                        <InfoData>{props.userMatch.age} años</InfoData>
                        <InfoData>{props.userMatch.distance} km</InfoData>
                    </InfoWrapper>
                    <MatchMenu 
                        userMatch={props.userMatch} 
                        user={props.user}
                        imgIndex={ImgIndex}
                        setImgIndex={setImgIndex} 
                        setUserMatch={props.setUserMatch}
                        setScreen={props.setScreen}
                        />
                </MatchProfileImg>
            </MatchContainer>
        </Wrapper>
    );
};

export default Match;