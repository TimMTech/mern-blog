import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }


  h1 {
    font-size: 2rem;
    text-align: center;
  }

  h3, h2{
    font-size: 1.3rem;
    text-align: center;
    
  } 

  h4{
    font-size: 1.2rem;
    font-weight: 800;
  }
  img {
    display: block;
    width: 100%;
  }
  button {
    font-size: 1rem;
    font-weight: 700;
    background-color: ${(props) => props.theme.body};
    padding: 0.5rem 2rem;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    
    
  }

 
  
`;
