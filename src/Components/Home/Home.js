import React, { useState, useEffect } from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import MatchList from "./MatchList/MatchList";
import Match from "./Match/Match";
import MatchEmpty from "./Match/MatchEmpty";
import Chat from "./Chat/Chat";
import Profile from "./Profile/Profile";
import Game from "./Game/Game";

import PhotoLogo from "../../Assets/Images/profileIcon.jpg";

const Wrapper = styled.div`
  ${props=>`
    display:flex;
    flex-direction:row;
    font-size: 2.5vh;
    background: white;
    height: 100vh;
    width: 100vw;
    text-align: center;
    align-items: center;
    background-color: #9eabe4;
    background-image: linear-gradient(315deg,#9eabe4 0%,#77eed8 74%);
    ${props?.styles}
`}`

const Home = (props) => {
  const[screen, setScreen] = useState("match");
  const[oldScreen, setOldScreen] = useState("match");
  const[chatMessages, setChatMessages] = useState([])
  const[nextUserMatchList, setNextUserMatchList] = useState([])
  const[localitzation, setLocalitzation] = useState(null);
  const[gameMatch,setGameMatch] = useState([]);


  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const getCoords = (pos) => {

    if(pos.coords.latitue !== props.user.localitzation?.lat || pos.coords.longitude !== props.user.localitzation?.long) {
      props.setUser({
        loggedIn: props.user.loggedIn,
        userId: props.user.userId,
        username: props.user.username,
        email: props.user.email,
        age: props.user.age,
        distance: props.user.distance,
        recent: props.user.recent,
        gender:props.user.gender,
        tastes:props.user.tastes,
        photos:props.user.photos,
        lookingFor: props.user.lookingFor,
        upper_age_range: props.user.upper_age_range,
        lower_age_range: props.user.lower_age_range,
        description: props.user.description,
        localitzation:{lat: pos.coords.latitude, long: pos.coords.longitude}
      })
      
      setLocalitzation({lat: pos.coords.latitude, long:pos.coords.longitude});

      props.db
      .collection("perfiles")
      .doc(props.user.userId)
      .update({
        posicion: new firebase.firestore.GeoPoint(pos.coords.latitude, pos.coords.longitude)
      })
    }
      
  }

  const errCoords = (err) => {
    console.log(err.message);
    setScreen("empty");
  }

  const Deg2Rad = (deg) => {
    return deg * Math.PI / 180;
  }

  const PythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // radius of earth
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d; 
  }

  useEffect(() => {
    loadScreen();
  }, [screen])

  useEffect(() => {
    if(!props.user.localitzation) navigator.geolocation.getCurrentPosition(getCoords, errCoords, options);
  }, [])

  useEffect(() => {
    const userDb = props.user;
    //console.log(nextUserMatchList);
    if(nextUserMatchList.length === 0 && userDb.localitzation !== null){
      const db = props.db
      let lookingFor = userDb.lookingFor === "no binario" ? ["chica", "chico"] : [userDb.lookingFor]; 
      db
      .collection("perfiles")
      .where("genero", "in", lookingFor)
      .orderBy("karma", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let distanceFromBetween = PythagorasEquirectangular(userDb.localitzation.lat, userDb.localitzation.long, doc.data().posicion._lat, doc.data().posicion._long);
          //Filtro distancia
          //console.log(distanceFromBetween, userDb.distance, doc.data().distance, "distancia");
          if(distanceFromBetween <= userDb.distance && distanceFromBetween <= doc.data().distancia) {
            //Filtro edad
            //console.log(doc.data().edad <= userDb.age + userDb.upper_age_range, doc.data().edad >= userDb.age - userDb.lower_age_range, "edad")
            if(doc.data().edad <= userDb.age + userDb.upper_age_range && doc.data().edad >= userDb.age - userDb.lower_age_range ) {
              //Filtro busca
              //console.log((doc.data().busca === userDb.gender || doc.data().busca === "no binario") && doc.id != userDb.userId, "busca")
              if((doc.data().busca === userDb.gender || doc.data().busca === "no binario") && doc.id != userDb.userId) {
                //console.log("Si hay perfil")
                db
                .collection("perfiles/" + userDb.userId + "/match_list")
                .where("id_perfil", "==", doc.id)
                .get()
                .then( exists => {
                  if(exists.size === 0) {
                    //Fotos de los matches quitados hasta que nos aseguremos que siempre sea una array;
                    //let photos = JSON.parse(doc.data().fotos);
                    let photos = ["","",""];
                    setNextUserMatchList(oldNextUserMatchList => [...oldNextUserMatchList, [doc.id,{
                      userId: doc.id,
                      username: doc.data().nombre,
                      email:doc.data().correo,
                      age:doc.data().edad,
                      distance: Math.round(distanceFromBetween),
                      recent:null,
                      gender:doc.data().genero,
                      lookingFor: doc.data().busca,
                      tastes:[],
                      photos:photos,
                      localitzation:{lat: doc.data().posicion._lat, long: doc.data().posicion._long},
                      upper_age_range:doc.data().rango_edad_mayor,
                      lower_age_range:doc.data().rango_edad_menor,
                      description: doc.data().descripcion
                    }]]);
                    
                  }
                })
              }
            }
          }
        })
      })

      //if(props.oldScreen === "match" && nextUserMatchList.length === 0) props.setScreen("nousers");
    }
  }, [nextUserMatchList.length, localitzation])

  //usuario mostrado en el perfil u otros lados
  const[userMatch, setUserMatch] = useState({
    userId: null,
    username: "",
    age:null,
    distance:null,
    recent:null,
    id_chat:null,
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo, "", "", ""]
  })

  

  const loadScreen = () => {
    let component = "";
    switch(screen){
      case "match":
          component = (props.user.localitzation != null) ?
                      <Match 
                        db={props.db} 
                        userMatch={userMatch}
                        setUserMatch={setUserMatch} 
                        user={props.user} 
                        screen={screen} 
                        setScreen={setScreen} 
                        setOldScreen={setOldScreen}
                        oldScreen={oldScreen}
                        nextUserMatchList={nextUserMatchList}
                        setNextUserMatchList={setNextUserMatchList}/>
                      :
                      null

          break;
      case "chat":
          component = <Chat db={props.db} gameMatch={gameMatch} setGameMatch={setGameMatch} setChatMessages={setChatMessages} chatMessages={chatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} screen={screen} setScreen={setScreen} setOldScreen={setOldScreen} oldScreen={oldScreen}/>
          break;
      case "profile":
          component = <Profile db={props.db} screen={screen} setScreen={setScreen} editable={userMatch.userId === props.user.userId} user={props.user} setUser={props.setUser} oldScreen={oldScreen} setOldScreen={setOldScreen}  userMatch={userMatch}/>
          break;
      case "game":
          component = <Game db={props.db} setChatMessages={setChatMessages} chatMessages={chatMessages} userMatch={userMatch} user={props.user}/>
          break;
      case "empty":
          component = <MatchEmpty />
          break;
      default:
          component = (props.user.localitzation != null) ?
          <Match 
            db={props.db} 
            userMatch={userMatch}
            setUserMatch={setUserMatch} 
            user={props.user} 
            screen={screen} 
            setScreen={setScreen} 
            setOldScreen={setOldScreen}
            oldScreen={oldScreen}
            nextUserMatchList={nextUserMatchList}
            setNextUserMatchList={setNextUserMatchList}/>
          :
          null
          break;
    }
    return component;
  }

  return (
    <Wrapper key={"black"}>
        <MatchList db={props.db} setChatMessages={setChatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} setUser={props.setUser} screen={screen} setScreen={setScreen}/>
        {loadScreen(userMatch, setUserMatch, chatMessages, screen, setScreen)}
    </Wrapper>
  );
};

export default Home;