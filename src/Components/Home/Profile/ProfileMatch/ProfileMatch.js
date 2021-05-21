import React, { useState } from "react"
import styled from "styled-components";

import ImageSlider from "../../../Shared/ImageSlider";
import ProfileData from "./ProfileData";
import Report from "../../../Shared/Report/Report";

import closeIcon from "../../../../Assets/Images/Icons/close_icon.webp";
import expandIcon from "../../../../Assets/Images/Icons/expand_icon.png";
import collapseIcon from "../../../../Assets/Images/Icons/collapse_icon.png";

const Wrapper = styled.div`
  ${props =>`
    background:white;
    color:white;
    width:${props.expand? "45vw": "45vw"};
    height:100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    background-color:#f5f5f5;;
`}`

const PhotoWrapper = styled.div`
  ${props=>`
    display:flex;
    flex-direction: column;
    align-items:end;
    justify-content: space-between;
    width:100%;
    height:${props.expand? "70%" : "35%"};
    background:url(${props?.photo}) no-repeat center;
    background-size: ${props.expand? "auto 100%" : "100% auto"};
    background-color:lightblue;
    padding-bottom: 2%;
    transition: All 0.3s ease-in;
`}`

const PhotoContentWrapper = styled.div`
  display:flex;
  flex-direction: row;
  padding-top:1vh;
  padding-right:1vh;
`

const ButtonImgExpander = styled.div`
  ${props =>`
  width: 1vw;
  height: 1vw;
  background:url(${props.action ? props?.collapseIcon : props?.expandIcon}) no-repeat center;
  background-size: auto 100%;
  background-color:lightgreen;
  cursor:pointer;
  `}

`

const ButtonClose = styled.div`
  ${props =>`
    width: 1vw;
    height: 1vw;

    cursor:pointer;
    margin-left:1%;
    background:url(${props?.background}) no-repeat center;
    background-size: auto 140%;
    background-color:red;
  `}
`

const ProfileMatch = (props) => {
    const[imgIndex, setImgIndex] = useState(0);
    const[expand, setExpand] = useState(false);

    const goBack = (screen, oldScreen, setScreen, setOldScreen) => {
      setOldScreen(screen);
      setScreen(oldScreen);
    }

    return (
        <Wrapper expand={expand}>
          <PhotoWrapper expand={expand} photo={props.userMatch.photos[imgIndex]} >
            <PhotoContentWrapper>
              <Report setScreen={props.setScreen} oldScreen={props.oldScreen} usermatch={props.userMatch} user={props.user} db={props.db}/>
            </PhotoContentWrapper>
            <PhotoContentWrapper>
              <ImageSlider userPhotos={props.userMatch.photos} setImgIndex={setImgIndex} imgIndex={imgIndex}/>
              <ButtonImgExpander collapseIcon={collapseIcon} expandIcon={expandIcon} action={expand} onClick={() => { setExpand(!expand) }}/> 
              <ButtonClose background={closeIcon} onClick={() => { goBack(props.screen, props.oldScreen, props.setScreen, props.setOldScreen) }}/> 
            </PhotoContentWrapper>
          </PhotoWrapper>
          <ProfileData styles={expand ? "height:30%;" : "height:65%;"} user={props.user} userMatch={props.userMatch} />
        </Wrapper>
    );
};

export default ProfileMatch;