'use client';
import React from 'react';
import { InvoiceType } from './types';
import Invoice from './Invoice';

const InvoiceList = ({ invoices }: { invoices: InvoiceType[] }) => {
  return (
    <div>
      {invoices.map((invoice) => (
        <Invoice key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default InvoiceList;