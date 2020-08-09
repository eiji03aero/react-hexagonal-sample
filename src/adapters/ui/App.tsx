import React from "react";
import { Switch, Route } from "react-router-dom";
import { Paper, makeStyles, Theme } from "@material-ui/core";

import { Top, Todos, Tags } from "./routes";
import { NotificationsContainer } from "./containers";
import { Layout } from "./Layout";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    background: theme.palette.background.default,
  }
}));

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Top />
          </Route>
          <Route exact path="/todos">
            <Todos />
          </Route>
          <Route exact path="/tags">
            <Tags />
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>

        <NotificationsContainer />
      </Layout>
    </Paper>
  );
};
