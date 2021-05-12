import React from "react"
import styled from "styled-components";

import Input from '../Shared/Formulario/Input';
import Label from '../Shared/Formulario/Label';

const DivForm = styled.form`
  border-radius:1vh;
  width:17vw;
  height:30vh;
  text-align: center;
  align-items: center;
`;

const DivInput = styled.div`
  border-radius:1vh;
  width:100%;
  height:10vh;
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
`;

const ButtonSumbit = styled.button`
  border:none;
  border-radius:1vh;
  width:15vw;
  height:8vh;
  text-align: center;
  align-items: center;
  font-size: calc(5px + 2vmin);
`

const Form = (props) => {

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
            <Input name={element.name} type={element.type} placeholder={element.label}/>
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
            <Input name={element.name} type={element.type} options={options} noInput>
            </Input>
            </DivInput>
          );
        break;
        case "submit":
          view.push(
           <DivInput>
             <ButtonSumbit name={element.name} value={element.label} onClick ={(e) => { e.preventDefault(); element.fun(); }}>
              {element.label}
             </ButtonSumbit>
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
    <DivForm name={props.name}>
      {CreateInpunts()}
    </DivForm>
  );
};

export default Form;