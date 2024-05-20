"use client"

import { Box, Link as MuiLink, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) 
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant='body1' color='primary'>
          {session.user.name}
        </Typography>
        <NextLink href="/api/auth/signout" passHref>
          <MuiLink color="primary">
            <Typography variant="body1">Sign Out</Typography>
          </MuiLink>
        </NextLink>
      </Box>
    );
  

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <NextLink href="/api/auth/signin" passHref>
        <MuiLink color="primary">
          <Typography variant="body1">Sign In</Typography>
        </MuiLink>
      </NextLink>
      <NextLink href="/signup" passHref>
        <MuiLink style={{ backgroundColor: 'green', color: 'lightgreen', padding: '8px', borderRadius: '4px' }}>
          <Typography variant="body1">Sign Up</Typography>
        </MuiLink>
      </NextLink>
    </Box>
  );
};

export default SignInButton;