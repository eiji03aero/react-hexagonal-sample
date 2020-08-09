import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import * as types from "../../../types";

const useStyles = makeStyles({
  root: {
    width: 280,
    height: 160,
  },
  color: {
    height: 80,
  },
  content: {
    position: "relative",
    height: 80,
    padding: 16,
  },
  date: {
    position: "absolute",
    bottom: 8,
    right: 8,
    fontSize: 12,
  },
});

interface IProps {
  tag: types.STag;
}

export const TagCard: React.SFC<IProps> = ({
  tag,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div
        className={classes.color}
        style={{ background: tag.color }}
      />

      <div className={classes.content}>
        <Typography variant="h5" component="h2">
          { tag.name }
        </Typography>

        <Typography className={classes.date} color="textSecondary">
          { tag.updatedAt}
        </Typography>
      </div>
    </Card>
  );
};
