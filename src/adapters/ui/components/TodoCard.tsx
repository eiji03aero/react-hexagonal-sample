import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { STodo } from "../../../types";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  content: {
    display: "flex",
  },
  side: {},
  main: {
    flex: 1,
    position: "relative",
    padding: 8,
  },
  title: {
    fontSize: 16,
  },
  date: {
    position: "absolute",
    bottom: 0,
    right: 8,
    fontSize: 12,
  },
});

interface IProps {
  todo: STodo;
  onChangeDone(e: React.SyntheticEvent): void;
}

export const TodoCard: React.SFC<IProps> = ({
  todo,
  onChangeDone,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.side}>
          <Checkbox
            checked={todo.done}
            onChange={onChangeDone}
          />
        </div>
        <div className={classes.main}>
          <Typography variant="h5" component="h2">
            { todo.title }
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            { todo.updatedAt}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
