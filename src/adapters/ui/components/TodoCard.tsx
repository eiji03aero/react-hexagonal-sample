import React from "react";
import {
  Card,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import * as types from "../../../types";
import { Tip } from "./Tip";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    padding: 16,
  },
  side: {},
  main: {
    flex: 1,
    position: "relative",
    padding: 8,
  },
  title: {
    marginBottom: 8,
  },
  tagsContainer: {
    display: "flex",
    width: "100%",
    paddingRight: 200,
  },
  tags: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "& > *": {
      marginRight: 4,
    },
  },
  tagsSelect: {
    width: 120
  },
  date: {
    position: "absolute",
    bottom: 0,
    right: 8,
    fontSize: 12,
  },
});

interface IProps {
  todo: types.STodo;
  tags: types.STag[];
  onChangeDone(e: React.SyntheticEvent): void;
  onUpdateTagIds(params: {
    id: string,
    tagIds: string[],
  }): void;
}

export const TodoCard: React.SFC<IProps> = ({
  todo,
  tags,
  onChangeDone,
  onUpdateTagIds,
}) => {
  const classes = useStyles();

  const handleChangeTags = React.useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    onUpdateTagIds({ id: todo.id, tagIds: e.target.value as string[] });
  }, [onUpdateTagIds]);

  return (
    <Card className={classes.root}>
      <div className={classes.side}>
        <Checkbox
          checked={todo.done}
          onChange={onChangeDone}
        />
      </div>
      <div className={classes.main}>
        <Typography variant="h5" component="h2" className={classes.title}>
          { todo.title }
        </Typography>
        <div className={classes.tagsContainer}>
          <div className={classes.tags}>
            {todo.tagIds.map((tid: string) => {
              const tag = tags.find((t: types.STag) => t.id === tid);
              if (!tag) {
                return null;
              }

              return (
                <Tip key={tid} name={tag.name} color={tag.color} />
              );
            })}
          </div>
          <Select
            classes={{
              root: classes.tagsSelect,
            }}
            value={todo.tagIds}
            multiple
            onChange={handleChangeTags}
          >
            {tags.map((t: types.STag) => (
              <MenuItem
                key={t.id}
                value={t.id}
                children={t.name}
              />
            ))}
          </Select>
        </div>
        <Typography className={classes.date} color="textSecondary">
          { todo.createdAt }
        </Typography>
      </div>
    </Card>
  );
};
