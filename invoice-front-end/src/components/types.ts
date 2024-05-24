export interface InvoiceType {
  id: string;
  number: number;
  userId: string;
  total: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  products: Product[];
  isNew?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
