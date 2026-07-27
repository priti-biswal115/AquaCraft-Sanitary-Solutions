import axios from "axios";

import { BASE_URL } from "./baseUrl";

const API_URL = `${BASE_URL}/CustomerPricing`;

export const getCustomerPricing = async (
    customerId
) => {
    const response = await axios.get(
        `${API_URL}/${customerId}`
    );

    return response.data;
};

export const getPricing = async () => {
    const response = await axios.get(API_URL);

    return response.data;
};

export const createPricing = async (
    pricing
) => {
    const response = await axios.post(
        API_URL,
        pricing
    );

    return response.data;
};

export const updatePricing = async (
    id,
    pricing
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        pricing
    );

    return response.data;
};

export const deletePricing = async (
    id
) => {
    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};