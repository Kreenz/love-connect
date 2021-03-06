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
    color:black;
`;



const ProfileEditableTastes = (props) =>{

    return (
        <Wrapper>
            {props.tastes}
        </Wrapper>
    )

}


export default ProfileEditableTastes;