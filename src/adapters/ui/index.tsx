import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { App } from "./App";

import * as types from "../../types";
import { AppContext } from "./context";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

export const render = (params: {
  service: types.IService,
  apolloClient: types.CustomApolloClient,
  container: HTMLElement,
}) => {
  const context = {
    service: params.service,
  };

  ReactDOM.render(
    <AppContext.Provider value={context}>
      <ApolloProvider client={params.apolloClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>,
    params.container
  );
};
