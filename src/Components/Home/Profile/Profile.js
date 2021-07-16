import React from "react"
import styled from "styled-components";

import ProfileEditable from "./ProfileEditable/ProfileEditable";
import ProfileMatch from "./ProfileMatch/ProfileMatch";
import ProfileEditableAdvancedSettings from "./ProfileEditable/ProfileEditableAdvancedSettings"

const Wrapper = styled.div`
  background:white;
  color:white;
  width:80%;
  height:100%;
  align-items: center;
  justify-content:center;
  display: flex;
  flex-direction: row;
  background-color: #9eabe4;
  background-image: linear-gradient(315deg,#9eabe4 0%,#77eed8 74%);
`;



const Profile = (props) => {

  return (
    <Wrapper>
        {!props.editable ? <ProfileMatch db={props.db} userMatch={props.userMatch} screen={props.screen} setScreen={props.setScreen} oldScreen={props.oldScreen} setOldScreen={props.setOldScreen} user={props.user} setUser={props.setUser}/> :<ProfileEditable user={props.user} db={props.db} setUser={props.setUser}/>}
        {props.editable ? <ProfileEditableAdvancedSettings user={props.user} db={props.db} setUser={props.setUser}/> : null}
    </Wrapper>
  );
};

export default Profile;