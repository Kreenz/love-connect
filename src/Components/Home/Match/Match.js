import React, { useEffect, useState} from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import MatchMenu from "./MatchMenu";

const Wrapper = styled.div`
    ${props=>` 
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-items:center;
        height: 100vh;
        width: 80vw;
        ${props?.styles}
`}`

const InfoWrapper = styled.div`
    ${props =>`
    width:100%;
    display:flex;
    flex-direction:column;
`}`

const InfoData = styled.span`
    color:white;
    font-size:4vh;
    -webkit-text-stroke-width: 0.1vh;
    -webkit-text-stroke-color: black;
    margin-left: 1%;
`;

const MatchContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height: 100vh;
    width: 45vw;
`

const MatchProfileImg = styled.div`
    ${props=>`
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 45vw;
        height: 85vh;
        border-radius:2vh;
        background: url(${props.userImage}) no-repeat center;
        background-color: lightblue;
        background-size: 100% auto;
        ${props?.styles}
`}`

const Match = (props) => {
    const[ImgIndex, setImgIndex] = useState(0);
    const[nextUserMatchList, setNextUserMatchList] = useState([
      {
        userId: "",
        username: "",
        age:0,
        distance:0,
        recent:"",
        tastes:[],
        photos:["","",""]
      },
      {
        userId: "",
        username: "",
        age:0,
        distance:0,
        recent:"",
        tastes:[],
        photos:["","",""]
      }
    ])

    console.log(nextUserMatchList)
    
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
      if(nextUserMatchList.length === 0 && props.user.localitzation){

        setNextUserMatchList({user:"hola"},{user:"hola2"})
        const appUser = props.user;
        props.db
        .collection("perfiles")
        .where(firebase.firestore.FieldPath.documentId(), "!=", appUser.userId)
        .get()
        .then(snapshot => {
          let users = [];
          let size = 0;
          snapshot.forEach(user => {
            size++;
            let userDistance = PythagorasEquirectangular(user.data().posicion._lat, user.data().posicion._long, appUser.localitzation.lat, appUser.localitzation.long);
            if(appUser.distance >= userDistance && user.data().distancia >= userDistance) {
              //falta comprobar rango edad y que busca
              let photos = JSON.parse(user.data().fotos);
              
              users.push({
                userId: user.id,
                username: user.data().nombre,
                age:user.data().edad,
                distance:user.data().distancia,
                recent:user.data().reciente,
                tastes:[],
                photos:photos
              })
            }
            //ultimo de la lista, se tiene que optimizar esta mal hecho
            if(size === snapshot.size){
              //rellenas la lista con los posibles matches
              setNextUserMatchList([{
                user:"eres puto"
              }]);
              console.log(nextUserMatchList)
              if(props.userMatch.userId === null){
                //buscas al usuario en la pos 0;
                //
                console.log(nextUserMatchList[0])
                props.setNextUserMatch(nextUserMatchList[0]);
              }
            }
          })
        })

        
        //if(props.oldScreen === "match" && nextUserMatchList.length === 0) props.setScreen("nousers");

      }
    }, [nextUserMatchList.length, props.user.localitzation])    
      
      

    return (
        <Wrapper>
            <MatchContainer>
                <MatchProfileImg userImage={props.userMatch?.photos[ImgIndex]}>
                    <InfoWrapper>
                        <InfoData>{props.userMatch?.username}</InfoData>
                        <InfoData>{props.userMatch?.age} años</InfoData>
                        <InfoData>{props.userMatch?.distance} km</InfoData>
                    </InfoWrapper>
                    <MatchMenu 
                        userMatch={props.userMatch} 
                        user={props.user}
                        imgIndex={ImgIndex}
                        setImgIndex={setImgIndex} 
                        setUserMatch={props.setUserMatch}
                        setNextUserMatch={props.setNextUserMatch}
                        screen={props.screen}
                        setScreen={props.setScreen}
                        setOldScreen={props.setOldScreen}
                        />
                </MatchProfileImg>
            </MatchContainer>
        </Wrapper>
    );
};

export default Match;