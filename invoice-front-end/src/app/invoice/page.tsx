'use client';
import styles from './page.module.css';
import Switch from '@mui/material/Switch';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';

const label = {inputProps: {'aria-label': 'Switch demo'}};

import React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   TextField,
// } from '@material-ui/core';
import {css} from '@emotion/react';
import SignInButton from '@components/SignInButton';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});
export default function Page() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color='primary'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link href='/' passHref>
              <Button color='inherit'>Home Page</Button>
            </Link>
            <Link href='/dashboard' passHref>
              <Button color='inherit'>Dashboard</Button>
            </Link>
          </Typography>
          <SignInButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
