import React from "react"
import styled from "styled-components";

const ObjLabel = styled.label`
  border-radius:5px;
  width:15vw;
  height:7vh;
  text-align: left;
  align-items: center;
  color: black;
  font-size: calc(5px + 2vmin);
`;

const Label = (props) => {

  return (
    <ObjLabel>
        {props.valor}
    </ObjLabel>
  );
};

export default Label;