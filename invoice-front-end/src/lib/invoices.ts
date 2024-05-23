import axios from 'axios';
import { apiUrl } from './config';


const api = axios.create({
  baseURL: apiUrl,
});

export const getInvoices = async () => {
  const response = await api.get('/invoice');
  return response.data;
};

export const getInvoicesByUser = async (userId: string) => {
  const response = await api.get(`/invoice/user`, {
    params: {
      userId,
    },
  });
  return response.data;
};

export const getInvoiceById = async (id: string) => {
  const response = await api.get(`/invoice/${id}`);
  return response.data;
};

export const createInvoice = async (data: any) => {
  const response = await api.post('/invoice', data);
  return response.data;
};

export const updateInvoice = async (id: string, data: any) => {
  const response = await api.patch(`/invoice/${id}`, data);
  return response.data;
};

export const deleteInvoice = async (id: string) => {
  const response = await api.delete(`/invoice/${id}`);
  return response.data;
};

export const addProductToInvoice = async (invoiceId: string, data: any) => {
  const response = await api.put(`/invoice/${invoiceId}/add-product`, data);
  return response.data;
};

export const updateProduct = async (invoiceId: string, data: any) => {
  const response = await api.put(`/invoice/${invoiceId}/update-product`, data);
  return response.data;
};
