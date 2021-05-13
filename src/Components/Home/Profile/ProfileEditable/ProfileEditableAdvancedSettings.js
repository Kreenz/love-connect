import React from "react";
import styled from "styled-components";

import Input from "./../../../Shared/Formulario/Input";

const Wrapper = styled.div`
    background: gray;
    height: 100%;
    width: 58%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-self: flex-start;
    -ms-flex-item-align: start;
    align-self: flex-start;
    margin-left: 11%;
    flex-direction: column;
    
    `;

const AccountSettings = styled.h3`

`;

const Wrapper2 = styled.div`
    margin-top: 10%;
    heigth: 40%;
    width: 100%;
`;

const ProfileEditableAdvancedSettings = (props) =>{
    console.log(props.user)
    return(
        <Wrapper>
            <AccountSettings>Ajustes Avanzados</AccountSettings>
            <Input value={props.user.email} styles="
                align-self: center;
                width: 90%;
                overflow: auto;
            "></Input>
            <Wrapper2>
                <Input value="Password" styles="
                    align-self: center;
                    width: 90%;
                    overflow: auto;
                "></Input>

                <Input value="Repeat Password" styles="
                    margin-top: 2%;
                    align-self: center;
                    width: 90%;
                    overflow: auto;
                "></Input>
            </Wrapper2>  
            <Input value="DELETE ACCOUNT" type="submit" styles="
                align-self: center;
                margin-top: auto;
                width: 93%;
                margin-bottom: 5%;
            "></Input>       
        </Wrapper>
    )

}


export default ProfileEditableAdvancedSettings;