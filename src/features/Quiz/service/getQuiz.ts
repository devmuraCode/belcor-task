import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuiz = createAsyncThunk('products/getProducts', async (params: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
});
