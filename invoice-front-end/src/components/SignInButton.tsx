'use client';

import {Box, Link as MuiLink, Typography, Button} from '@material-ui/core';
import NextLink from 'next/link';
import {useSession} from 'next-auth/react';

const SignInButton = () => {
  const {data: session} = useSession();

  if (session && session.user)
    return (
      <Box display='flex' justifyContent='flex-end' alignItems='center'>
        <Typography variant='body1' color='primary'>
          {session.user.name}
        </Typography>
        <NextLink href='/api/auth/signout' passHref>
          <Button variant='contained' color='primary'>
            Sign Out
          </Button>
        </NextLink>
      </Box>
    );

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <NextLink href='/api/auth/signin' passHref>
        <Button variant='contained' color='primary'>

          Sign In
        </Button>
      </NextLink>
      <NextLink href='/signup' passHref>
        <Button variant='contained' color='secondary'>
          Sign Up
        </Button>
      </NextLink>
    </Box>
  );
};

export default SignInButton;
