import React from "react";
import { Switch, Route } from "react-router-dom";

import { Top, Todos } from "./routes";
import { Layout } from "./Layout";

export const App: React.FC = ({

}) => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route exact path="/todos">
          <Todos />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Layout>
  );
};
