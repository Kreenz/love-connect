import React from "react"
import styled from "styled-components";

const ObjLabel = styled.label`
  ${props=>`
    border-radius:5px;
    width:15vw;
    height:7vh;
    text-align: left;
    align-items: center;
    color: white;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`;

const Label = (props) => {

  return (
    <ObjLabel styles={props.styles}>
        {props.valor}
    </ObjLabel>
  );
};

export default Label;