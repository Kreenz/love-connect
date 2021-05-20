import React, { useEffect, useState } from "react"
import styled from "styled-components";

import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import MatchSearcher from "./MatchSearcher";
import MatchPerson from "./MatchPerson";

const ButtonSignOut = styled.button`
    border-radius:0.3vh;
    width:15vw;
    height:6vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    color: white;
    border:none;
    cursor:pointer;
    background-color #20bf55;
    background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
    transition: box-shadow 0.2s ease-in;
    font-size:2vh;
`

const Wrapper = styled.div`
  ${props=>`
    display: flex;
    flex-direction: column;
    font-size: 2.5vh;
    background-color: #14557b;
    height: 100vh;
    width: 25vw;
    text-align: center;
    align-items: center;
    ${props?.styles}
`}`

const HoverWrapper = styled.div`
    &:hover ${ButtonSignOut} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const WrapperMatches = styled.div`
    display:inline-flex;
    width: 100%;
    height: 70vh;
    flex-wrap: wrap;
`;


const MatchList = (props) => {
    //console.log(props)
    const[searchText, setSearchText] = useState("");
    const[userMatchList, setUserMatchList] = useState([]);

    const signOut = () => {
        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }

        props.setUser({loggedIn: false});
    }

    //console.log(process.cwd())
    // C:\Project
    //console.log(document.location.pathname)
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
    //console.log(props.userMatch)
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
            <HoverWrapper>
                <ButtonSignOut onClick={() => {signOut()}}>CERRAR SESSION</ButtonSignOut>
            </HoverWrapper>
        </Wrapper>
    );
};


export default MatchList;