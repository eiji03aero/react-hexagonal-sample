import React from "react";
import {
  Card,
  Checkbox,
  Typography,
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
  tags: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginRight: 4,
    },
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
}

export const TodoCard: React.SFC<IProps> = ({
  todo,
  tags,
  onChangeDone,
}) => {
  const classes = useStyles();

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
        <Typography className={classes.date} color="textSecondary">
          { todo.updatedAt}
        </Typography>
      </div>
    </Card>
  );
};
