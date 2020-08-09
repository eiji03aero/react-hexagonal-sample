import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
});

interface IProps {
  name: string;
  color: string;
}

export const Tip: React.SFC<IProps> = ({
  name,
  color,
}) => {
  const classes = useStyles();

  return (
    <Typography
      component="span"
      variant="h5"
      className={classes.root}
      style={{ background: color }}
    >
      { name }
    </Typography>
  )
};
