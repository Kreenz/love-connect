import React, { useEffect, useState} from "react"
import styled from "styled-components";

import ProfileEditableForm from "./ProfileEditableForm/ProfileEditableForm";
import ProfileEditablePhoto from "./ProfileEditablePhoto/ProfileEditablePhoto";
import ProfileEditablePhotoButton from "./ProfileEditableButtons/ProfileEditablePhotoButton";

import Input from '../../../Shared/Formulario/Input';

import Delete from '../../../../Assets/Images/Icons/delete_sign.png';

const Wrapper = styled.div`
    background-color: #14557b;
    color:white;
    width:100%;
    height:100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left:15.6vw;
    min-height: 100%;
    overflow-y: auto;
`;

const WrapperPhotos = styled.div`
    background-color: #14557b;
    border-top-left-radius:2vh;
    display: flex;
    flex-direction: row;
    width: 100%;
    
`;

const WrapperPhotosElements = styled.div`
    background-color: #f5f5f5;
    border-bottom-right-radius:2vh;
    display: flex;
    flex-direction: row;
    width: 100%;  
    overflow-y: auto;
`

const WrapperPhotosEdit = styled.div`
    background-color: #20bf55;
    background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
    border-radius:0.5vh;
    display: flex;
    flex-direction: row;
    height: 8vw;
    width: 6vw;
    margin-top: 2vh;
    margin-bottom: 3vh;
    margin-left: 1vw;
    justify-content: center;
    margin-right: 1vw;
    transition: 0.5s box-shadow ease-in-out;
`;

const HoverPhotos = styled.div`
    width:fit-content;
    height:fit-content;
    &:hover ${WrapperPhotosEdit} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`;

const WrapperForm1 = styled.div`
    display: flex;
    justify-content:center;
`;

const WrapperForm2 = styled.div`
    display: flex;
    justify-content:space-around;
    width:100%;
`;

const WrapperForm2_2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
`;

const WrapperTastes = styled.div`
    height: 17vh;
    min-height: 17vh;
    overflow-y: auto;
    align-items: center;
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left:10%;
`;

const WrapperTastesEdit = styled.button`
    height: 100%;
    width: 100%;
    opacity:0;
    margin-left: 0.3vw;
    margin-right: 0.3vw;
    outline: none;
    border: none;
    border-radius: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor:pointer;
    outline:none;
`;

const Icon = styled.image`
    height: 100%;
    width: 100%;
    background: url(/static/media/delete_sign.c8575d6f.png) no-repeat center;
    background-size:60%;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items:center;
`;

const WrapperDIVTastes = styled.div`
    height: 30%;
    width: 30%;
    outline: none;
    border: none;
    border-radius: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TastesSectionWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    width:100%;
`

const TastesTitle = styled.span`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    width:82%;
    margin-left:9%;
    border-bottom: 0.4vh solid white;
    padding-bottom: 1vh;
    margin-bottom:2vh;
