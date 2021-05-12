import React from "react"
import styled from "styled-components";

const ObjInput = styled.input`
  ${props=>`
    border-radius:5px;
    width:15vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`

const ObjSelect = styled.select`
  ${props=>`
    border-radius:5px;
    width:15vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`

const Input = (props) => {

  let view = null;

  if(!props.noInput){
    view = <ObjInput name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} styles={props.styles}/>
  }
  else{
    const options = [];
    props.options.forEach(element2 => {
      console.log(element2.props.value);
      options.push(<option value={element2.props.value}>{element2.props.value}</option>);
    })
    view = <ObjSelect name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} styles={props.styles}>
        {options}
    </ObjSelect>
  }

  return (
    view
  );
};

export default Input;