import React, { useEffect, useState} from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    height: 20%;
    width: 20%;
    background: white;
    margin-left: 1vw;
    margin-top: 1vw;
    outline: none;
    border: none;
    border-radius: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Wrapper2 = styled.div`
    outline: none;
    border: none;
    border-radius: 1vh;
    background: green;
    height:70%;
    width: 50%;
    text-align:center;
    justify-content:center;
    align-items:center;
    display:flex;
    align-self: center;
`;

const ProfileEditableTastesButton = (props) => {

    return (
        <Wrapper>
            <Wrapper2>
                +
            </Wrapper2>
        </Wrapper>
    )

}


export default ProfileEditableTastesButton;