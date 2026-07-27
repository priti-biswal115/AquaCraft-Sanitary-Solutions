import axios from "axios";

import { BASE_URL } from "./baseUrl";

const API_URL = `${BASE_URL}/BusinessSettings`;

export const getBusinessSettings =
    async () => {
        const response = await axios.get(API_URL);

        return response.data;
    };

export const saveBusinessSettings =
    async (settings) => {
        const response =
            await axios.post(
                API_URL,
                settings
            );

        return response.data;
    };