import React from "react";
import {
  Button,
  InputLabel,
  FormControl,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import * as types from "../../../types";
import { useCompositeState } from "../hooks";

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  form: {
    display: "flex",
    "& > *": {
      marginRight: 16,
    },
  },
  tagSelect: {
    width: 200,
    flexShrink: 0,
  },
  sortSelect: {
    width: 80,
    flexShrink: 0,
  },
});

interface IProps {
  tags: types.STag[];
  onSubmit(params: {
    keyword: string,
    tagIds: string[],
    sort: string,
  }): void;
}

interface IState {
  keyword: string;
  selectedTagIds: string[];
  sort: string;
}

export const TagFilterCard: React.SFC<IProps> = ({
  tags,
  onSubmit,
}) => {
  const [state, setState] = useCompositeState<IState>({
    keyword: "",
    selectedTagIds: [] as string[],
    sort: "desc",
  });
  const classes = useStyles();

  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    onSubmit({
      keyword: state.keyword,
      tagIds: state.selectedTagIds,
      sort: state.sort,
    });
  }, [state, onSubmit]);

  const handleClear = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    const keyword = "";
    const tagIds = [] as string[];
    const sort = "desc";
    setState({
      keyword,
      selectedTagIds: tagIds,
      sort,
    });
    onSubmit({
      keyword,
      tagIds,
      sort,
    });
  }, [setState]);

  const handleChangeKeyword = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ keyword: e.target.value });
  }, [setState]);

  const handleChangeTags = React.useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    setState({ selectedTagIds: e.target.value as string[] });
  }, [setState]);

  const handleChangeSort = React.useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    setState({ sort: e.target.value as string });
  }, [setState]);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography component="h1" variant="h6">
        Filter todos
      </Typography>

      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={state.keyword}
          label="Input keyword"
          placeholder="eg) work, house..."
          size="medium"
          fullWidth
          onChange={handleChangeKeyword}
        />

        <FormControl className={classes.tagSelect}>
          <InputLabel
            id="tagSelect"
            children="Select tags"
          />
          <Select
            labelId="tagSelect"
            value={state.selectedTagIds}
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
        </FormControl>

        <FormControl className={classes.sortSelect}>
          <InputLabel
            id="sortSelect"
            children="Select sort"
          />
          <Select
            value={state.sort}
            onChange={handleChangeSort}
          >
            <MenuItem
              value="desc"
              children="Desc"
            />
            <MenuItem
              value="asc"
              children="Asc"
            />
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Filter
        </Button>
        <Button variant="contained" onClick={handleClear}>
          Reset
        </Button>
      </form>
    </Paper>
  );
};
