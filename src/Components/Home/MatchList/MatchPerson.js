import React from "react"
import styled from "styled-components";

import MiniProfileWrapper from "../../Shared/MiniProfile/MiniProfileWrapper";

const WrapperPerson = styled.div`
    height: 7vw;
    width: 6vw;
    margin-left: 1vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
`;

const MatchPerson = (props) =>{

    const searchUserMatch = (user, userMatch, setUserMatch, screen, setScreen) => {
        //buscas user con la llave userId en la base de datos;
        let newUserMatch = {
            userId: user.userId,
            username: user.username,
            age: "19",
            distance: "11",
            recent: null,
            tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
            photos:user.photos
        }
        if(userMatch.userId === newUserMatch.userId && screen === "chat") setScreen("match");
        else setScreen("chat");
        setUserMatch(newUserMatch);
    }

    return(
        <WrapperPerson onClick={() => { 
            //[props.userIndex] es el indice es decir array[i]
            searchUserMatch(props.userMatchList[props.userIndex], props.userMatch, props.setUserMatch, props.screen, props.setScreen);
            
        }}>

        <MiniProfileWrapper  user={props.user}>
        </MiniProfileWrapper>
           
        </WrapperPerson>
    );
}


export default MatchPerson;