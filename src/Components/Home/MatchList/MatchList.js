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

const SubMenuWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:80%;
    width:100%;
`

const WrapperMatches = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-items:flex-start;
    justify-content:flex-start;
    width: 100%;
    overflow-y: auto;
    max-height:70vh;
    flex-wrap: wrap;
    padding-top:2vh;
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

    const loadUsers = () => {
        let components = [];
        userMatchList.forEach(userMatch => {
            components.push(
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
            />)
        })

        return components
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
                    let views = [];
                    snapshot.forEach(doc => {
                        views.push({
                            id:doc.id,
                            id_chat:doc.data().id_chat,
                            id_perfil:doc.data().id_perfil,
                            like:doc.data().like,
                            match:doc.data().match
                        })
                    })

                    setUserMatchList(views);
            }))

            return unsubscribe;
        }
    }, [props.db])
    //console.log(props.userMatch)
    return (
        <Wrapper>
            <MiniProfile  karma={props.user.karma} user={props.user} userMatch={props.userMatch} setScreen={props.setScreen} setUserMatch={props.setUserMatch} screen={props.screen} setOldScreen={props.setOldScreen} oldScreen={props.oldScreen} db={props.db}/>
            <MatchSearcher setSearchText={setSearchText}/>
            <SubMenuWrapper>
                <WrapperMatches>
                { loadUsers() }
                    {/*loadMatches(userMatchList, props.userMatch, props.setUserMatch, props.screen, props.setScreen, props.setChatMessages)*/}
                </WrapperMatches>
                <HoverWrapper>
                    <ButtonSignOut onClick={() => {signOut()}}>CERRAR SESSION</ButtonSignOut>
                </HoverWrapper>
            </SubMenuWrapper>
        </Wrapper>
    );
};


export default MatchList;