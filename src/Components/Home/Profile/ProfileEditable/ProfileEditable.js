import React, { useEffect, useState} from "react"
import styled from "styled-components";

import ProfileEditablePhoto from "./ProfileEditablePhoto/ProfileEditablePhoto";
import ProfileEditableForm from "./ProfileEditableForm/ProfileEditableForm";
import ProfieEditablePhotoButton from "./ProfileEditablePhoto/ProfileEditableButtons/ProfileEditablePhotoButton";

const Wrapper = styled.div`

    background: tomato;
    height:100%;
    width: 45vw;
    margin-bottom:8vh;
    align-items:center;
    justify-content:center;
`;

const WrapperPhotos = styled.div`

    background: black;
    display: flex;
    flex-direction: row;
    
`;

const WrapperPhotosEdit = styled.div`
    background: red;
    display: flex;
    flex-direction: row;
    height: 8vw;
    width: 6vw;
    margin-top: 2vh;
    margin-bottom: 3vh;
    margin-left: 1vw;
    justify-content: center;
`;

const ProfileEditable = (props) => {
    const [profileUser, setProfileUser] = useState({
        userId: null,
        username: "Pablo",
        description: "Me gusta ser un chico otaku",
        email:"pabloceballos@hotmail.com",
        age:23,
        distance:11,
        recent:null,
        gender:"chico",
        lookingFor:"chico",
        tastes:[
            {
                name: "poco",
                description: "sabe a poco"
            },
            {
                name: "poco2",
                description: "sabe a poco2"
            }
        ],
        photos:["", "", "", ""],
        upper_age_range:2,
        lower_age_range:2
    })

    useEffect(() => {
        //buscas en la base de datos el usuario en base al userId que te pasan por los props
        let currentUser = {
            userId: "QR2LzSe7dfLcyAEnuWu4",
            username: "Pablo",
            description: "Me gusta ser un chico otaku",
            email:"pabloceballos@hotmail.com",
            age:23,
            distance:11,
            recent:null,
            gender:"chico",
            lookingFor:"chico",
            tastes:[
                {
                    name: "poco",
                    description: "sabe a poco"
                },
                {
                    name: "poco2",
                    description: "sabe a poco2"
                }
            ],
            photos:["", "", "", ""],
            upper_age_range:2,
            lower_age_range:2
        }
        if(profileUser.userId == null) setProfileUser(currentUser);
    });

    const loadPhotos = (props) => {
        let components = [];
        for(let i = 0; i < profileUser.photos.length; i++){
            components.push(
                <ProfileEditablePhoto/>             
            )

         
        }
        components.push(
            <WrapperPhotosEdit>
                <ProfieEditablePhotoButton/>
            </WrapperPhotosEdit>
        );

        return components; 
    }



    return (
        <Wrapper>
            <WrapperPhotos>
                {loadPhotos(props)}
            </WrapperPhotos>

            <ProfileEditableForm
                name="form1"
                inputs={
                    [{
                        label:"Nombre: ",
                        name:"nombre",
                        type:"text",
                        styles:"width:95%;"
                    },
                    {
                        label:"Estado: ",
                        name:"estado",
                        type:"text",
                        styles:"width:95%;"
                    },
                    {
                        label:"Descripción: ",
                        name:"descripcion",
                        type:"text",
                        styles:"width:95%;"
                    }]
                }
                styles="width:100%; align-items:center;"
                /* submit={funtion} */
            />

        </Wrapper>
    );
};

export default ProfileEditable;