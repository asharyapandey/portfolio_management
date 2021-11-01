import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStats } from "../redux/slices/stats.slice";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function Dashboard() {
	document.title = "Dashboard";
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => dispatch(getStats()), []);

	const statsState = useSelector((state) => state.stats);

	if (statsState.status === "LOADING") {
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
	return (
		<div>
			<Card className={classes.pos}>
				<CardContent>
					<Typography
						className={classes.title}
						color="primary"
						gutterBottom
						variant="h4"
					>
						Overall Stats
					</Typography>
					{statsState.stats ? (
						<div>
							<Grid container>
								<Grid item xs={6}>
									<Typography variant="body2" component="p">
										Total Units:{" "}
										{
											statsState.data.overallStats
												.totalUnits
										}
									</Typography>
									<Typography variant="body2" component="p">
										Total Investment:{" "}
										{
											statsState.data.overallStats
												.totalInvestment
										}
									</Typography>
									<Typography variant="body2" component="p">
										Sold Amount :{" "}
										{
											statsState.data.overallStats
												.soldAmount
										}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="body2" component="p">
										Current Amount :{" "}
										{
											statsState.data.overallStats
												.currentAmount
										}
									</Typography>
									<Typography variant="body2" component="p">
										Overall Profit :{" "}
										{statsState.data.overallStats
											.overallProfit > 0
											? statsState.data.overallStats
													.overallProfit
											: 0}
									</Typography>
								</Grid>
							</Grid>
						</div>
					) : (
						"No Data Currently"
					)}
				</CardContent>
			</Card>
			<Grid
				container
				direction="row"
				alignContent="center"
				alignItems="center"
				wrap="wrap"
				spacing={1}
			>
				{statsState.data.stocks.map((stock) => {
					return (
						<Grid item xs={6}>
							<Card className={classes.root}>
								<CardContent>
									<Typography
										className={classes.title}
										color="primary"
										gutterBottom
									>
										{stock.stockName}
									</Typography>
									{statsState.stats ? (
										<Grid container>
											<Grid item xs={6}>
												<Typography
													variant="body2"
													component="p"
												>
													Total Units:{" "}
													{stock.totalUnits}
												</Typography>
												<Typography
													variant="body2"
													component="p"
												>
													Total Investment:{" "}
													{stock.totalInvestment}
												</Typography>
												<Typography
													variant="body2"
													component="p"
												>
													Sold Amount :{" "}
													{stock.soldAmount}
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant="body2"
													component="p"
												>
													Current Amount :{" "}
													{stock.currentAmount}
												</Typography>
												<Typography
													variant="body2"
													component="p"
												>
													Overall Profit :{" "}
													{stock.soldAmount -
														stock.totalInvestment >
													0
														? stock.soldAmount -
														  stock.totalInvestment
														: 0}
												</Typography>
											</Grid>
										</Grid>
									) : (
										"No Data Currently"
									)}
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}
