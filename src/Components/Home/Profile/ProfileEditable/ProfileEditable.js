import React, { useEffect, useState} from "react"
import styled from "styled-components";

import ProfileEditableForm from "./ProfileEditableForm/ProfileEditableForm";
import ProfileEditablePhoto from "./ProfileEditablePhoto/ProfileEditablePhoto";
import ProfileEditablePhotoButton from "./ProfileEditableButtons/ProfileEditablePhotoButton";

import ProfileEditableTastesButton from "./ProfileEditableButtons/ProfileEditableTastesButton";
import ProfileEditableTastes from "./ProfileEditableTastes/ProfileEditableTastes";

import Input from '../../../Shared/Formulario/Input';

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

const WrapperPhotosElements = styled.div`
    background: black;
    display: flex;
    flex-direction: row;
    width: 100%;  
    overflow-y: auto;
`

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
    margin-right: 1vw;
`;

const WrapperForm1 = styled.div`
    display: flex;
    width:100%;
    justify-content:center;
`;

const WrapperForm2 = styled.div`
    display: flex;
    width:95%;
    height: 20vh;
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
        /* console.log(props); */
        //console.log(props.db.collection("perfiles"));
        //buscas en la base de datos el usuario en base al userId que te pasan por los props
        /* if(props.db.collection("perfiles").where("uid", "==", props.user.uid)){
            console.log(props.user.uid)
        } */
        document.getElementsByName("busca")[0].value = lookingFor;
        let currentUser = {
            userId: props.user.userId,
            username: username,
            description: description,
            email:props.user.email,
            age:props.user.age,
            distance:distance,
            recent:props.user.recent,
            gender:props.user.gender,
            lookingFor:lookingFor,
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
            photos:props.photos,
            upper_age_range:upper_age_range,
            lower_age_range:lower_age_range
        }
        if(profileUser.userId == null) setProfileUser(currentUser);
    });

    const [username, setUsername] = useState(props.user.username);
    const [description, setDescription] = useState(props.user.description);
    const [lookingFor, setLookingFor] = useState(props.user.lookingFor);
    const [distance, setDistance] = useState(props.user.distance);
    const [upper_age_range, setUpper_age_range] = useState(props.user.upper_age_range);
    const [lower_age_range, setLower_age_range] = useState(props.user.lower_age_range);

    const Save = () => {
        let updates = {
            nombre:username,
            descripcion:description,
            busca:lookingFor,
            distancia:distance,
            rango_edad_mayor:upper_age_range,
            rango_edad_menor:lower_age_range
        }
        props.db.collection("perfiles").doc(props.user.userId).update(updates);
    }

    const SaveJS = () => {
        let currentUser = {
            loggedIn: props.user.loggedIn,
            userId: props.user.userId,
            username: username,
            description: description,
            email:props.user.email,
            age:props.user.age,
            distance:distance,
            recent:props.user.recent,
            gender:props.user.gender,
            lookingFor:lookingFor,
            localitzation:props.user.localitzation,
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
            photos:props.user.photos,
            upper_age_range:upper_age_range,
            lower_age_range:lower_age_range
        }
        props.setUser(currentUser);
    }

    /* console.log(props); */
    const loadPhotos = (props) => {
        let components = [];
        for(let i = 0; i < props.user.photos.length; i++){
            components.push(
                <ProfileEditablePhoto user={props.user.photos[i]}/>   
                          
            )

         
        }

        return components; 
    }


    const loadTastes = (props) => {
        /* console.log(profileUser.tastes.length) */
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
                <WrapperPhotosElements>
                    {loadPhotos(props)}
                </WrapperPhotosElements>
                <WrapperPhotosEdit>
                    <ProfileEditablePhotoButton user={props.user} db={props.db} setUser={props.setUser}/>
                </WrapperPhotosEdit>
            </WrapperPhotos>
            {/* <Input onChange={(e) => setTextChange(e.target.value)} type="text" label="Nombre: " name="nombre" value={textChange} styles="
                align-self: center;
                width: 90%;
                overflow: auto;
            " ></Input> */}
            <WrapperForm1>
                <ProfileEditableForm
                    name="form1"
                    inputs={
                        [{
                            label:"Nombre: ",
                            name:"nombre",
                            type:"text",
                            value:username,
                            onChange:(e) => setUsername(e.target.value),
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
                            value:description,
                            onChange:(e) => setDescription(e.target.value),
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
                            name:"busca",
                            type:"select",
                            options:["chico", "chica", "no binario"],
                            typegen:lookingFor,
                            onChange:(e) => setLookingFor(e.target.value),
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
                                value:distance,
                                range:{min:0,max:100},
                                step:10,
                                start:[props.user.distance],
                                onChange:() => {
                                    let pe = document.getElementsByClassName("noUi-handle")[0];
                                    /* console.log(parseInt(pe.getAttribute("aria-valuetext"))) */
                                    setDistance(parseInt(pe.getAttribute("aria-valuetext")));
                                },
                                styles:"width:20%;"
                            }]
                        }
                        styles="height:5%; align-items:center; width:18vw; margin-bottom:5vh;"
                    />
                    <br></br>
                    <ProfileEditableForm
                        name="form1"
                        inputs={
                            [{
                                label:"Edad",
                                name:"age",
                                type:"range",
                                value:lower_age_range+" - "+upper_age_range,
                                range:{min:18,max:50},
                                step:1,
                                start:[profileUser.lower_age_range,profileUser.upper_age_range],
                                onChange:() => {
                                    let pe = document.getElementsByClassName("noUi-handle")[1];
                                    /* console.log(parseInt(pe.getAttribute("aria-valuetext"))) */
                                    setLower_age_range(parseInt(pe.getAttribute("aria-valuetext")));
                                    let pe2 = document.getElementsByClassName("noUi-handle")[2];
                                    /* console.log(parseInt(pe.getAttribute("aria-valuetext"))) */
                                    setUpper_age_range(parseInt(pe2.getAttribute("aria-valuetext")));
                                },
                                styles:"width:20%;"
                            }]
                        }
                        styles="height:5%; align-items:center; width:20vw;"
                    />
                    
                </WrapperForm2_2>
            </WrapperForm2>
            <ProfileEditableForm
                name="form1"
                inputs={
                    [{
                        label:"Guardar cambios",
                        name:"submit",
                        type:"submit",
                        fun: () => {
                            Save();
                            SaveJS();
                        },
                        styles:"width:20%;"
                    }]
                }
                styles="height:10%; align-items:center; width:20vw;"
            />
            
            <WrapperTastes>
                {loadTastes(props)}
            </WrapperTastes>
        </Wrapper>
    );
};

export default ProfileEditable;