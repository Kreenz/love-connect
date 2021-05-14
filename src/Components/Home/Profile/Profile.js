import React from "react"
import styled from "styled-components";

import ProfileEditable from "./ProfileEditable/ProfileEditable";
import ProfileMatch from "./ProfileMatch/ProfileMatch";
import ProfileEditableAdvancedSettings from "./ProfileEditable/ProfileEditableAdvancedSettings"

const Wrapper = styled.div`
  background:white;
  color:white;
  width:100%;
  height:100%;
  align-items: center;
  justify-content:center;
  display: flex;
  flex-direction: row;
`;




const Profile = (props) => {
  return (
    <Wrapper>
        {!props.editable ? <ProfileMatch screen={props.screen} setScreen={props.setScreen} oldScreen={props.oldScreen} setOldScreen={props.setOldScreen} user={props.user} /> :<ProfileEditable user={props.user} db={props.db}/>}
        {props.editable ? <ProfileEditableAdvancedSettings user={props.user}/> : null}
    </Wrapper>
  );
};

export default Profile;