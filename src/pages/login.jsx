import { useState, useEffect, useContext } from 'react'
import {UserContext} from '../contexts/userContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Login () {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const ctx = useContext(UserContext);
	function handleLogin (e) {
		e.preventDefault();
		let loggedClient = null;
		let validatedUser = ctx.tempClientsList.reduce((initial, current) => {
			let client = current;
			if (client.name === name && client.password === password) {
				loggedClient = client;
			}
			return initial || (client.name === name && client.password === password);
		}, false);
		if (!validatedUser) {
			setLoginError(true);
			setLoginErrorMessage('Incorrect Client Information');
		} else {
			ctx.validateUser(validatedUser, loggedClient);
		}
	}
	function closeModal () {
		setLoginError(false);
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card style={{ width: '36rem' }}>
				<Card.Body>
					<Card.Title>Welcome to the BadBank</Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Name</label>
							<input
								value={name}
								type="text"
								className="form-control"
								id="name"
								aria-describedby="nameHelp"
								onChange={e => setName(e.currentTarget.value)} />
							<div id="nameHelp" className="form-text">Name</div>
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
						<Modal show={loginError}>
							<Card className="text-center" bg='warning'>
								<Card.Body>
									<Card.Text>
										{loginErrorMessage}
									</Card.Text>
									<Button variant="light" onClick={closeModal}>Retry</Button>
								</Card.Body>
							</Card>
						</Modal>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}
export default Login;