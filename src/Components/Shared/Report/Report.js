import React, {useState} from "react"
import styled from "styled-components";
import ProfileEditableForm from "../../Home/Profile/ProfileEditable/ProfileEditableForm/ProfileEditableForm";

const Wrapper = styled.div`
    ${props=>`
        width:100%;
        height:100%;
        display:flex;
        justify-content:flex-end;
        ${props?.styles}
`}`;

const Reports = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background-color #20bf55;
        background-image linear-gradient(315deg, #20bf55 0%, #01baef 99%);
        transition: box-shadow 0.2s ease-in;
        width:1vh;
        height:1vh;
        border-radius:50%;
        color: white;
        font-size:4vh;
        font-weight:bold;
        border:0.3vh solid #01baef;
        cursor:pointer;
        margin-bottom: 0.2vh;
`}`;

const Wrapper2 = styled.div`
    ${props=>`
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0%;
        left: 0%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        background-color: rgba(128,128,128,0.7);
        display:${props.modal ? 'flex' : 'none'};
        ${props?.styles}
`}`;

const Wrapper2_2 = styled.div`
    ${props=>`
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0%;
        left: 0%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        background-color: rgba(128,128,128,0.7);
        display:${props.matchoff ? 'flex' : 'none'};
        ${props?.styles}
`}`;

const ColWrapper = styled.div`
    ${props => `
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        ${props.styles}
    `}

`

const DivConten = styled.div`
    width: 50vw;
    height: 50vh;
    background-color: #f5f5f5;
    font-size:2vh;      
    display:flex;
    border-radius:2vh;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Title = styled.h1`
    width: 100%;
    height: 10%;
    color:#14557b;
    margin-bottom:0px;
    margin-top:0px;
`;

const DivRow = styled.div`
    width: 100%;
    height: 20%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const PopUp = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        background-color: transparent;
        display:${props.pop ? 'flex' : 'none'};
        ${props?.stylos}
`}`;

const Button = styled.button`
    ${props=>`
        width:100%;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-size: calc(0.2px + 2vmin);
        margin-right: 0.5vh;
        width:7vw;
        height: 3.5vh;
        color:white;
        border:none;
        border-radius:0.2vh;
        background-color: #20bf55;
        background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
        cursor:pointer;
        ${props?.styles};
        ${props.active? "display:flex" : "display:none"};
`}`;

const HoverWrapper = styled.div`
  &:hover ${Button} {
    box-shadow 0 0 2vh #01baef;
    text-shadow: 0 0 0.3vh white;
  }
`

const Report = (props) => {
    const [modalForm,setModal] = useState(false);
    const [matchoff,setMatch] = useState(false);
    const [prop,setProp] = useState(false);
    const [lookingFor, setLookingFor] = useState("Leve");

    const FuncUser = () => {
        props.setIsUser(!props.isUser)
    }

    return (
        <Wrapper>
            <Wrapper2 modal={modalForm}>
                <DivConten>
                    <Title>Reporte de usuario</Title>
                    <ProfileEditableForm
                        name="form1"
                        inputs={
                            [{
                                label:"Reporte: ",
                                name:"busca",
                                type:"select",
                                options:["Leve", "Grave", "Muy grave"],
                                typegen:lookingFor,
                                onChange:(e) => setLookingFor(e.target.value),
                                styl:"color:black; width:20vw;",
                                styles:"width:100%; font-size:2.2vh;outline:none;"
                            }]
                        }
                        styles="width:95%; height:20vh;"
                    />
                    <DivRow>
                        <ProfileEditableForm
                            name="form1"
                            inputs={
                                [
                                {
                                    label:"Reportar",
                                    name:"submit",
                                    type:"submit",
                                    style2:"margin-bottom:0px;",
                                    fun: () => {
                                        const response = props.db.collection("perfiles");
                                        response.get().then(snapshot => {
                                            snapshot.forEach((doc) => {
                                                if(doc.data().correo == props.usermatch.email){
                                                    let karma;
                                                    if(lookingFor == "Leve"){
                                                        karma = {
                                                            karma:doc.data().karma-5
                                                        }
                                                    }
                                                    else if(lookingFor == "Grave"){
                                                        karma = {
                                                            karma:doc.data().karma-10
                                                        }
                                                    }
                                                    else if(lookingFor == "Muy grave"){
                                                        karma = {
                                                            karma:doc.data().karma-15
                                                        }
                                                    }
                                                    else{
                                                        karma = {
                                                            karma:doc.data().karma-5
                                                        }
                                                    }
                                                    props.db.collection("perfiles").doc(props.usermatch.userId).update(karma);
                                                }
                                            })
                                        });
                                        setModal(!modalForm);;
                                    }
                                }
                            ]
                            }
                            styles="width:25%; height:20vh;"
                        />
                        <ProfileEditableForm
                            name="form1"
                            inputs={
                                [
                                {
                                    label:"Cerrar",
                                    name:"close",
                                    type:"submit",
                                    style2:"margin-bottom:0px;",
                                    fun: () => {
                                        setModal(!modalForm);;
                                    }
                                }
                            ]
                            }
                            styles="width:30%; height:20vh;"
                        />
                    </DivRow>
                </DivConten>
            </Wrapper2>
            <Wrapper2_2 matchoff={matchoff}>
                <DivConten>
                    <Title>Estas seguro de quitar este match?</Title>
                    <DivRow>
                        <ProfileEditableForm
                            name="form1"
                            inputs={
                                [
                                {
                                    label:"Si",
                                    name:"submit",
                                    type:"submit",
                                    fun: () => {
                                        const response = props.db.collection("perfiles/"+props.user.userId+"/match_list").where("id_perfil", "==", props.usermatch.userId);
                                        response.get().then(snapshot => {
                                            snapshot.forEach((doc) => {
                                                console.log(doc.data())
                                                let useroff = {
                                                    like:false,
                                                    match:false
                                                }
                                                props.db.collection("perfiles/"+props.user.userId+"/match_list").doc(doc.id).update(useroff);

                                                const respons = props.db.collection("matches").doc(doc.data().id_chat).collection("messages");
                                                respons.get().then(snapshot => {
                                                    snapshot.forEach((doc) => {
                                                        props.db.collection("matches").doc(doc.id).delete();
                                                    })
                                                });

                                                props.db.collection("matches").doc(doc.data().id_chat).delete();
                                            })
                                        });
                                        
                                        const response2 = props.db.collection("perfiles/"+props.usermatch.userId+"/match_list").where("id_perfil", "==", props.user.userId);
                                        response2.get().then(snapshot => {
                                            snapshot.forEach((doc) => {
                                                console.log(doc.data())
                                                let useroff = {
                                                    like:false,
                                                    match:false
                                                }
                                                
                                                props.db.collection("perfiles/"+props.usermatch.userId+"/match_list").doc(doc.id).update(useroff);
                                                props.setScreen("match");
                                            })
                                        });
                                        setMatch(!matchoff);
                                    }
                                }
                            ]
                            }
                            styles="width:25%; height:20vh;"
                        />
                        <ProfileEditableForm
                            name="form1"
                            inputs={
                                [
                                {
                                    label:"No",
                                    name:"close",
                                    type:"submit",
                                    fun: () => {
                                        setMatch(!matchoff);
                                    }
                                }
                            ]
                            }
                            styles="width:30%; height:20vh;"
                        />
                    </DivRow>
                </DivConten>
            </Wrapper2_2>
            <Wrapper styles={props.styles + ";display:flex; flex-direction:row;"} onClick={() => {setProp(!prop)}}>
                <ColWrapper>
                    <PopUp pop={prop} stylos={props.stylos}>
                        {FuncUser}
                        <HoverWrapper>
                            <Button active={true} onClick={() => setModal(!modalForm)}>Report</Button>
                        </HoverWrapper>
                        <HoverWrapper>
                            {props.isUser ? null : <Button active={(props.oldScreen === "chat" || props.active)} onClick={() => setMatch(!matchoff)}>MatchOff</Button>}
                        </HoverWrapper>
                    </PopUp>
                </ColWrapper>
                <ColWrapper>
                    <Reports/>
                    <Reports/>
                    <Reports/>
                </ColWrapper>
            </Wrapper>
        </Wrapper>
    );
};

export default Report;