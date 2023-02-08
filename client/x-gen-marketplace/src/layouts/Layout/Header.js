import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { equals, isEmpty, isNil } from 'ramda'
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AppActions from '../../actions/app';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      background: '#FFAD32'
    },
    logo: {
      textDecoration: "none",
      color: "White",
      "&:hover": {
        color: fade(theme.palette.common.white, 0.75),
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionProfile: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  })
);

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubscribedApps = () => {
    setAnchorEl(null);
    props.history.push('subscribes')
  }

  const handleLogout = async () => {
    await setAnchorEl(null);
    await Auth.signOut();
    await props.logout();
  }

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSubscribedApps}>My Apps</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              className={classes.logo}
            >
              X-Gen Marketplace
            </Link>
          </Typography>
          <div className={classes.root} />
          {props.isAuthenticated ? (
            <div className={classes.sectionProfile}>
              <IconButton
                aria-label="account of current user"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/auth">Login</Button>
          )}
          {renderMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.app.isAuthenticated,
  token: state.app.token,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AppActions.logoutRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
