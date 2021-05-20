import React from "react"
import styled from "styled-components";

const ObjButton = styled.button`
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
`;

const Wrapper = styled.div`
    &:hover ${ObjButton} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const Button = (props) => {

    return (
        <Wrapper>
            <ObjButton onClick={() => {props.setTipo(props.boolean)}}>
                {props.name}
            </ObjButton>
        </Wrapper>

    );
};

export default Button;