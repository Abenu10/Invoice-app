// "use client"
// import styles from './page.module.css';
// import Switch from '@mui/material/Switch';

// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// import {makeStyles} from '@material-ui/core/styles';
// import Link from 'next/link';

// // const label = {inputProps: {'aria-label': 'Switch demo'}};
// //

// // import {
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// //   Button,
// //   TextField,
// // } from '@material-ui/core';
// import {css} from '@emotion/react';
// import SignInButton from '@components/SignInButton';
// import {MuiDrawer} from '@components/MuiDrawer';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
//   title: {
//     flexGrow: 1,
//   },
// });
// import {Drawer, Box, Typography, IconButton} from '@mui/material';
// import MenuIcon from '@material-ui/icons/Menu';
// import {useState} from 'react';
// // import Invoice from '@components/Invoice';
// import InvoiceList from '@components/InvoiceList';
// export default async function Home() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   // const classes = useStyles();
//   // return (
//   //   <div className={classes.root}>
//   //     <AppBar color='secondary'>
//   //       <Toolbar>
//   //         <Typography variant='h6' className={classes.title}>
//   //           <Link href='/'>
//   //            Home Page
//   //           </Link>
//   //           <Link href='/dashboard'>
//   //             Dashboard
//   //           </Link>
//   //           <Link href='/invoice/123'>
//   //             InvoiceDetail
//   //           </Link>
//   //         </Typography>
//   //         <SignInButton />
//   //       </Toolbar>
//   //     </AppBar>
//   //   </div>
//   // );

//   return (
//     // <>

//     //   <MuiDrawer />
//     // </>
//     <>
//       <IconButton
//         size='large'
//         edge='start'
//         color='inherit'
//         arial-label='logo'
//         onClick={() => setIsDrawerOpen(true)}
//       >
//         <MenuIcon />
//       </IconButton>
//       <Drawer
//         anchor='left'
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//       >
//         <Box p={2} width='250px' textAlign='center' role='presentation'>
//           <Typography variant='h6' component='div'>
//             Side Panel
//           </Typography>
//         </Box>
//       </Drawer>
//       <InvoiceList />
//       {/* <Invoice /> */}
//     </>
//   );
// }

import {getInvoices} from '@lib/invoices';
import InvoiceList from '@components/InvoiceList';
import Invoice from '@components/Invoice';
import {InvoiceType} from '@components/types';
import InvoiceTable from '@components/InvoiceTable';

export default async function InvoicePage() {
  let invoices: InvoiceType[] = [];
  // let isLoading = true;

  try {
    invoices = await getInvoices();
    // isLoading = false;
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }

  return <InvoiceTable invoices={invoices} />;
}
//   const invoices: InvoiceType[] = await getInvoices();
//   console.log(invoices)

//   return (
//     <div>
//       {invoices.map((invoice) => (
//         <Invoice key={invoice.id} invoice={invoice} />
//       ))}
//     </div>
//   );
// }
// function to add two nubers
