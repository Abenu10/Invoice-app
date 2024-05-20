
import styles from './page.module.css';
import Switch from '@mui/material/Switch';

const label = {inputProps: {'aria-label': 'Switch demo'}};
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@material-ui/core';
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Head from 'next/head';
import RootLayout from 'app/layout';


const Invoice: NextPage = () => {
    const invoiceData = [
    {
      id: 1,
      number: 123,
      dueDate: '2022-12-31',
      status: 'Paid',
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
        },
        {
          id: 2,
          name: 'Product 2',
          price: 200,
        },
      ],
      total: 300,
    },
    // add more invoices as needed
  ];
  // <div className={styles.container}>
  //   <div>
  //     <span>With default Theme:</span>
  //   </div>
  //   <Switch {...label} defaultChecked />
  //   <Switch {...label} />
  //   <Switch {...label} disabled defaultChecked />
  // </div>
  return (
    <RootLayout>
      <Head>
        <title>Invoices</title>
      </Head>
      <div>
        {invoiceData.map((invoice) => (
          <Paper key={invoice.id}>
            <Typography variant='h6'>Invoice #{invoice.number}</Typography>
            <Typography variant='body1'>
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </Typography>
            <Typography variant='body1'>Status: {invoice.status}</Typography>
            <Typography variant='body1'>
              User: {invoice.user.name} ({invoice.user.email})
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align='right'>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align='right'>{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant='h6'>Total: {invoice.total}</Typography>

            <Button variant='contained' color='primary'>
              Add a Product
            </Button>
          </Paper>
        ))}
      </div>
    </RootLayout>
  );
}

export default Invoice
