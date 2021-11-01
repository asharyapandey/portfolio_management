import { BrowserRouter as Router } from "react-router-dom";
import DashboardSideBar from "./components/DashboardSideBar";

function App() {
	return (
		<div className="App">
			<Router>
				<DashboardSideBar />
			</Router>
		</div>
	);
}

export default App;
