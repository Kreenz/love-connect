import React from "react"
import styled from "styled-components";

import ProfileEditable from "./ProfileEditable/ProfileEditable";
import ProfileMatch from "./ProfileMatch/ProfileMatch";

const Wrapper = styled.div`
  background:white;
  color:white;
  width:100%;
  height:100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Profile = (props) => {
  return (
    <Wrapper>
        {!props.editable ? <ProfileMatch setScreen={props.setScreen} user={props.user} /> : <ProfileEditable user={props.user} />}
    </Wrapper>
  );
};

export default Profile;