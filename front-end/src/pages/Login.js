import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import Axios from "axios";

export const Login = () => {
	const [token, setToken] = useToken();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const handleLogIn = async () => {
		const response = await Axios.post("/api/login", {
			email: email,
			password: password,
		});
		const { token } = response.data;
		setToken(token);
		history.push("/");
	};
	return (
		<div className='content-container'>
			<h1>Log In</h1>
			{error && <div className='fail'>{error}</div>}
			<input
				placeholder='someone@email.com'
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				placeholder='password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<hr />
			<button onClick={handleLogIn} disabled={!email || !password}>
				Log In
			</button>
			<button onClick={() => history.push("/forgot-password")}>
				Forgot your Password?
			</button>
			<button onClick={() => history.push("/signup")}>
				Don't have an account yet? Sign Up
			</button>
		</div>
	);
};
