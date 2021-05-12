import React, { useState } from "react"
import styled from "styled-components";

const Wrapper = styled.div`
  ${props =>`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
        background:gray;
        width:100%;
        overflow-y:auto;
        ${props.styles}
`}`

const WrapperOverflow = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    background-color:gray;
    width:100%;
    height:fit-content;
    padding-bottom: 1%;
`

const InputWrapper = styled.div`
    ${props =>`
        display:flex;
        align-items:center;
        color:black;
        outline:none;
        border:none;
        border-radius:1vh;
        background:white;
        width: 95%;
        height: 30px;
        padding: 1%;
        font-size:2vh;
        margin-top:1%;
        ${props.styles}
`}`

const InputData = styled.input`
    border:none;
    font-size:2vh;
    text-align:right;
    width:inherit;
`

const TasteDivisor = styled.div`
    background-color:black;
    width: 95%;
    height:3px;
    margin-top:10%;
`

const ProfileData = (props) => {

    const loadTastes = (userTastes) => {
        let views = [];
        userTastes.forEach(taste => {
            views.push(
                <InputWrapper styles={"width:20%;margin-left:1%;justify-content:space-between;margin-top:0;"}>
                    {taste.name}
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
                    <InputData value={props.user.username} />
                </InputWrapper>

                <InputWrapper styles={"background-color:transparent;"}>
                    <InputWrapper styles={"width:20%;justify-content:space-between;margin-top:0;"}>
                        Distancia
                        <InputData value={props.user.age} />
                    </InputWrapper>
                    <InputWrapper styles={"width:20%;margin-left:1%;justify-content:space-between;margin-top:0;"}>
                        Edat
                        <InputData value={props.user.distance} />
                    </InputWrapper>
                </InputWrapper>

                <InputWrapper styles={"justify-content:space-between;"}>
                    Estado
                    <InputData value={props.user.estado}/>
                </InputWrapper>

                <InputWrapper styles={"justify-content:space-between; height:160px; align-items:baseline;"}>
                    Descripcion
                    <InputData value={props.user.description}/>
                </InputWrapper>

                <TasteDivisor/>
                <InputWrapper styles={"background-color:transparent;"}>
                    {loadTastes(props.user.tastes)}
                </InputWrapper>
            </WrapperOverflow>

        </Wrapper>
    );
};

export default ProfileData;