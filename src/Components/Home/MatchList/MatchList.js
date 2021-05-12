import React, { useState } from "react"
import styled from "styled-components";

import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import MatchSearcher from "./MatchSearcher";
import MatchPerson from "./MatchPerson";

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
    display: flex;
    flex-direction: column;
    font-size: 2.5vh;
    background: tomato;
    height: 100vh;
    width: 25vw;
    text-align: center;
    align-items: center;
    ${props?.styles}
`}`

const WrapperMatches = styled.div`
    display:inline-flex;
    width: 100%;
    heigth: 100%;
    flex-wrap: wrap;
`;

const MatchList = (props) => {
    const[searchText, setSearchText] = useState("");
    const[userMatchList, setUserMatchList] = useState(
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
    );
        

    const loadMatches = (userMatchList, userMatch, setUserMatch, screen, setScreen) => {
        let components = [];
        for(let i = 0; i < userMatchList.length; i++){
            if(userMatchList[i].username.toLowerCase().includes(searchText.toLowerCase())){
                components.push(
                    <MatchPerson 
                        user={userMatchList[i]} 
                        userMatch={userMatch}
                        setUserMatch={setUserMatch}
                        userMatchList={userMatchList}
                        userIndex = {i}
                        setScreen={setScreen}
                        screen={screen}
                    />             
                )
            }
        }

        return components; 
    }

    return (
        <Wrapper>
            <MiniProfile user={props.user} setScreen={props.setScreen} setUserMatch={props.setUserMatch}/>
            <MatchSearcher setSearchText={setSearchText} setUserMatchList={setUserMatchList}/>
            <WrapperMatches>
                {loadMatches(userMatchList, props.userMatch, props.setUserMatch, props.screen, props.setScreen)}
            </WrapperMatches>
        </Wrapper>
    );
};


export default MatchList;