import React from "react";
import styled, { createGlobalStyle } from "styled-components";

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
  console.log(children);
    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </Root>
    );
  }
  
  export default Layout;