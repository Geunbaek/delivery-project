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
    overflow: hidden;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-pagination {
    /* bottom: -10px !important; */
    color: solid black;
    /* background-color: black; */
    height: 100px;
    font-size: 30px;
    position: absolute;
    left : 80%;
    
    }

  .swiper-pagination-bullet{

    width: 30px;
    height: 30px;
    /* background-color: darkorange; */
  }
  .swiper-pagination-bullet-active {
    background-color: #862e9c;
    color: rgb(255, 255, 255);
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
  background: ${({ theme, color }) => theme.palette[color]};
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
        background-position: center;
        transform: scale(0.5);
        animation: ${bgScale} 2s;
      }
    `}
`;
