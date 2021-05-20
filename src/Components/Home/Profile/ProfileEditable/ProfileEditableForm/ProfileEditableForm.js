import React from "react"
import styled from "styled-components";

import Input from '../../../../Shared/Formulario/Input';
import Label from '../../../../Shared/Formulario/Label';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const DivForm = styled.div`
    ${props=>`
        border-radius:1vh;
        width:43vw;
        height:30vh;
        text-align: center;
        align-items: center;
        justify-content: center;
        ${props?.styles}
`}`;
  

const DivInput = styled.div`
    ${props=>`
        border-radius:1vh;
        width:98%;
        height:10vh;
        display: flex;
        flex-direction: column; 
        align-items: flex-start;
        ${props?.styles}
`}`;

const WrapperSlider = styled.div`
  ${props=>`
      width:10vw;
      height:2vh;
      ${props?.styles}
`}`;

const ButtonSumbit = styled.button`
  border:none;
  border-radius:1vh;
  width:15vw;
  height:8vh;
  text-align: center;
  align-items: center;
  font-size: calc(5px + 2vmin);
`

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
            {/*console.log(element.styles)*/}
            <Input name={element.name} type={element.type} placeholder={element.label} styles={element.styles} value={element.value} onChange={element.onChange}/>
           </DivInput>
           );
        break;
        case "select":
          const options = [];
          element.options.forEach(element2 => {
            options.push(<option value={element2}>{element2}</option>);
          })
          view.push(
            <DivInput>
              <Label valor={element.label}/>
              <Input name={element.name} type={element.type} options={options} styles={element.styles} value={element.value} onChange={element.onChange} noInput/>
            </DivInput>
          );
        break;
        case "range":
            /* if(element.name == "distance"){ */
                view.push(
                    <DivInput>
                        <Label valor={element.label}/>
                        <DivInput styles="flex-direction:row; width:100%">
                            <WrapperSlider>
                              <Nouislider step={element.step} range={element.range} start={element.start} name={element.name} onChange={element.onChange} connect />
                            </WrapperSlider>
                            <Label valor={element.value} styles="margin-left:2vw; width:4vw"/>
                        </DivInput>
                    </DivInput>
                );
            /* } */
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
    <DivForm name={props.name} styles={props.styles}>
      {CreateInpunts()}
    </DivForm>
  );
};

export default ProfileEditableForm;