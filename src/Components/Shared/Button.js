import React from "react"
import styled from "styled-components";

const ObjButton = styled.button`
    border-radius:5px;
    width:15vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
`;

const Button = (props) => {

    return (
        <ObjButton onClick={() => {props.setTipo(props.boolean)}}>
            {props.name}
        </ObjButton>
    );
};

export default Button;