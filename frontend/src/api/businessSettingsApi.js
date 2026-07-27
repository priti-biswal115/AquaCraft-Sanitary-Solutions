import axios from "axios";

const API_URL = "https://localhost:7001/api/BusinessSettings";

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