
// export default async function Invoice  ()  {
//     const res = await fetch('http://localhost:8000/invoice');
//   const data = await res.json();
//   return (
//     <div>
//       <h1>{data[0].id}</h1>;
//     </div>
//   )
// }


import React from 'react';
import { getInvoices } from 'app/api/invoice/invoices';
import {InvoiceType} from './types';

const Invoice = ({invoice}: {invoice: InvoiceType}) => {
  return (
    
    <div>
      <h2>Invoice {invoice.id}</h2>
      <p>Status: {invoice.status}</p>
      <p>Total: {invoice.total}</p>
    </div>
  );
};

export default Invoice;