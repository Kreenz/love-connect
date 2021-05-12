import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
  ${props=>`
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        align-items:center;
        justify-content:center;
        font-size: 2.5vh;
        width: 40vw;
        max-width:40vw;
        height:3vh;
        text-align: center;
        align-items: center;
        padding:0.2vw;
        ${props?.styles}
`}`

const ImageShow = styled.div`
    ${props=>`
        height:1vh;
        margin-left:0.3vw;
        margin-right:0.3vw;
        margin-bottom:0.3vh;
        cursor:pointer;
        border:0.1vh solid white;
        background-color: ${(props.imgIndex == props.currentIndex) ? "#2B2D2F" : "#eee"};
        ${props?.styles}
`}`

const ImageSlider = (props) => {

    const loadImagesPreview = (photos, setImgIndex, imgIndex) => {
        let views = [];
        for(let i = 0; i < photos.length; i++){
            views.push(
                <ImageShow imgIndex={imgIndex} currentIndex={i} styles={"width:" + 18/photos.length + "vw;"} onClick={() => {setImgIndex(i)} } />
            )
        }

        return views;
    }

    return (
        <Wrapper>
            {loadImagesPreview(props.userPhotos, props.setImgIndex, props.imgIndex)}
        </Wrapper>
    );
};

export default ImageSlider;