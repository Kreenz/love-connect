import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        justify-content: center;
        align-items:center;
        height: 6vw;
        width: 5vw;
        ${props?.styles}
`}`

const CardContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    height: 90%;
    width: 90%;
    background:blue;
`

const Card = (props) => {

    let view = null;

    if(props.name){
        view = <Wrapper>
            <CardContainer>{props.name}</CardContainer>
        </Wrapper>;
    }else{
        view = <Wrapper>
            <CardContainer>?</CardContainer>
        </Wrapper>;
    }
  
    return (
        view
    );
};

export default Card;