import React, { useEffect, useState} from "react"
import styled from "styled-components";
import ProfileSavePhoto from "../ProfileEditablePhoto/ProfileSavePhoto/ProfileSavePhoto";

const Wrapper = styled.div`
background: green;
height:50%;
width: 50%;
align-self: center;
`;

const ProfieEditablePhotoButton = (props) => {



return (
    <Wrapper>
        <ProfileSavePhoto user={props.user} db={props.db}/>
    </Wrapper>
)

}


export default ProfieEditablePhotoButton;