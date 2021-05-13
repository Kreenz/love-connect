import React, { useEffect, useState} from "react"
import styled from "styled-components";

import MatchMenu from "./MatchMenu";


import Photo1 from "../../../Assets/Images/Profile/ProfilezJTtb6ZwPJDmhPwBIFho/1.jpg";
import Photo2 from "../../../Assets/Images/Profile/ProfilezJTtb6ZwPJDmhPwBIFho/2.jpg";

import PhotoMarc1 from "../../../Assets/Images/Profile/ProfilehE238nlUZVoHsvRDrpQL/1.png";
import PhotoMarc2 from "../../../Assets/Images/Profile/ProfilehE238nlUZVoHsvRDrpQL/2.jpg";
import PhotoMarc3 from "../../../Assets/Images/Profile/ProfilehE238nlUZVoHsvRDrpQL/3.jpg";
import PhotoMarc4 from "../../../Assets/Images/Profile/ProfilehE238nlUZVoHsvRDrpQL/4.jpg";

import PhotoPablo1 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/1.jpeg";
import PhotoPablo2 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/2.jpeg";
import PhotoPablo3 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/3.jpg";
import PhotoPablo4 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/4.jpg";
import PhotoPablo5 from "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/5.jpg";


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
    const[nextUserMatchList, setNextUserMatchList] = useState([])

    useEffect(() => {
        if(nextUserMatchList.length === 0){
          //rellenas la lista con los posibles matches
          setNextUserMatchList(
            [
              {
                userId:"hE238nlUZVoHsvRDrpQL",
                username:"Marc Ortiz",
                active:"",
                photos: [PhotoMarc1,PhotoMarc2,PhotoMarc3,PhotoMarc4]
              },
              {
                userId:"QR2LzSe7dfLcyAEnuWu4",
                username:"Pablo Ceballos",
                active:"",
                photos: [PhotoPablo1,PhotoPablo2,PhotoPablo3,PhotoPablo4,PhotoPablo5]
              }
            ]
          )
          
          if(props.oldScreen === "match" && nextUserMatchList.length === 0) props.setScreen("nousers");
          else if(props.userMatch.userId === null){
            //buscas al usuario en la pos 0;
            //userMatchList[0]
            props.setNextUserMatch({
              userId: "zJTtb6ZwPJDmhPwBIFho",
              username: "Picaso",
              age:21,
              distance:11,
              recent:null,
              tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
              photos:[Photo1, Photo2]
            })
          }

        }
      })
    
      //recarga la lista de 
      useEffect(() => {
        if(nextUserMatchList.length === 0){
          //reload
    
          if(props.oldScreen === "match" && nextUserMatchList.length === 0) props.setScreen("nousers");
        }
      }, [nextUserMatchList.length])    
      
      

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
                        setNextUserMatch={props.setNextUserMatch}
                        screen={props.screen}
                        setScreen={props.setScreen}
                        setOldScreen={props.setOldScreen}
                        />
                </MatchProfileImg>
            </MatchContainer>
        </Wrapper>
    );
};

export default Match;