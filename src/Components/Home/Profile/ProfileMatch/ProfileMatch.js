import React, { useState } from "react"
import styled from "styled-components";

import ImageSlider from "../../../Shared/ImageSlider";
import ProfileData from "./ProfileData";

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
    background-color:gray;
`}`

const PhotoWrapper = styled.div`
  ${props=>`
    display:flex;
    align-items:flex-end;
    justify-content:center;
    width:100%;
    height:${props.expand? "70%" : "35%"};
    background:url(${props?.photo}) no-repeat center;
    background-size: ${props.expand? "auto 100%" : "100% auto"};
    background-color:lightblue;
    padding-bottom: 2%;
    transition: All 0.3s ease-in;
`}`

const ButtonImgExpander = styled.div`
  width: 1vw;
  height: 1vw;
  background-color:lightgreen;
  cursor:pointer;
`

const ButtonClose = styled.div`
  width: 1vw;
  height: 1vw;
  background-color:red;
  cursor:pointer;
  margin-left:1%;
`

const ProfileMatch = (props) => {
    const[imgIndex, setImgIndex] = useState(0);
    const[expand, setExpand] = useState(false);
    return (
        <Wrapper expand={expand}>
          <PhotoWrapper expand={expand} photo={props.user.photos[imgIndex]} >
            <ImageSlider userPhotos={props.user.photos} setImgIndex={setImgIndex} imgIndex={imgIndex}/>
            <ButtonImgExpander onClick={() => { setExpand(!expand) }}/> 
            <ButtonClose onClick={() => { props.setScreen("match") }}/> 
          </PhotoWrapper>
          <ProfileData styles={expand ? "height:30%;" : "height:65%;"} user={props.user} />
        </Wrapper>
    );
};

export default ProfileMatch;