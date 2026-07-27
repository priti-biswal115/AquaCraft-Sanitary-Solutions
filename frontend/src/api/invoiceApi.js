// API functions for invoice-related operations will be implemented here.
import axios from "axios";

import { BASE_URL } from "./baseUrl";

const INVOICE_API_URL = `${BASE_URL}/Invoices`;

export const getInvoices = async () => {
  try {
    const response = await axios.get(INVOICE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${INVOICE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
};

export const getInvoiceByNumber = async (invoiceNumber) => {
  try {
    const response = await axios.get(
      `${INVOICE_API_URL}/number/${invoiceNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice by number:", error);
    throw error;
  }
};

export const getCustomerInvoices = async (customerId) => {
  try {
    const response = await axios.get(
      `${INVOICE_API_URL}/customer/${customerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    throw error;
  }
};

export const saveInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${INVOICE_API_URL}/save`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error saving invoice:", error);
    throw error;
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(INVOICE_API_URL, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(
      `${INVOICE_API_URL}/${id}`,
      invoiceData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${INVOICE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};
