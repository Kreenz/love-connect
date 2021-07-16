import React, { useState } from "react"
import styled from "styled-components";

import Input from '../../../../Shared/Formulario/Input';
import Label from '../../../../Shared/Formulario/Label';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Wrapper2_2 = styled.div`
    ${props=>`
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0%;
        left: 0%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        background-color: rgba(128,128,128,0.7);
        z-index: 999;
        display:${props.show ? 'flex' : 'none'};
        ${props?.styles}
`}`;

const DivConten = styled.div`
    width: 50vw;
    height: 50vh;
    background-color: #f5f5f5;
    font-size:2vh;      
    display:flex;
    border-radius:2vh;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Title = styled.h1`
    width: 100%;
    height: 10%;
    color:#14557b;
    margin-bottom:0px;
    margin-top:0px;
`;

const DivRow = styled.div`
    width: 100%;
    height: 20%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const ButtonAccept = styled.button`
  border:none;
  border-radius:0.5vh;
  width: 15vw;
  height: 6vh;
  text-align: center;
  align-items: center;
  font-size: 2.5vh;
  background-color #20bf55;
  background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
  transition: box-shadow 0.2s ease-in;
  color:white;
  cursor:pointer;
`;

const DivForm = styled.div`
    ${props=>`
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
        margin-top:1vh;
        test-align:left;
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
  border-radius:0.5vh;
  width: 15vw;
  height: 6vh;
  text-align: center;
  align-items: center;
  font-size: 2.5vh;
  background-color #20bf55;
  background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
  transition: box-shadow 0.2s ease-in;
  color:white;
  cursor:pointer;
`

const HoverWrapper = styled.div`
  ${props=>`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    margin-bottom:5vh;
    &:hover ${ButtonSumbit} {
      box-shadow 0 0 2vh #01baef;
      text-shadow: 0 0 0.3vh white;
    }
    &:hover ${ButtonAccept} {
      box-shadow 0 0 2vh #01baef;
      text-shadow: 0 0 0.3vh white;
    }
    ${props?.styles}
`}`;

const ProfileEditableForm = (props) => {
  const[popUp, setPopUp] = useState(false);
  const setNextUserMatchList = props.setNextUserMatchList;

  const CreateInpunts = () => {
    const view = [];
    props.inputs.forEach(element => {
      switch(element.type){
        case "text":
        case "number":
        case "date":
        case "checkbox":
          view.push(
           <DivInput styles={element.style2}>
            <Label valor={element.label} styles={element.styl}/>
            {/*console.log(element.styles)*/}
            <Input name={element.name} type={element.type} placeholder={element.label} styles={"padding-left: 1vh; text-align:left;" + element.styles} value={element.value} onChange={element.onChange}/>
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
              <Label valor={element.label} styles={element.styl}/>
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
                            <Label valor={element.value} styles="margin-left:2vw; width:6vw"/>
                        </DivInput>
                    </DivInput>
                );
            /* } */
        break;
        case "submit":
          view.push(
           <DivInput>
             <HoverWrapper styles={element.style2}>
              <ButtonSumbit name={element.name} value={element.label} onClick ={(e) => { e.preventDefault(); element.fun(); setPopUp(true)}}>
                {element.label}
              </ButtonSumbit>
             </HoverWrapper>
           </DivInput>
           );
        break;
        case "textarea":
          view.push(
           <DivInput styles={element.style2}>
            <Label valor={element.label} styles={element.styl}/>
            {/*console.log(element.styles)*/}
            <Input name={element.name} type={element.type} placeholder={element.label} styles={element.styles} value={element.value} onChange={element.onChange}/>
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
      <Wrapper2_2 show={popUp}>
        <DivConten>
            <Title>Se han guardado los cambios!</Title>
            <DivRow>
              <HoverWrapper styles={"margin-top:10vh;"}>
                <ButtonAccept onClick={() => {setPopUp(false)}}>Aceptar</ButtonAccept>
              </HoverWrapper>
            </DivRow>
        </DivConten>
      </Wrapper2_2>
      {CreateInpunts()}
    </DivForm>
  );
};

export default ProfileEditableForm;