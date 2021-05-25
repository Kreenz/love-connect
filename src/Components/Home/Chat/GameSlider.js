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
        transition: All 0.2s ease-in-out;
        box-sizing: border-box;
        border-top: 0.3vh solid #39e5b6;
        margin-top: 0.5vh;
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
        let refMatchGame = props.db
        .collection("matches/" + props.userMatch.id_chat + "/juegos")
        .doc();

        let matchGameId = refMatchGame.id;

        props.db
        .collection("juegos")
        .doc(id_game)
        .get()
        .then(doc => {
            let game = doc.data().juego;
            game = game.replace("id_1", props.user.userId);
            game = game.replace("id_2", props.userMatch.userId);
            game = JSON.parse(game);
            refMatchGame.set(
                {
                    id_juego: id_game,
                    estado: "init",
                    juego: JSON.stringify(game)
                }
            )
    
            let message = {id_gameMatch: matchGameId, id_game: id_game, name: name}
            sendMessage(message, "game");
        })


    }

    const loadGames = () => {
        let views = [];
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