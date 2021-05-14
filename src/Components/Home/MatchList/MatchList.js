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

    useEffect(() => {
        if(props.db) {
            const userId = props.user.userId;
            const unsubscribe = props.db
                .collection("perfiles/" + userId + "/match_list")
                .where("match", "==", true)
                .onSnapshot((snapshot => {
                    const data = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id:doc.id
                    }))

                    setUserMatchList(data);
            }))

            return unsubscribe;
        }
    }, [props.db])

    return (
        <Wrapper>
            <MiniProfile user={props.user} setScreen={props.setScreen} setUserMatch={props.setUserMatch}/>
            <MatchSearcher setSearchText={setSearchText}/>
            <WrapperMatches>
            { 
            userMatchList && userMatchList.map(userMatch =>{
                return(
                    <MatchPerson 
                        db={props.db}
                        userId={props.user.userId} 
                        userMatchId={userMatch.id_perfil}
                        userMatch={props.userMatch}
                        setUserMatch={props.setUserMatch}
                        setScreen={props.setScreen}
                        searchText={searchText}
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