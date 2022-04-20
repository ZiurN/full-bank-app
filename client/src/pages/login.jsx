import { useState, useContext } from 'react'
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function Login () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	function handleLogin (e) {
		e.preventDefault();
		userCtx.signInWithEmailAndPassword(userCtx.auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				getClientInfo(user.uid)
				.then((data) => {
					userCtx.validateUser(true, data);
				}).catch((err) => {
					console.log(err);
					userCtx.validateUser(false, null);
				});
			})
			.catch((error) => {
				const errorMessage = error.message.replace('Firebase: Error ', '');
				setLoginError(true);
				setLoginErrorMessage(errorMessage);
			});
	}
	async function getClientInfo (userId) {
		var requestOptions = {
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		};
		const response = await fetch('http://localhost:5000/client-info/' + userId, requestOptions);
		const content = await response.json();
		return content;
	}
	function closeModal () {
		setLoginError(false);
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<uiCtx.Card style={{ width: '36rem' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>Welcome to the BadBank</uiCtx.Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Email</label>
							<input
								value={email}
								type="email"
								className="form-control"
								id="email"
								aria-describedby="nameHelp"
								onChange={e => setEmail(e.currentTarget.value)} />
							<div id="nameHelp" className="form-text">Email</div>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label>
							<input
								value={password}
								type="password"
								className="form-control"
								id="password"
								onChange={e => setPassword(e.currentTarget.value)} />
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => {handleLogin(e)}}>Login</button>
						<uiCtx.UiModal
							show={loginError}
							type='warning'
							text={loginErrorMessage}
							children={<uiCtx.Button variant="light" onClick={closeModal}>Retry</uiCtx.Button>} />
					</form>
				</uiCtx.Card.Body>
			</uiCtx.Card>
		</div>
	);
}
export default Login;