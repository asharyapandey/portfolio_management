import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Select } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils/utils";
import stockSchema from "../../validation/stock.validation";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { getStockName } from "../../redux/slices/stockName.slice";
import { addUserStocks } from "../../redux/slices/userStock.slice";
import { FAILED, SUCCESS } from "../../utils/status";

const useStyles = makeStyles((theme) => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		width: "97%",
	},
	mt: {
		marginTop: theme.spacing(1),
	},
}));

export default function AddStockDialog({ setOpen, open }) {
	const classes = useStyles();

	const [stockName, setStockName] = useState("");
	const [transactionType, setTransactionType] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [transactionDate, setTransactionDate] = useState("");
	const [stockNameError, setStockNameError] = useState("");
	const [transactionTypeError, setTransactionTypeError] = useState("");
	const [quantityError, setQuantityError] = useState("");
	const [priceError, setPriceError] = useState("");
	const [transactionDateError, setTransactionDateError] = useState("");

	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();
	const stockState = useSelector((state) => state.stock);
	const userStockState = useSelector((state) => state.userStock);

	useEffect(() => dispatch(getStockName()), [dispatch]);

	useEffect(() => {
		if (userStockState.addStatus === SUCCESS) {
			handleClose();
			setStockName("");
			setTransactionDate("");
			setTransactionType("");
			setPrice("");
			setQuantity("");
		} else if (userStockState.addStatus === FAILED) {
			handleClose();
		}
	}, [userStockState]);

	const handleSubmit = async () => {
		const stockData = {
			stockName,
			transactionType,
			quantity,
			price,
			transactionDate,
		};
		stockSchema
			.validate(stockData)
			.then((isValid) => {
				dispatch(addUserStocks(stockData));
			})
			.catch((err) => {
				err.errors.forEach((error) => {
					if (error.includes("transactionType")) {
						setTransactionTypeError(capitalizeFirstLetter(error));
					}
					if (error.includes("transactionDate")) {
						setTransactionDateError(capitalizeFirstLetter(error));
					}
					if (error.includes("price")) {
						setPriceError(capitalizeFirstLetter(error));
					}
					if (error.includes("stockName")) {
						setStockNameError(capitalizeFirstLetter(error));
					}
					if (error.includes("quantity")) {
						setQuantityError(capitalizeFirstLetter(error));
					}
				});
			});
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={"sm"}
			>
				<DialogTitle id="form-dialog-title">Product</DialogTitle>
				<DialogContent>
					<FormControl variant="outlined" fullWidth margin="dense">
						<InputLabel id="name-label">Stock Name</InputLabel>
						<Select
							labelId="name-label"
							value={stockName}
							labelWidth={90}
							onChange={(e) => {
								setStockName(e.target.value);
							}}
						>
							{stockState.data.map((stock) => {
								return (
									<MenuItem value={stock._id}>
										{stock.companyName}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl
						component="fieldset"
						error={transactionTypeError !== ""}
						className={classes.mt}
					>
						<FormLabel component="legend">
							Transaction Type
						</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={transactionType}
							onChange={(e) => setTransactionType(e.target.value)}
							row
						>
							<FormControlLabel
								value="BUY"
								control={<Radio />}
								label="Buy"
							/>
							<FormControlLabel
								value="SELL"
								control={<Radio />}
								label="Sell"
							/>
						</RadioGroup>
						<FormHelperText>{transactionTypeError}</FormHelperText>
					</FormControl>
					<TextField
						margin="dense"
						id="quantity"
						label="Quantity"
						type="number"
						variant="outlined"
						value={quantity}
						fullWidth
						onChange={(e) => setQuantity(e.target.value)}
						onKeyDown={(e) => setQuantityError("")}
						error={quantityError !== ""}
						helperText={quantityError}
					/>
					<TextField
						margin="dense"
						id="price"
						label="Price"
						type="number"
						variant="outlined"
						value={price}
						fullWidth
						onChange={(e) => setPrice(e.target.value)}
						onKeyDown={(e) => setPriceError("")}
						error={priceError !== ""}
						helperText={priceError}
					/>
					<TextField
						id="date"
						label="Transaction Date"
						type="date"
						variant="outlined"
						defaultValue="2020-05-24"
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						value={transactionDate}
						fullWidth
						onChange={(e) => setTransactionDate(e.target.value)}
						onKeyDown={(e) => setTransactionDateError("")}
						error={transactionDateError !== ""}
						helperText={transactionDateError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} color="primary">
						{userStockState.addStatus === "" ||
						userStockState.addStatus === "SUCCESS" ||
						userStockState.addStatus === FAILED ? (
							"Add Stock"
						) : (
							<CircularProgress size={17} />
						)}
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
