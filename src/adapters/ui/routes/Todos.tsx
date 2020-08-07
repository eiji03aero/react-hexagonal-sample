import React from "react";
import { useQuery } from "@apollo/client";
import {
  Paper,
  TextField,
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
  form: {
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ctx = React.useContext(AppContext);
  const classes = useStyles();
  const { data } = useQuery(local.GetTodosDocument, {
    variables: {
      sort: "desc"
    }
  });

  const handleCreate = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const title = inputRef.current.value;
    inputRef.current.value = "";
    ctx.service.createTodo({
      title,
    });
  }, [ctx]);

  const handleChangeDone = React.useCallback((t: types.STodo) => {
    ctx.service.markTodoDone({
      id: t.id,
      done: !t.done,
    });
  }, [ctx]);

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.form}>
        <form noValidate autoComplete="off" onSubmit={handleCreate}>
          <TextField
            inputRef={inputRef}
            label="Create new"
            placeholder="Hit enter to submit"
            size="medium"
            fullWidth
          />
        </form>
      </Paper>

      <div className={classes.list}>
        {data.todos.map((todo: types.STodo) => (
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
