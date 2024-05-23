'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';
import SignInButton from '@components/SignInButton';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function SideNav(props: Props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{backgroundColor: '#1976d2'}}>
      <Toolbar>
        <Typography variant='h5'>Invoice App</Typography>
      </Toolbar>
      <Divider />
<List>
  <ListItem disablePadding>
    <Button
      href="/"
      LinkComponent={Link}
      sx={{ 
        '&:hover': { backgroundColor: 'primary.light', boxShadow: 6 },
        m: 1,
        p: 2,
        borderRadius: 1,
        transition: '0.3s',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        textTransform: 'none',
        color: 'white',
        mb: 2, // Add margin-bottom for spacing
      }}
    >
      <HomeIcon sx={{ color: 'white', fontSize: 35, mr: 2 }} /> {/* Increase icon size */}
      <Typography variant="h6" sx={{ color: 'white' }}>Home</Typography> {/* Set text color to white */}
    </Button>
  </ListItem>
  <ListItem disablePadding>
    <Button
      href="/add-item"
      LinkComponent={Link}
      sx={{ 
        '&:hover': { backgroundColor: 'primary.light', boxShadow: 6 },
        m: 1,
        p: 2,
        borderRadius: 1,
        transition: '0.3s',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        textTransform: 'none',
        color: 'white',
        mb: 2, // Add margin-bottom for spacing
      }}
    >
      <AddBoxOutlinedIcon sx={{ color: 'white', fontSize: 35, mr: 2 }} /> {/* Increase icon size */}
      <Typography variant="h6" sx={{ color: 'white' }}>Add Item</Typography> {/* Set text color to white */}
    </Button>
  </ListItem>
  <ListItem disablePadding>
    <Button
      href="/profile"
      LinkComponent={Link}
      sx={{ 
        '&:hover': { backgroundColor: 'primary.light', boxShadow: 6 },
        m: 1,
        p: 2,
        borderRadius: 1,
        transition: '0.3s',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        textTransform: 'none',
        color: 'white',
        mb: 2, // Add margin-bottom for spacing
      }}
    >
      <AccountCircleOutlinedIcon sx={{ color: 'white', fontSize: 35, mr: 2 }} /> {/* Increase icon size */}
      <Typography variant="h6" sx={{ color: 'white' }}>Profile</Typography> {/* Set text color to white */}
    </Button>
  </ListItem>
</List>
      {/* <Divider /> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar color='inherit'>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}} // Correct display
            // sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} // Correct display
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow: 1}}>
            {/* <Typography variant="h6" noWrap component="div">
          <Link href='/' passHref>
              <Button color='inherit'>Home Page</Button>
            </Link>
          
          <Link href='/dashboard' passHref>
              <Button color='inherit'>Dashboard</Button>
            </Link>
          </Typography> */}
          </Box>
          <SignInButton />
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1976d2',
              color: 'white',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1976d2',
              color: 'white',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
  component="main"
  sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
>
  <Toolbar />
  <Typography paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    temporper morbi tincidunt. Lorem donec massa
    sapien faucibus et molestie ac.
  </Typography>
</Box> */}
    </Box>
  );
}
