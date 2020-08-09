import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core";

import * as types from "../../../types";
import { AppContext } from "../context";
import { FormCard, TagCard } from "../components";
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
    marginBottom: 16,
  },
  content: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    "& > *": {
      marginBottom: 8,
      marginRight: 8,
    },
  },
});

export const Tags: React.FC = () => {
  const ctx = React.useContext(AppContext);
  const classes = useStyles();
  const { data } = useQuery(local.GetTagsDocument, {
    variables: {}
  });

  const handleCreate = React.useCallback((value: string) => {
    ctx.service.createTag({
      name: value,
    });
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

      <div className={classes.content}>
        <div className={classes.list}>
          {data.tags.map((tag: types.STag) => (
            <TagCard
              key={tag.id}
              tag={tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
