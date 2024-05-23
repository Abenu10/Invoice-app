import { getInvoiceById } from '@lib/invoices';

export default async function Page({ params }: { params: { id: string } }) {
  const invoice = await getInvoiceById(params.id);

  return (
    <div>
      <h1>Invoice {invoice.id}</h1>
      <p>Status: {invoice.status}</p>
      <p>Total: {invoice.total}</p>
    </div>
  );
}