import React, { useEffect, useState} from "react"
import styled from "styled-components";

import ProfileEditableForm from "./ProfileEditableForm/ProfileEditableForm";
import ProfileEditablePhoto from "./ProfileEditablePhoto/ProfileEditablePhoto";
import ProfileEditablePhotoButton from "./ProfileEditableButtons/ProfileEditablePhotoButton";

import ProfileEditableTastesButton from "./ProfileEditableButtons/ProfileEditableTastesButton";
import ProfileEditableTastes from "./ProfileEditableTastes/ProfileEditableTastes";

//npm install nouislider-react

/* const Slider = () => (
    <Nouislider step={10} range={{ min: 0, max: 100 }} start={[20]} connect />
); */

const Wrapper = styled.div`
    background: tomato;
    color:white;
    width:100%;
    height:100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left:10vw;
`;

const WrapperPhotos = styled.div`

    background: black;
    display: flex;
    flex-direction: row;
    width: 100%;
    
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

const WrapperForm1 = styled.div`
    display: flex;
    width:100%;
    justify-content:center;
`;

const WrapperForm2 = styled.div`
    display: flex;
    width:95%;
    justify-content:space-between;
`;

const WrapperForm2_2 = styled.div`
    display: flex;
    width:20vw;
    height:30vh;
    flex-direction: column;
    align-items:center;
`;


const WrapperTastes = styled.div`
    height: 20%;
    width: 100%;
    background: violet;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const WrapperTastesEdit = styled.div`
    height: 20%;
    width: 20%;
    background: white;
    margin-left: 1vw;
    margin-top: 1vw;
    outline: none;
    border: none;
    border-radius: 1vh;
    display: flex;
    flex-direction: row;
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
                <ProfileEditablePhotoButton/>
            </WrapperPhotosEdit>
               
        );

        return components; 
    }


    const loadTastes = (props) => {
        console.log(profileUser.tastes.length)
        let components = [];
        for(let i = 0; i < profileUser.tastes.length; i++){
            components.push(
                <ProfileEditableTastes/>             
            )

         
        }
        components.push(
            <WrapperTastesEdit>
                <ProfileEditableTastesButton/>
            </WrapperTastesEdit>
                
        );
        return components; 
    }


    return (
        <Wrapper>
            <WrapperPhotos>
                {loadPhotos(props)}
            </WrapperPhotos>
            <WrapperForm1>
                <ProfileEditableForm
                    name="form1"
                    inputs={
                        [{
                            label:"Nombre: ",
                            name:"nombre",
                            type:"text",
                            value:profileUser.username,
                            styles:"width:100%;"
                        },
                        {
                            label:"Estado: ",
                            name:"estado",
                            type:"text",
                            value:profileUser.username,
                            styles:"width:100%;"
                        },
                        {
                            label:"Descripción: ",
                            name:"descripcion",
                            type:"text",
                            value:profileUser.description,
                            styles:"width:100%;"
                        }]
                    }
                    styles="width:35vw;"
                    /* submit={funtion} */
                />
            </WrapperForm1>
            <WrapperForm2>
                <ProfileEditableForm
                    name="form1"
                    inputs={
                        [{
                            label:"Busca: ",
                            name:"nombre",
                            type:"select",
                            options:["Hombre", "Mujer", "Triangulo?"],
                            typegen:profileUser.lookingFor,
                            styles:"width:70%;"
                        }]
                    }
                    styles="width:10vw; height:10vh;align-items:center;"
                    /* submit={funtion} */
                />
                <WrapperForm2_2>
                    {/* <WrapperSlider>
                        {Slider()}
                    </WrapperSlider> */}
                    <ProfileEditableForm
                        name="form1"
                        inputs={
                            [{
                                label:"Distancia",
                                name:"distance",
                                type:"range",
                                value:profileUser.distance,
                                range:{min:0,max:100},
                                step:10,
                                start:[profileUser.distance],
                                styles:"width:20%;"
                            }]
                        }
                        styles="height:10%; align-items:center; width:18vw; margin-bottom:5vh;"
                    />
                    <ProfileEditableForm
                        name="form1"
                        inputs={
                            [{
                                label:"Edad",
                                name:"age",
                                type:"range",
                                value:profileUser.lower_age_range+" - "+profileUser.upper_age_range,
                                range:{min:18,max:50},
                                step:1,
                                start:[profileUser.lower_age_range,profileUser.upper_age_range],
                                styles:"width:20%;"
                            }]
                        }
                        styles="height:10%; align-items:center; width:20vw;"
                    />
                </WrapperForm2_2>
            </WrapperForm2>
            <WrapperTastes>
                {loadTastes(props)}
            </WrapperTastes>
        </Wrapper>
    );
};

export default ProfileEditable;