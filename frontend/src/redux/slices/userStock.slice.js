import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbar } from "./snackbar.slice";
import { publicFetch } from "../../utils/fetch";

export const getUserStocks = createAsyncThunk(
	"userStock/getUserStocks",
	async (data, { dispatch, rejectWithValue, getState }) => {
		try {
			const response = await publicFetch.get(
				`/api/stock?page=${data.page + 1}&limit=${data.rowPerPage}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

export const addUserStocks = createAsyncThunk(
	"userStock/addUserStocks",
	async (stock, { dispatch, rejectWithValue, getState }) => {
		try {
			const response = await publicFetch.post(`/api/stock`, { ...stock });
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: response.data.message,
				})
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);
const userStock = createSlice({
	name: "userStock",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		status: "",
		addStatus: "",
		message: "",
	},
	extraReducers: {
		[getUserStocks.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getUserStocks.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.totalCount;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getUserStocks.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
		[addUserStocks.pending]: (state, action) => {
			state.addStatus = "LOADING";
		},
		[addUserStocks.fulfilled]: (state, { payload }) => {
			state.data = [...state.data, payload.result];
			state.totalCount += 1;
			state.addStatus = "SUCCESS";
		},
		[addUserStocks.rejected]: (state, action) => {
			state.addStatus = "FAILED";
			console.log(action);
		},
	},
});

export default userStock.reducer;
