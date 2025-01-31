import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./api/apislice";

const store = configureStore({
    reducer:{
        api: apiReducer
    }
});

export default store;