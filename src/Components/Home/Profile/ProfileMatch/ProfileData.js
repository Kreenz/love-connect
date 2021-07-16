import React, { useState } from "react"
import styled from "styled-components";
import Match from "../../Match/Match";

const Wrapper = styled.div`
  ${props =>`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
        background:#f5f5f5;
        width:100%;
        overflow-y:auto;

        ${props.styles}
`}`

const WrapperOverflow = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    background-color:#f5f5f5;
    width:100%;
    height:fit-content;
    padding-bottom: 1%;
`

const InputWrapper = styled.div`
    ${props =>`
        display:flex;
        align-items:center;
        color:white;
        outline:none;
        border:none;
        border-radius:1vh;
        background-color: #70b2d9;
        background-image: linear-gradient(315deg, #70b2d9 0%, #39e5b6 74%);      
        width: 95%;
        height: 30px;
        padding: 1%;
        font-size:2vh;
        margin-top:1%;
        ${props.styles}
`}`

const InputData = styled.input`
    ${props =>`
        border:none;
        font-size:2vh;
        text-align:right;
        width:inherit;
        color:white;
        background-color:transparent;
        outline:none;
        ${props?.styles}
`}`

const TasteDivisor = styled.div`
    background-color: #70b2d9;
    background-image: linear-gradient(315deg, #70b2d9 0%, #39e5b6 74%);      
    width: 95%;
    height:3px;
    color:black;
`

const InfoText = styled.span`
    color:black;
    margin-top:10%;
    width:95%;
    text-align:left;

    font-size: 3vh;
    background-image: linear-gradient(315deg, #70b2d9 0%, #39e5b6 74%);   
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const ProfileData = (props) => {
    const fecha = Math.round((new Date().getTime()/1000 - props.userMatch.recent/1000) / 60);
    const fechaUsuario = fecha >= 60 ? ( (fecha / 60) / 24) >= 1 ? "hace " + Math.round(fecha / 24) + " dia/s." : "hace " + Math.round(fecha / 60) + " hora/s." : fecha <= 5 ? "recientemente." : "hace " + fecha + " minuto/s.";
    const loadTastes = (userTastes) => {
        let views = [];
        userTastes.forEach(taste => {
            views.push(
                <InputWrapper styles={"width:20%;margin-left:1%;justify-content:space-between;margin-top:0;"}>
                    {taste}
                </InputWrapper>
            )
        })

        return views;
    }

    return (
        <Wrapper styles={props.styles}>
            <WrapperOverflow>
                <InputWrapper styles={"justify-content:space-between;"}>
                    Nombre
                    <InputData value={props.userMatch.username} readOnly={true}/>
                </InputWrapper>

                <InputWrapper styles={"background-color:transparent; background-image:none; border:none"}>
                    <InputWrapper styles={"width:25%;justify-content:space-between;margin-top:0;"}>
                        Genero
                        <InputData styles={"width:100%;"} value={props.userMatch.gender} readOnly={true}/>
                    </InputWrapper>
                    <InputWrapper styles={"width:20%;justify-content:space-between;margin-left:1vh;margin-top:0;"}>
                        Distancia
                        <InputData value={props.userMatch.distance} readOnly={true}/>
                    </InputWrapper>
                    <InputWrapper styles={"width:20%;margin-left:1%;justify-content:space-between;margin-top:0;"}>
                        Edat
                        <InputData value={props.userMatch.age} readOnly={true}/>
                    </InputWrapper>
                </InputWrapper>

                <InputWrapper>
                    <InputData styles={"text-align:left;"} value={"Ultima vez visto en la App: " + fechaUsuario} readOnly={true}/>
                </InputWrapper>

                <InputWrapper styles={"justify-content:space-between; height:160px; align-items:baseline;"}>
                    Descripcion
                    <InputData value={props.userMatch.description} readOnly={true}/>
                </InputWrapper>
                
                <InfoText>Gustos</InfoText>
                <TasteDivisor>
                </TasteDivisor>

                <InputWrapper styles={"background-color:transparent; background-image:none; border:none"}>
                    {loadTastes(props.userMatch.tastes)}
                </InputWrapper>
            </WrapperOverflow>

        </Wrapper>
    );
};

export default ProfileData;