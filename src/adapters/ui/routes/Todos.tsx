import React from "react";
import { useQuery } from "@apollo/client";
import {
  Typography,
  makeStyles,
} from "@material-ui/core";

import * as types from "../../../types";
import { AppContext } from "../context";
import { TodoCard } from "../components";
import { local } from "../../../graphql";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  title: {
    margin: 16,
  },
  list: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    "& > *": {
      marginBottom: 8,
    },
  },
});

export const Todos: React.FC = () => {
  const ctx = React.useContext(AppContext);
  const classes = useStyles();
  const { data } = useQuery(local.GetLocalStateDocument);

  const handleChangeDone = React.useCallback((t: types.STodo) => {
    ctx.service.markTodoDone({
      id: t.id,
      done: !t.done,
    });
  }, [ctx]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Todos page aqui
      </Typography>

      <div className={classes.list}>
        {data.localState.todos.map((todo: types.STodo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onChangeDone={(_: any) => handleChangeDone(todo)}
          />
        ))}
      </div>
    </div>
  );
};
