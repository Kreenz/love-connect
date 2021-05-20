import React from "react"
import styled from "styled-components";

import Input from '../Shared/Formulario/Input';
import Label from '../Shared/Formulario/Label';

const ButtonSubmit = styled.button`
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
`

const DivForm = styled.form`
  ${props =>`
    border-radius:1vh;
    text-align: center;
    align-items: center;
    ${props.styles}
  `}
`;

const DivHoverWrapper = styled.div`
  &:hover ${ButtonSubmit} {
    box-shadow 0 0 2vh #01baef;
    text-shadow: 0 0 0.3vh white;
  }
`

const DivInput = styled.div`
  border-radius:1vh;
  width:100%;
  height:10vh;
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  align-items:center;
  justify-content:center;
  margin-top:2vh;
`;



const Form = (props) => {

  const CreateInpunts = () => {
    const view = [];
    props.inputs.forEach(element => {
      switch(element.type){
        case "text":
        case "number":
        case "date":
        case "password":
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
             <ButtonSubmit name={element.name} value={element.label} onClick ={(e) => { e.preventDefault(); element.fun(); }}>
              {element.label}
             </ButtonSubmit>
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
    <DivForm styles={props.styles}name={props.name}>
      <DivHoverWrapper>
        {CreateInpunts()}
      </DivHoverWrapper>
    </DivForm>
  );
};

export default Form;