import React from 'react';
import {
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import * as types from "../../../types";
import * as hooks from "../hooks";
import { AppContext } from "../context";

interface IState {
  open: boolean;
  currentNotification?: types.SNotification;
}

export const NotificationsContainer: React.FC = () => {
  const [state, setState] = hooks.useCompositeState<IState>({
    open: false,
    currentNotification: undefined,
  });
  const ctx = React.useContext(AppContext);

  const handleClose = React.useCallback((_: any) => {
    setState({ open: false });
  }, [setState]);


  React.useEffect(() => {
    const handler = ((sn: types.SNotification) => {
      setState({
        open: true,
        currentNotification: sn,
      });
    });

    ctx.service.onNotification(handler);

    return () => {
      ctx.service.offNotification(handler);
    };
  }, [setState]);


  const severity = state.open ? state.currentNotification!.type : undefined;
  const message = state.open ? state.currentNotification!.message : "";

  return (
      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={severity}
          onClose={handleClose}
          children={message}
        />
      </Snackbar>
  );
};
