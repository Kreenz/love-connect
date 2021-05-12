import React from "react"
import styled from "styled-components";

import imgSearcher from "../../../Assets/Images/searcher.png"

const Wrapper = styled.div`
  ${props=>`
    display: flex;
    flex-direction: row;
    font-size: 2.5vh;
    background: green;
    height: 8.5%;
    width: 25vw;
    text-align: center;
    align-items: center;
    ${props?.styles}
`}`

const Searcher = styled.input`
    height: 6vh;
    width: 17vw;
    margin-left: 0.7vw;
    margin-top: 0.4vh;
    background: transparent;
    border: none;    
    font-size: 3vh;
    padding-left: 1vw;
    outline: none;
`;

const ImgSearch = styled.img`   
    padding-left: 0.5vw;  
    width: auto;
    height: 5.7vh;    
    margin-top: 0.9vh;
`;

const MatchSearcher = (props) => {

    return (
        <Wrapper key={"black"}>
            <Searcher placeholder="Escribe aqui para buscar" onChange={(e) => { props.setSearchText(e.target.value)}}/>
            <ImgSearch src={imgSearcher}/>
        </Wrapper>
    );
};

export default MatchSearcher;