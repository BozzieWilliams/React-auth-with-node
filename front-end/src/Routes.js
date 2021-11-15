import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { PrivateRoute } from "./auth/PrivateRoute";

export const Routes = () => {
	return (
		<Router>
			<Switch>
				<PrivateRoute path='/' exact component={UserInfoPage} />
				<Route component={Login} path='/login' exact />
				<Route component={Signup} path='/signup' exact />
			</Switch>
		</Router>
	);
};
