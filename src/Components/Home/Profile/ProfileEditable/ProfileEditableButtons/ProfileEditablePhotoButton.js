import React, { useEffect, useState} from "react"
import styled from "styled-components";
import ProfileSavePhoto from "../ProfileEditablePhoto/ProfileSavePhoto/ProfileSavePhoto";

const Wrapper = styled.div`
    background: url(https://firebasestorage.googleapis.com/v0/b/loveconnect-8fb23.appspot.com/o/Photos%2Fsimbolo.png?alt=media&token=7302f35c-d8b4-459f-a01f-bc218fc31d85) no-repeat center;
    height:50%;
    width: 50%;
    align-self: center;
`;

const ProfieEditablePhotoButton = (props) => {


console.log(props)
return (
    <Wrapper>
        <ProfileSavePhoto setPhotos={props.setPhotos} photos={props.photos} user={props.user} db={props.db} setUser={props.setUser}/>
    </Wrapper>
)

}


export default ProfieEditablePhotoButton;