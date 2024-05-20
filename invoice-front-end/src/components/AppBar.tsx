import React from 'react';
import AppBar as Navbar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import SignInButton from './SignInButton';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});
const AppBar = () => {
   const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <Button color="inherit">Home Page</Button>
            </Link>
            <Link href="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>
          </Typography>
          <SignInButton />
        </Toolbar>
      </Navbar>
    </div>
  );
};

export default AppBar;
