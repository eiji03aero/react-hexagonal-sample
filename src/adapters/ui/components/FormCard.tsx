import React from "react";
import {
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
});

interface IProps {
  label: string;
  placeholder: string;
  size: "small" | "medium";
  onSubmit(value: string): void;
}

export const FormCard: React.SFC<IProps> = ({
  label,
  placeholder,
  size,
  onSubmit
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const handleSubmit = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }

    const { value } = inputRef.current;
    inputRef.current.value = "";
    onSubmit(value);
  }, [onSubmit]);

  return (
    <Paper elevation={3} className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          label={label}
          placeholder={placeholder}
          size={size}
          fullWidth
        />
      </form>
    </Paper>
  );
};
