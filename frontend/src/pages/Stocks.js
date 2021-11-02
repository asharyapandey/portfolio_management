import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { getUserStocks } from "../redux/slices/userStock.slice";
import { useEffect } from "react";
import AddStockDialog from "../components/Dialogs/AddStockDialog";

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	margin: {
		marginLeft: theme.spacing(1),
	},
	dialog: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(10),
	},
	dialogTitle: {
		textAlign: "center",
		fontFamily: "Bold",
	},
	dialogAction: {
		justifyContent: "center",
	},
}));

function Stocks() {
	document.title = "Stocks";
	const classes = useStyles();
	// states
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);

	const dispatch = useDispatch();

	const userStockState = useSelector((state) => state.userStock);

	useEffect(() => {
		dispatch(getUserStocks({ page, rowPerPage }));
	}, [dispatch, page, rowPerPage]);

	const columns = [
		{
			name: "stockName",
			label: "Stock Name",
		},
		{
			name: "transactionType",
			label: "Transaction Type",
		},
		{
			name: "quantity",
			label: "Quantity",
		},
		{
			name: "amount",
			label: "Amount",
		},
		{
			name: "price",
			label: "Price",
		},
		{
			name: "transactionDate",
			label: "Transaction Date",
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					let date = new Date(value);
					return (
						<Typography>{`${date.getFullYear()}/${
							date.getMonth() + 1
						}/${date.getDate()}`}</Typography>
					);
				},
			},
		},
	];

	if (userStockState.status === "LOADING") {
		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<CircularProgress />
			</div>
		);
	}

	const options = {
		selectableRows: false,
		responsive: "scrollFullHeight",
		filters: false,

		serverSide: true,
		//count, // Use total number of items
		count: userStockState.totalCount, // Unknown number of items
		page: page,
		onTableChange: (action, tableState) => {
			console.log(action, tableState);
			if (action === "changePage") {
				console.log("Go to page", tableState.page);
				setPage(tableState.page);
			}
			if (action === "changeRowsPerPage") {
				console.log("row count", tableState.rowsPerPage);
				setRowPerPage(tableState.rowPerPage);
			}
		},
	};

	return (
		<div>
			<MUIDataTable
				title={"Stocks"}
				data={userStockState.data}
				columns={columns}
				options={options}
			/>
			<Fab
				className={classes.fab}
				onClick={() => setOpen(true)}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>
			<AddStockDialog open={open} setOpen={setOpen} />
		</div>
	);
}

export default Stocks;
