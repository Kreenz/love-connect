import React, { useEffect, useState} from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        height:100vh;
        width: 100%;
        ${props?.styles}
`}`

const Wrapper2 = styled.div`
    ${props=>`
        display:flex;
        align-items:center;
        justify-content:center;
        ${props?.styles}
`}`

const Wrapper3 = styled.div`
    ${props=>`
        display:flex;
        align-items:center;
        justify-content:center;
        margin-bottom:2vh;
        ${props?.styles}
`}`

const GameContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:center;
        height: 100%;
        width: 70%;
        background:lightblue;
        ${props?.styles}
`}`

const PopUp = styled.div`
    ${props=>`
        width: 40%;
        height: 40%;
        position: absolute;
        top: 50%;
        left: 49%;
        display:flex;
        border-radius: 3vh;
        border: none;
        flex-direction:column;
        transform: translate(-50%, -50%);
        background-color #20bf55;
        background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
        transition: box-shadow 0.2s ease-in;
        justify-content: center;
        align-items:center;
        ${props?.styles}


        -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
`}`;

const Button = styled.button`
    ${props => `
    align-self: center;
    border-radius: 1vh;
    border: none;
    text-align: center;
    -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    width:10vw;
    height:9vh;
    margin-bottom:2vh;
    margin-right:1vw;
    cursor:pointer;
    font-size: calc(0.6px + 2vmin);
    `}`
    

const Game3x3 = (props) => {
    console.log(props);
    const calculateWinner = (squares)=>{
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }return null;
    }

    const Square = (props) => {
        return (
            (props.value == "" || props.value == undefined) && !props.winner ? 
            <Button onClick={props.onClick}>
                {props.value}
            </Button>
            :
            <Button onClick={props.onClick} disabled>
                {props.value}
            </Button>
        );
    }
    const Board = ()=> {
        const [state,setState] = useState(
            {
                squares: props.userGame.posiciones,
                xIsNext: props.userGame.xIsNext,
            }
        );
        console.log(state)
    
        const handleClick = (i) =>{
            const squares = state.squares.slice();
            squares[i] = state.xIsNext ? 'X' : 'O';

            let games = props.userGame;
            games.posiciones = squares;

            if(props.userGame[props.user.userId].estado == "X" && props.userGame.turno == "X"){
                games.xIsNext = false;
                games.turno = "O";
            }
            else {
                games.xIsNext = true;
                games.turno = "X";
            }

            props.db.collection("matches/" + props.matchId + "/juegos").doc(props.gameMatch.id_gameMatch).update({
                juego:JSON.stringify(games)
            });

            setState({
                squares: squares,
                xIsNext: !state.xIsNext,
            });
            
            calculateWinner(state.squares);
        }
    
        const renderSquare = (i) => {
            return (
            <Square
                value={state.squares[i]}
                onClick={() => handleClick(i)}
                winner={winner}
            />
            );
        }
        
        const winner = calculateWinner(state.squares);

        let status;
        if (winner) {
            status = 'Ganador : ' + winner;
        } else {
            status = 'Turno para: ' + (state.xIsNext ? 'X' : 'O');
        }

        if(props.userGame[props.user.userId].estado == "X" && props.userGame.turno == "X" || props.userGame[props.user.userId].estado == "O" && props.userGame.turno == "O"){
            return (
                <div>
                  <Wrapper3>{status}</Wrapper3>
                  <Wrapper2>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                  </Wrapper2>
                  <Wrapper2>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                  </Wrapper2>
                  <Wrapper2>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                  </Wrapper2>
                </div>
              );
        }
        else if(winner){
            return (
                <div>
                  <Wrapper3>{status}</Wrapper3>
                  <Wrapper2>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                  </Wrapper2>
                  <Wrapper2>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                  </Wrapper2>
                  <Wrapper2>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                  </Wrapper2>
                </div>
              );
        }
        else{
            return (
                <div>
                  <Wrapper3>{status}</Wrapper3>
                  <Wrapper2>
                      Esperando respuesta del otro jugador
                  </Wrapper2>
                </div>
              );
        }

        
    }
    
    return (
        <Wrapper>
            <GameContainer>
            <PopUp>
                <Board/>
            </PopUp>
            </GameContainer>
            {props.chatgame}
        </Wrapper>
    );
};

export default Game3x3;