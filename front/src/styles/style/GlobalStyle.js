import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import reset from "styled-reset";
import "../fonts/fonts.css";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  #root {
    height: 100%;

  }

  html, body {
    position: relative;
    height: 100%;
    font-family: 'jua';
    word-break: keep-all;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    color:white;
  }
  
  body::-webkit-scrollbar {
    display: none;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const bgScale = keyframes`
  from{
    transform: scale(1);
  }
  to {
    transform: scale(0.5);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.back &&
    css`
      position: relative;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        z-index: -1;
        background: url(${props.back}) no-repeat;
        background-size: cover;
        transform: scale(0.5);
        animation: ${bgScale} 1s;
      }
    `}
`;
