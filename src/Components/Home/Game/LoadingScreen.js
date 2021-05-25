import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
`}`

const LoadingScreen = (props) => {

    return (
        <Wrapper active={props.active}>
        </Wrapper>
    );
};

export default LoadingScreen;