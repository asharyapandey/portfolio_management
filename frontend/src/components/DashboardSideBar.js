import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import CustomizedSnackbar from "./Snackbar/CustomizedSnackbar";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Stocks from "../pages/Stocks";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function DashboardSideBar() {
	const classes = useStyles();
	const dispatch = useDispatch();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Grid container>
						<Grid item sm={11}>
							<Typography variant="h6" noWrap>
								Portfolio Management
							</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<NavLink
							to="/dashboard"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary={"Dashboard"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/stock"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<CategoryIcon />
								</ListItemIcon>
								<ListItemText primary={"Stocks"} />
							</ListItem>
						</NavLink>
					</List>
				</div>
				<CustomizedSnackbar />
			</Drawer>
			<main className={classes.content}>
				<Toolbar />

				<Switch>
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/stock" component={Stocks} />
					<Route path="*" exact>
						<Redirect to="/dashboard" />
					</Route>
				</Switch>
			</main>
		</div>
	);
}
