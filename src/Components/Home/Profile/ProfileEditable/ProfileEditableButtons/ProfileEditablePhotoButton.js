import React, { useEffect, useState} from "react"
import styled from "styled-components";

import ProfileSavePhoto from "../ProfileEditablePhoto/ProfileSavePhoto/ProfileSavePhoto";

const Wrapper = styled.div`
    height:100%;
    width: 100%;
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