import styled, { createGlobalStyle } from "styled-components";
import "../fonts/fonts.css";

export const GlobalStyle = createGlobalStyle`
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
    h1 {
      font-size: 28px;
    }
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

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
