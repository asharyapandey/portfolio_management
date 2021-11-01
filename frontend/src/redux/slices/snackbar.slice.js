import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
	name: "snackbar",
	initialState: {
		snackbarOpen: false,
		snackbarType: "success",
		snackbarMessage: "",
	},
	reducers: {
		setSnackbar: (state, { payload }) => {
			state.snackbarOpen = payload.snackbarOpen;
			state.snackbarType = payload.snackbarType;
			state.snackbarMessage = payload.snackbarMessage;
		},
	},
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
