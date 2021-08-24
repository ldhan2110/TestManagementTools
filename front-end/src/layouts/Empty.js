import React from "react";
import styled, { createGlobalStyle } from "styled-components";
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
  max-width: 100%;
  margin: 0 auto;
  min-height: 100%;
`;

function Layout({ children }) {
    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        {children}
        <SnackBar/>
      </Root>
    );
  }
  
  export default Layout;