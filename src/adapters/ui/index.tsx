import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App";

import { CustomApolloClient } from "../../types";

export const render = (params: {
  apolloClient: CustomApolloClient,
}) => {
  const container = document.querySelector("#app");
  if (!container) {
    return;
  }

  ReactDOM.render(
    <ApolloProvider client={params.apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
    container
  );
};
