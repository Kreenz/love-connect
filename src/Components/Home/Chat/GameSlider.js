import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        height: ${props.active ? "25%": "0%"};
        width: 100%;
        background:transparent;
        ${props?.styles}
`}`

const GameWrapper = styled.div`
    height:100%;
    width:15%;
    padding: 2%;
`

const GameItem = styled.div`
    ${props =>`
        width:100%;
        height:85%;
        background: url('${props.background}');
        background-color:lightblue;
        border-radius:7%;
        cursor:pointer;
`}`

const GameSlider = (props) => {

    const sendMessage = (message, type) => {
        console.log(props.userMatch.id_chat, props.user.userId)
        
        const messages = props.db.collection("matches/" + props.userMatch.id_chat + "/messages").doc();
        messages.set(
        {
            fecha: new Date().getTime(),
            id_perfil: props.user.userId,
            message: JSON.stringify(message),
            type: type
        })
    }

    const sendGame = (id_game, name) => {
        let message = {id_game: id_game, name: name}
        sendMessage(message, "game");
    }

    const loadGames = () => {
        let views = [];
        console.log(props.games)
        props.games.forEach(game => {
            views.push(
                <GameWrapper>
                    <GameItem background={game[1][1]} onClick={() => {sendGame(game[0], game[1][0])}}/>
                </GameWrapper>
            )
        })
        return views;
    }

    return (
        <Wrapper active={props.active}>
            {loadGames()}
        </Wrapper>
    );
};

export default GameSlider;