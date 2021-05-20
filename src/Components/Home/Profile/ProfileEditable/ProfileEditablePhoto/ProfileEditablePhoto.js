import React, { useEffect, useState} from "react"
import styled from "styled-components";


const Wrapper = styled.div`
    ${props=>`
        background: url("${props.foto}") no-repeat center;
        background-size: cover;
        height: 8vw;
        width: 6vw;
        margin-top: 2vh;
        margin-bottom: 3vh;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: inline-block;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-left: 1vw;
    ${props?.styles}
`}`



const ProfileEditablePhoto = (props) =>{


    return (
        <Wrapper foto={props.user}>
        </Wrapper>
    )
}

export default ProfileEditablePhoto;