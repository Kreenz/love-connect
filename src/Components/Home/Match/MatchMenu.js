import React from "react"
import styled from "styled-components";

import ImageSlider from "../../Shared/ImageSlider";
import LikeIcon from "../../../Assets/Images/Icons/like_icon.png";
import DislikeIcon from "../../../Assets/Images/Icons/dislike_icon.png";
import InfoIcon from "../../../Assets/Images/Icons/info_icon.png";

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
    ${props =>`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:url(${props?.background}) no-repeat center;
        background-size: 100% 100%;
        background-color:#eee;
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
        
`}`

const LikeButton = styled.div`
    ${props =>`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:url(${props?.background}) no-repeat center;
        background-size: 70% 70%;
        background-color:lightgreen;
        width:4vw;
        height:4vw;
        border-radius:50%;
        color: white;
        font-size:4vh;
        font-weight:bold;
        cursor:pointer;
`}`

const DislikeButton = styled.div`
    ${props =>`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:url(${props?.background}) no-repeat center;
        background-size: 60% 60%;
        background-color:#ff3e22;
        width:4vw;
        height:4vw;
        border-radius:50%;
        color: white;
        font-size:4vh;
        font-weight:bold;
        cursor:pointer;
`}`

const MatchMenu = (props) => {
    
    const saveUserResponse = (like) => {
        const userDb = props.user;
        const userMatch = props.userMatch;
        let id_chat = userDb.userId + userMatch.userId;
        let match = like;
        props.db
        .collection("perfiles/" + userMatch.userId + "/match_list")
        .where("id_perfil", "==", userDb.userId)
        .get()
        .then( snap => {
            if(snap.size > 0) {
                id_chat = userMatch.userId + userDb.userId; 

                if(match) {
                    props.db
                    .collection("perfiles/" + userMatch.userId + "/match_list")
                    .where("id_perfil", "==", userDb.userId)
                    .get()
                    .then( snap => {

                        snap.forEach( matchList => {
                            match = matchList.data().like ? (match === matchList.data().like) : false;

                            props.db
                            .collection("perfiles/" + userMatch.userId + "/match_list")
                            .doc(matchList.id)
                            .update({
                                match: match
                            })
                        })
                    })
                }

                props.db
                .collection("perfiles/" + userDb.userId + "/match_list")
                .doc()
                .set(
                {
                    id_chat: id_chat,
                    id_perfil: props.userMatch.userId,
                    like: like,
                    match: match
                })
                
                nextUser();

            } else {
                match = false;
                props.db
                .collection("perfiles/" + userDb.userId + "/match_list")
                .doc()
                .set(
                {
                    id_chat: id_chat,
                    id_perfil: props.userMatch.userId,
                    like: like,
                    match: match
                })

                props.db
                .collection("matches/" + id_chat + "/messages")
                .doc()
                .set(
                    {
                        fecha: new Date().getTime(),
                        id_perfil:"",
                        message:"Este es el inicio de tu conversacion!",
                        type:"text"
                    }
                )

                nextUser();
            }

        })

    }

    const nextUser = () => {
        let usersList = [];

        for(let i = 0; i < props.nextUserMatchList.length; i++) {
            if(i > 0){
                usersList.push([
                    props.nextUserMatchList[i][0].userId,
                    {
                        userId: props.nextUserMatchList[i][1].userId,
                        username: props.nextUserMatchList[i][1].username,
                        email: props.nextUserMatchList[i][1].email,
                        age: props.nextUserMatchList[i][1].age,
                        distance: props.nextUserMatchList[i][1].distance,
                        recent: props.nextUserMatchList[i][1].recent,
                        gender: props.nextUserMatchList[i][1].gender,
                        lookingFor: props.nextUserMatchList[i][1].lookingFor,
                        tastes: props.nextUserMatchList[i][1].tastes,
                        photos: props.nextUserMatchList[i][1].photos,
                        localitzation:{lat: props.nextUserMatchList[i][1].localitzation.lat, long: props.nextUserMatchList[i][1].localitzation.long},
                        upper_age_range: props.nextUserMatchList[i][1].upper_age_range,
                        lower_age_range: props.nextUserMatchList[i][1].lower_age_range,
                        description: props.nextUserMatchList[i][1].description
                    }
                ])
            }
        }

        props.setNextUserMatchList(usersList);
    }

    const getUserInfo = (screen, setScreen, setOldScreen) => {
        props.setUserMatch(props.userMatch)
        setOldScreen(screen);
        setScreen("profile");
    }

    return (
        <Wrapper>
            <MatchButtonsWrapper>
                <LikeButton background={LikeIcon} onClick={() => { saveUserResponse(true) }}></LikeButton>
                <InfoButton background={InfoIcon} onClick={() => { getUserInfo(props.screen, props.setScreen, props.setOldScreen)}}></InfoButton>
                <DislikeButton background={DislikeIcon} onClick={() => { saveUserResponse(false)}}></DislikeButton>    
            </MatchButtonsWrapper>
            <ImageSlider 
                userPhotos={props.userMatch?.photos}
                imgIndex={props.imgIndex}
                setImgIndex={props.setImgIndex}
                />
        </Wrapper>
    );
};

export default MatchMenu;   