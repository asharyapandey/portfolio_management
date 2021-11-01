import { configureStore, combineReducers } from "@reduxjs/toolkit";
import snackbarSlice from "./slices/snackbar.slice";
import statsSlice from "./slices/stats.slice";
import stockNameSlice from "./slices/stockName.slice";
import userStock from "./slices/userStock.slice";

const reducer = combineReducers({
	snackbar: snackbarSlice,
	userStock: userStock,
	stock: stockNameSlice,
	stats: statsSlice,
});

const store = configureStore({
	reducer,
});

export default store;
