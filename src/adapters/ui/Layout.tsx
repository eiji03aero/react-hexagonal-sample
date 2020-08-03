import React from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  body: {
    minHeight: 0,
    flex: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Layout: React.FC = ({
  children,
}) => {
  const [state, setState] = React.useState({
    isDrawerOpen: false,
  });
  const classes = useStyles();
  const history = useHistory();

  const toggleDrawer = (open: boolean) => {
    setState({ isDrawerOpen: open });
  };

  const navigateTo = (path: string) => () => {
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={() => toggleDrawer(true)}>
            <MenuIcon style={{color: "white"}} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Hexagonal Sample
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={state.isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <div
          className={clsx(classes.list)}
          onClick={() => toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={navigateTo("/")}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Top" />
            </ListItem>

            <ListItem button onClick={navigateTo("/todos")}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <div className={classes.body}>
        { children }
      </div>
    </div>
  );
};
