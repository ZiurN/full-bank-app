import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function CreateAccount () {
	const defaultModalInfo = {show : false, type: 'success', message : 'OK'}
	const [showNameError, setShowNameError] = useState(false);
	const [showEmailError, setShowEmailError] = useState(false);
	const [showPaswordError, setShowPaswordError] = useState(false);
	const [disabledSummitBtn, setDisabledSummitBtn] = useState(true);
	const [name, setName] = useState('');
	const [nameValid, setNameValid] = useState(false);
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);
	const [passwordErrMessage, setPasswordErrMessage] = useState(true);
	const [createButtonText, setCreateButtonText] = useState('Create Account');
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(defaultModalInfo);
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	useEffect(() => {
		function checkToEnableSummitBtn () {
			setDisabledSummitBtn(!nameValid || !emailValid || !passwordValid);
		}
		checkToEnableSummitBtn();
	}, [nameValid, emailValid, passwordValid, name, email, password]);
	function validateName (value) {
		setName(value);
		if (!showNameError) setShowNameError(true);
		setNameValid(validate(value, 'name'));
	}
	function validateEmail (value) {
		setEmail(value);
		if (!showEmailError) setShowEmailError(true);
		setEmailValid(validate(value, 'email'));
	}
	function validatePassword (value) {
		setPassword(value);
		if (!showPaswordError) setShowPaswordError(true);
		if(!validate(value, 'password')) setPasswordErrMessage('The password is mandatory');
		else if (value.length < 8) setPasswordErrMessage('The password must be at least 8 characters');
		setPasswordValid(validate(value, 'password') && !(value.length < 8));
	}
	function validate (field, label) {
		if (!field) {
			return false;
		}
		return true;
	}
	function handleCreate(e) {
		e.preventDefault();
		setLoading(true);
		if (!validate(name, 'name')) return;
		if (!validate(email, 'email')) return;
		if (!validate(password, 'password')) return;
		let newClient = {
			name: name,
			email: email,
			password: password
		}
		userCtx.addNewClient(newClient).then((result) => {
			console.log(result);
			let modalInfo = {show : true, type: 'success', message : result.message};
			setShowModal(modalInfo);
			setTimeout(() => {
				setShowModal(defaultModalInfo);
			}, 1500);
			setCreateButtonText('Create Another Account');
			clearForm();
			setLoading(false);
		}).catch((err) => {
			let modalInfo = {show : true, type: 'warning', message : 'error creating new account'};
			console.log(err);
			setShowModal(modalInfo);
			setTimeout(() => {
				setShowModal(defaultModalInfo);
			}, 1500);
			setLoading(false);
		});
	}
	function clearForm () {
		setName('');
		setPassword('');
		setEmail('');
		setDisabledSummitBtn(true);
		setShowNameError(false);
		setShowEmailError(false);
		setShowPaswordError(false);
		setNameValid(false);
		setEmailValid(false);
		setPasswordValid(false);
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<uiCtx.Card style={{ width: '36rem' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>Welcome to the BadBank</uiCtx.Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Name</label>
							<input
								value={name}
								type="text"
								className="form-control"
								id="name"
								aria-describedby="nameHelp"
								onChange={e => validateName(e.currentTarget.value)}
								onBlur={e => validateName(name)} />
							{(!nameValid && showNameError) && <uiCtx.Alert className="alert alert-danger">The name is mandatory</uiCtx.Alert>}
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label>
							<input
								value={password}
								type="password"
								className="form-control"
								id="password"
								onChange={e => validatePassword(e.currentTarget.value)}
								onBlur={e => validatePassword(password)} />
							{(!passwordValid && showPaswordError) && <uiCtx.Alert className="alert alert-danger">{passwordErrMessage}</uiCtx.Alert>}
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input
								value={email}
								type="text"
								className="form-control"
								id="email"
								aria-describedby="emailHelp"
								onChange={e => validateEmail(e.currentTarget.value)}
								onBlur={e => validateEmail(email)} />
							{(!emailValid && showEmailError) && <uiCtx.Alert className="alert alert-danger">The email is mandatory</uiCtx.Alert>}
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => handleCreate(e)} disabled={disabledSummitBtn}>{createButtonText}</button>
					</form>
				</uiCtx.Card.Body>
			</uiCtx.Card>
			<uiCtx.UiSpinner show={loading} />
			<uiCtx.UiModal show={showModal.show} type={showModal.type} text={showModal.message}/>
		</div>
	);
}
export default CreateAccount;