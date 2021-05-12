import React from "react"
import styled from "styled-components";

import Input from '../../../../Shared/Formulario/Input';
import Label from '../../../../Shared/Formulario/Label';

const DivForm = styled.div`
    ${props=>`
        border-radius:1vh;
        width:17vw;
        height:30vh;
        text-align: center;
        align-items: center;
        justify-content: center;
        ${props?.styles}
`}`;
  

const DivInput = styled.div`
    ${props=>`
        border-radius:1vh;
        width:95%;
        height:10vh;
        display: flex;
        flex-direction: column; 
        align-items: flex-start;
        ${props?.styles}
`}`;

const ProfileEditableForm = (props) => {

  const CreateInpunts = () => {
    const view = [];
    props.inputs.forEach(element => {
      switch(element.type){
        case "text":
        case "number":
        case "date":
          view.push(
           <DivInput>
            <Label valor={element.label}/>
            {console.log(element.styles)}
            <Input name={element.name} type={element.type} placeholder={element.label} styles={element.styles}/>
           </DivInput>
           );
        break;
        case "select":
          const options = [];
          element.options.forEach(element2 => {
            console.log(element2);
            options.push(<option value={element2}>{element2}</option>);
          })
          view.push(
            <DivInput>
            <Label valor={element.label}/>
            <Input name={element.name} type={element.type} options={options} styles={element.styles} noInput/>
            </DivInput>
          );
        break;
        default:
        break;
      }
    });
    return(
      view
    )
  }

  return (
    <DivForm name={props.name} styles={props.styles}>
      {CreateInpunts()}
    </DivForm>
  );
};

export default ProfileEditableForm;