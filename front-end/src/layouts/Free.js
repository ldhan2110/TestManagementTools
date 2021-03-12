import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from './Header/index';
import Footer from './Footer/index';
import SnackBar from '../components/SnackBar';
import { CssBaseline } from "@material-ui/core";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

const Root = styled.div`
  ${'' /* max-width: 520px;

  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%; */}
  max-width: 100%;
  margin: 0 auto;
  min-height: 100%;
`;

function Layout({ children }) {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Header/>
      {children}
      <SnackBar/>
      <Footer/>
    </Root>
  );
}

export default Layout;
