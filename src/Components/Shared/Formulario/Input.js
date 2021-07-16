import React from "react"
import styled from "styled-components";

const ObjInput = styled.input`
  ${props=>`
    border-radius:5px;
    border:none;
    width:18vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`;

const ObjSelect = styled.select`
  ${props=>`
    border-radius:5px;
    border:none;
    width:18vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`;

const ObjArea = styled.textarea`
  ${props=>`
    border-radius:5px;
    border:none;
    width:18vw;
    height:8vh;
    text-align: center;
    align-items: center;
    font-size: calc(5px + 2vmin);
    ${props?.styles}
`}`;

const Input = (props) => {

  let view = null;

  if(!props.noInput){
    view = <ObjInput name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} styles={props.styles}
    min={props.min} max={props.max} step={props.step} onChange={props.onChange} onClick={props.onClick}/>
  }
  else{
    const options = [];
    props.options.forEach(element2 => {
      /* console.log(element2.props.value); */
      options.push(<option value={element2.props.value}>{element2.props.value}</option>);
    })
    view = <ObjSelect name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} styles={props.styles}
    onChange={props.onChange} onClick={props.onClick}>
        {options}
    </ObjSelect>
  }
  if(props.type == "textarea"){
    view = <ObjArea name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} styles={props.styles}
    onChange={props.onChange} onClick={props.onClick}/>
  }

  return (
    view
  );
};

export default Input;