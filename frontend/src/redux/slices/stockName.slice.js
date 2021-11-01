import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbar } from "./snackbar.slice";
import { publicFetch } from "../../utils/fetch";

export const getStockName = createAsyncThunk(
	"stock/getStocks",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const response = await publicFetch.get(`/api/stock/names`);
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

const stockNameSlice = createSlice({
	name: "stock",
	initialState: {
		data: [],
		status: "",
		message: "",
	},
	extraReducers: {
		[getStockName.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getStockName.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.total;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getStockName.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
	},
});

export default stockNameSlice.reducer;
