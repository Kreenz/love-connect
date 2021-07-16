import React, { useEffect, useState} from "react"
import styled from "styled-components";

import MatchMenu from "./MatchMenu";
import Report from "../../Shared/Report/Report";

import LoadingZone from "../../../Assets/Images/preloader.gif";

const Wrapper = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-items:center;
        height: 100vh;
        width: 80vw;
        background-color: #9eabe4;
        background-image: linear-gradient(315deg,#9eabe4 0%,#77eed8 74%);
        ${props?.styles}
`}`;

const LoadinWrapper = styled.div`
  ${props=>` 
    display:${props.loaded ? "none" : "flex"};
    background-color:white;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 75vw;
    position:absolute;
    left: 25vw;
    top:0;
    background-color: #9eabe4;
    background-image: linear-gradient(315deg,#9eabe4 0%,#77eed8 74%);
    ${props?.styles}
`}`;

const LoadingImg = styled.img`
`;

const Wrapper2 = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        align-items: center;
        align-items:center;
        height: 20vh;
        width: 100%;
        ${props?.styles}
`}`;

const PopUp = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        align-items: center;
        align-items:center;
        height: 20vh;
        width: 50%;
        ${props?.styles}
`}`;

const InfoWrapper = styled.div`
    ${props =>`
    width:100%;
    display:flex;
    flex-direction:column;
`}`;

const InfoData = styled.span`
    color:#9eabe4;
    font-weight:600;
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
`;

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
        background-size: cover;
        box-shadow:0 0 0.3vh black;
        ${props?.styles}
`}`;

const Match = (props) => {
    const[ImgIndex, setImgIndex] = useState(0);
    const[loaded, setLoaded] = useState(false);
    const[isUser,setIsUser] = useState(true);

    useEffect(
      () => {
        if(props.nextUserMatchList.length > 0 && !loaded) setLoaded(true);
        if(props.nextUserMatchList.length == 0 && loaded) setLoaded(false);

        let timer1 = setTimeout(() => {
          //console.log(!props.nextUserMatchList[0]?.[1] + "<-- match control");
          if(!props.nextUserMatchList[0]?.[1] && props.nextUserMatchList.length === 0) {
            props.setOldScreen(props.screen); props.setScreen("empty");
          } 
        }, 1000);
  
        return () => {
          clearTimeout(timer1);
        };
      }
    );

    return (
        <Wrapper>
            <LoadinWrapper loaded={loaded}>
              <LoadingImg src={LoadingZone} alt={"Loading matches..."} />
            </LoadinWrapper>
            <MatchContainer>
                <MatchProfileImg userImage={props.nextUserMatchList[0]?.[1]?.photos?.[ImgIndex]}>
                  <Wrapper2>
                    {/* {console.log(props.nextUserMatchList[0]?.[1])}
                    {console.log(props.userMatch)} */}
                    <Report 
                      styles={"margin-right:5%; margin-bottom:1%;margin-top:2%;"}
                      stylos="top:13%; justify-content:center; align-items:center; width:100%;"
                      isUser={isUser} 
                      setIsUser={setIsUser} 
                      usermatch={props.nextUserMatchList[0]?.[1]} 
                      user={props.user} db={props.db} 
                      oldScreen={props.oldScreen}
                      setScreen={props.setScreen}/>
                    <InfoWrapper>
                        <InfoData>{props.nextUserMatchList[0]?.[1]?.username}</InfoData>
                        <InfoData>{props.nextUserMatchList[0]?.[1]?.age} años</InfoData>
                        <InfoData>{props.nextUserMatchList[0]?.[1]?.distance} km</InfoData>
                    </InfoWrapper>
                  </Wrapper2>
                    <MatchMenu 
                        userMatch={props.nextUserMatchList?.[0]?.[1]} 
                        user={props.user}
                        imgIndex={ImgIndex}
                        setImgIndex={setImgIndex}
                        nextUserMatchList={props.nextUserMatchList} 
                        setNextUserMatchList={props.setNextUserMatchList}
                        setUserMatch={props.setUserMatch}
                        setNextUserMatch={props.setNextUserMatch}
                        screen={props.screen}
                        setScreen={props.setScreen}
                        setOldScreen={props.setOldScreen}
                        db={props.db}
                        />
                </MatchProfileImg>
            </MatchContainer>
        </Wrapper>
    );
};

export default Match;