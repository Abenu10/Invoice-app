'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from '@mui/material';
import {InvoiceType} from './types';

interface InvoiceTableProps {
  invoices: InvoiceType[];
  // isLoading: boolean;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({invoices}) => {
  const columns = [
    'ID',
    'Number',
    'User',
    'Total',
    'Due Date',
    'Status',
    'Products',
  ];

  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000); // display skeleton for 2 seconds
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!showSkeleton
            ? invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>{invoice.user.name}</TableCell>
                  <TableCell>{invoice.total}</TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    {invoice.products.map((product) => product.name).join(', ')}
                  </TableCell>
                </TableRow>
              ))
            : Array.from({length: 5}).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, i) => (
                    <TableCell key={i}>
                      <Skeleton animation='wave' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
