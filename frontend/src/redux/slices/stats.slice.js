import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackbar } from "./snackbar.slice";
import { publicFetch } from "../../utils/fetch";

export const getStats = createAsyncThunk(
	"stats/getStats",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const response = await publicFetch.get(`/api/stats`);
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

const statsSlice = createSlice({
	name: "stats",
	initialState: {
		data: {},
		stats: false,
		status: "LOADING",
		message: "",
	},
	extraReducers: {
		[getStats.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getStats.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.stats = payload.stats;
			state.message = payload.message;
			state.status = "SUCCESS";
		},
		[getStats.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
	},
});

export default statsSlice.reducer;
