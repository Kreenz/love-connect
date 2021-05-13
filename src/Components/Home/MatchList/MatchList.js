import React, { useEffect, useState } from "react"
import styled from "styled-components";

import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import MatchSearcher from "./MatchSearcher";
import MatchPerson from "./MatchPerson";

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
    const[userMatchList, setUserMatchList] = useState([]);
    let i = -1;

    useEffect(() => {
        if(userMatchList.length === 0){
            const currentUserMatchList = props.userMatchList;
            //busca matches
            const userId = props.user.userId;
            const matchList = props.db.collection("perfiles/" + userId + "/match_list").where("match", "==", true);
            matchList.onSnapshot((snapshot => {
                let newUserMatchList = [];
                let size = 0;
                snapshot.forEach(user => {
                    console.log("hola???")
                    const userMatch = props.db.collection("perfiles").doc(user.data().id_perfil);
                    size++;
                    userMatch.get().then((doc) => {
                        let photos = JSON.parse(doc.data().fotos);
                        console.log(photos)
                        newUserMatchList.push(
                            {
                                userId:doc.id,
                                username:doc.data().nombre,
                                active: doc.data().reciente,
                                photos: photos
                            }
                        )

                        if(snapshot.size === size) {
                            let history = currentUserMatchList ? currentUserMatchList.length: 0;
                            if(newUserMatchList.length != history) setUserMatchList(newUserMatchList);
                        }
                    })
                })
            }))
        }
    })

    const loadUserMatchesList = () => {
        return new Promise (resolve => {

        })
    }

    const loadMatches = (userMatchList, userMatch, setUserMatch, screen, setScreen, setChatMessages) => {
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
                        setChatMessages={setChatMessages}
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
            { 
            userMatchList && userMatchList.map(userMatch =>{
                i++;
                return(
                    <MatchPerson 
                        user={userMatch} 
                        userMatch={props.userMatch}
                        setUserMatch={props.setUserMatch}
                        userMatchList={userMatchList}
                        userIndex = {i}
                        setScreen={props.setScreen}
                        setChatMessages={props.setChatMessages}
                        screen={props.screen}
                    />   
                )
            }) }
                {/*loadMatches(userMatchList, props.userMatch, props.setUserMatch, props.screen, props.setScreen, props.setChatMessages)*/}
            </WrapperMatches>
        </Wrapper>
    );
};


export default MatchList;