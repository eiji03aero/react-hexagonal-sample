import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core";

import * as types from "../../../types";
import { local } from "../../../graphql";
import { AppContext } from "../context";
import { FormCard, TodoCard, TagFilterCard } from "../components";
import { useCompositeState } from "../hooks";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  form: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    "& > *": {
      marginBottom: 8,
    },
  },
});

interface IState {
  keyword: string;
  tagIds: string[];
  sort: string;
}

export const Todos: React.FC = () => {
  const ctx = React.useContext(AppContext);
  const [state, setState] = useCompositeState<IState>({
    keyword: "",
    tagIds: [] as string[],
    sort: "desc",
  });
  const classes = useStyles();
  const todosResult = useQuery(local.GetTodosDocument, {
    variables: {
      keyword: state.keyword,
      tagIds: state.tagIds,
      sort: state.sort,
    }
  });
  const tagsResult = useQuery(local.GetTagsDocument, {
    variables: {}
  });

  const handleCreate = React.useCallback((value: string) => {
    ctx.service.createTodo({
      title: value,
    });
  }, [ctx]);

  const handleSubmitFilter = React.useCallback((params: { keyword: string, tagIds: string[], sort: string }) => {
    setState(params);
  }, [setState]);

  const handleChangeDone = React.useCallback((t: types.STodo) => {
    ctx.service.updateTodo(t.id, {
      done: !t.done,
    });
  }, [ctx]);

  const handleUpdateTagIds = React.useCallback((params: { id: string, tagIds: string[] }) => {
    ctx.service.updateTodo(params.id, { tagIds: params.tagIds });
  }, [ctx]);

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <FormCard
          label="Create new"
          placeholder="Hit enter to submit"
          size="medium"
          onSubmit={handleCreate}
        />
      </div>

      <div className={classes.form}>
        <TagFilterCard
          tags={tagsResult.data.tags}
          onSubmit={handleSubmitFilter}
        />
      </div>

      <div className={classes.list}>
        {todosResult.data.todos.map((todo: types.STodo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            tags={tagsResult.data.tags}
            onChangeDone={(_: any) => handleChangeDone(todo)}
            onUpdateTagIds={handleUpdateTagIds}
          />
        ))}
      </div>
    </div>
  );
};
