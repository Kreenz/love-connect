import React from "react"
import styled from "styled-components";

import ImageSlider from "../../Shared/ImageSlider";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:20vw;
    height:20vh;
    margin-bottom:8vh;
    align-items:center;
    justify-content:center;
`

const MatchButtonsWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:baseline;
    width:15vw;
    height:10vh;
    padding:1vh;
    margin-bottom:2vh;
`

const InfoButton = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:#eee;
    width:5vw;
    height:5vw;
    border-radius:50%;
    color: white;
    font-size:4vh;
    font-weight:bold;
    margin-left:1vw;
    margin-right:1vw;
    border:0.2vh solid white;
    cursor:pointer;
`

const LikeButton = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:lightgreen;
    width:4vw;
    height:4vw;
    border-radius:50%;
    color: white;
    font-size:4vh;
    font-weight:bold;
    border:0.2vh solid white;
    cursor:pointer;
`

const DislikeButton = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:#FF8484;
    width:4vw;
    height:4vw;
    border-radius:50%;
    color: white;
    font-size:4vh;
    font-weight:bold;
    border:0.2vh solid white;
    cursor:pointer;
`

const MatchMenu = (props) => {

    const matchUser = (userId, userMatchId, setNextUserMatch) => {
        nextUser(setNextUserMatch);
    }

    const nextUser = (setNextUserMatch) => {
    
    }

    const getUserInfo = (screen, setScreen, setOldScreen) => {
        props.setUserMatch(props.userMatch)
        setOldScreen(screen);
        setScreen("profile");
    }

    return (
        <Wrapper>
            <MatchButtonsWrapper>
                <LikeButton onClick={() => { matchUser(props.user.userId, props.nextUserMatch.userId, props.setNextUserMatch) }}></LikeButton>
                <InfoButton onClick={() => { getUserInfo(props.screen, props.setScreen, props.setOldScreen)}}></InfoButton>
                <DislikeButton onClick={() => { nextUser(props.setNextUserMatch)}}></DislikeButton>    
            </MatchButtonsWrapper>
            <ImageSlider 
                userPhotos={props.userMatch.photos}
                imgIndex={props.imgIndex}
                setImgIndex={props.setImgIndex}
                />
        </Wrapper>
    );
};

export default MatchMenu;   