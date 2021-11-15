import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import Axios from "axios";
export const Signup = () => {
	const [token, setToken] = useToken();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const handleSignUp = async () => {
		const response = await Axios.post("/api/signup", {
			email: email,
			password: password,
		});
		const { token } = response.data;
		setToken(token);
		history.push("/");
	};
	return (
		<div className='content-container'>
			<h1>Sign Up</h1>
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
			<input
				placeholder='confirm password'
				type='password'
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<hr />
			<button
				onClick={handleSignUp}
				disabled={!email || !password || password !== confirmPassword}
			>
				Sign Up
			</button>
			<button onClick={() => history.push("/login")}>
				Already have an account? Login
			</button>
		</div>
	);
};