`;

const ProfileEditable = (props) => {
    const [username, setUsername] = useState(props.user.username);
    const [description, setDescription] = useState(props.user.description);
    const [lookingFor, setLookingFor] = useState(props.user.lookingFor);
    const [gender, setGender] = useState(props.user.gender);
    const [distance, setDistance] = useState(props.user.distance);
    const [upper_age_range, setUpper_age_range] = useState(props.user.upper_age_range);
    const [lower_age_range, setLower_age_range] = useState(props.user.lower_age_range);
    const [tastes, setTastes] = useState(props.user.tastes);
    const [profileUser, setProfileUser] = useState({
        userId: null,
        username: "Pablo",
        description: "Me gusta ser un chico otaku",
        email:"pabloceballos@hotmail.com",
        age:23,
        distance:11,
        recent:null,
        gender:"chico",
        lookingFor:"Heterosexual",
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
            gender:gender,
            lookingFor:lookingFor,
            localitzation:props.user.localitzation,
            tastes:tastes,
            photos:props.user.photos,
            upper_age_range:upper_age_range,
            lower_age_range:lower_age_range,
            karma: props.user.karma
        }
        props.setUser(currentUser);
    }

    const add = () =>{
        let components = tastes;
        components.push("");
        setTastes(components);
        return loadTastes();
    }


    /* console.log(props); */
    const loadPhotos = (props) => {
        console.log(props)
        let components = [];
        for(let i = 0; i < props.user.photos.length; i++){
            components.push(
                <ProfileEditablePhoto db={props.db} user={props.user.photos[i]} userId={props.user.userId} setUser={props.setUser} userFinal={props.user}/>           
            )
        }

        return components; 
    }


    const loadTastes = () => {
        /* console.log(profileUser.tastes.length) */
        let components = [];
        
        tastes.forEach(taste => {
            components.push(
                <WrapperDIVTastes>
                    <Input type={"text"} name={"tast"} value={taste} styles="
                        border: none;
                        border-radius: 3vh;
                        width: 8vw;
                        height: 4vh;
                        text-align: center;
                        align-items: center;
                        font-size: 2vh;
                        color: black;
                        outline:none;
                    "
                    onChange={(e) => {
                        let newTaste = [];
                        let form = document.getElementsByName("tast");
                        console.log("inputs");
                        console.log(form[0]);
                        form.forEach(tast => {
                            if(tast.value != e.target.value){
                                newTaste.push(tast.value);
                            }
                            else {newTaste.push(e.target.value);}
                        })
                        setTastes(newTaste)
                    }}/>
                    <Icon src={Delete}>
                        <WrapperTastesEdit name={taste} 
                        onClick={(e) => {
                            let newTaste = [];
                            tastes.forEach(tast => {
                                if(tast != e.target.name){
                                    newTaste.push(tast);
                                }
                            })
                            setTastes(newTaste);
                            SaveJS();
                        }}/>
                    </Icon>
                </WrapperDIVTastes>
            )
        });

        return components; 
    }

    const Save = () => {
        let updates = {
            nombre:username,
            descripcion:description,
            busca:lookingFor,
            genero:gender,
            distancia:distance,
            rango_edad_mayor:upper_age_range,
            rango_edad_menor:lower_age_range,
            tastes:tastes
        }
        props.db.collection("perfiles").doc(props.user.userId).update(updates);
    }

    useEffect(() => {
        /* console.log(props); */
        //console.log(props.db.collection("perfiles"));
        //buscas en la base de datos el usuario en base al userId que te pasan por los props
        /* if(props.db.collection("perfiles").where("uid", "==", props.user.uid)){
            console.log(props.user.uid)
        } */
        document.getElementsByName("busca")[0].value = lookingFor;
        document.getElementsByName("gen")[0].value = gender;
        let currentUser = {
            userId: props.user.userId,
            username: username,
            description: description,
            email:props.user.email,
            age:props.user.age,
            distance:distance,
            recent:props.user.recent,
            gender:gender,
            lookingFor:lookingFor,
            tastes:props.user.tastes,
            photos:props.photos,
            upper_age_range:upper_age_range,
            lower_age_range:lower_age_range
        }
        if(profileUser.userId == null) setProfileUser(currentUser);
    });

    return (
        <Wrapper>
            <WrapperPhotos>
                
                <WrapperPhotosElements>
                    {loadPhotos(props)}
                </WrapperPhotosElements>
                <HoverPhotos>
                    <WrapperPhotosEdit>
                        <ProfileEditablePhotoButton user={props.user} db={props.db} setUser={props.setUser}/>
                    </WrapperPhotosEdit>
                </HoverPhotos>

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
                            styles:"width:100%;font-size:2.2vh;outline:none;"
                        },
                        {
                            label:"Descripción: ",
                            name:"descripcion",
                            type:"text",
                            value:description,
                            onChange:(e) => setDescription(e.target.value),
                            styles:"width:100%;font-size:2.2vh;outline:none;"
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
                            label:"Orientación Sexual: ",
                            name:"busca",
                            type:"select",
                            options:["Heterosexual", "Homosexual", "Bisexual"],
                            typegen:lookingFor,
                            onChange:(e) => setLookingFor(e.target.value),
                            styles:"width:100%; font-size:2.2vh;outline:none;"
                        },
                        {
                            label:"Genero: ",
                            name:"gen",
                            type:"select",
                            options:["chico", "chica", "no binario"],
                            typegen:gender,
                            onChange:(e) => {setGender(e.target.value);console.log(e.target.value)},
                            styles:"width:100%; font-size:2.2vh;outline:none;"
                        }
                    ]
                    }
                    styles={"width:10vw; height:10vh;align-items:center;"}
                    setNextUserMatchList={props.setNextUserMatchList}
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
                                step:1,
                                start:[props.user.distance],
                                onChange:() => {
                                    let pe = document.getElementsByClassName("noUi-handle")[0];
                                    /* console.log(parseInt(pe.getAttribute("aria-valuetext"))) */
                                    setDistance(parseInt(pe.getAttribute("aria-valuetext")));
                                },
                                styles:"width:6vw; align-items:center;outline:none;"
                            }]
                        }
                    />
                    <ProfileEditableForm
                        name="form1"
                        inputs={
                            [{
                                label:"Edad",
                                name:"age",
                                type:"range",
                                value:lower_age_range+" - "+upper_age_range,
                                range:{min:18,max:100},
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
                                styles:"width:6vw; align-items:center;font-size:2.2vh;outline:none;"
                            }]
                        }
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
                        styles:"width:20%;font-size:2.2vh;outline:none;"
                    }]
                }
                styles="height:10%; align-items:center; margin-top:5vh;"
            />

            <TastesSectionWrapper>
                <TastesTitle>
                    Gustos
                </TastesTitle>
                <WrapperTastes>
                    {console.log(tastes)}
                    {loadTastes()}
                    <Input type={"submit"} name={"tastes"} value={"Añadir"} styles="
                        border: none;
                        border-radius: 0.5vh;
                        display:flex;
                        align-items:center;
                        width: 6vw;
                        height: 4vh;
                        text-align: center;
                        align-items: center;
                        font-size: 2vh;
                        background-color: #20bf55;
                        background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
                        cursor:pointer;
                        transition: box-shadow 0.2s ease-in;
                        color: white;
                        margin-left:2vh;
                        outline:none;
                    "
                    onClick={() => {add();SaveJS();}}/>
                </WrapperTastes>
            </TastesSectionWrapper>
        </Wrapper>
    );
};

export default ProfileEditable;