import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Navigate, useNavigate} from "react-router-dom";

function Deposit () {
	const ctx = useContext(UserContext);
	const navigate = useNavigate();
	const [depositAmount, setDepositAmount] = useState(0);
	const [depositSuccess, setDepositSuccess] = useState(false);
	const [validAmount, setValidAmount] = useState(false);
	const [showAmountError, setShowAmountError] = useState(false);
	const [amountError, setAmountError] = useState('');
	const [disabledSummitBtn, setDisabledSummitBtn] = useState(true);
	useEffect(() => {
		function checkToEnableSummitBtn () {
			setDisabledSummitBtn(!validAmount);
		}
		checkToEnableSummitBtn();
	}, [validAmount]);
	if(!ctx.validUser) {
		navigate("/");
		return (<Navigate to="/"/>);
	}
	function validateAmountInput (e) {
		const regexp = /\d{1,}/;
		if (!showAmountError) setShowAmountError(true);
		let input = e.currentTarget.value;
		if (!input.match(regexp)) {
			setAmountError('You must enter a valid number');
		} else if (input <= 0) {
			setAmountError('You must a positive number');
		}
		setValidAmount(input.match(regexp) && input > 0);
		setDepositAmount(e.currentTarget.value);
	}
	function handleDeposit (e) {
		e.preventDefault();
		ctx.loggedClient.balance = +ctx.loggedClient.balance + +depositAmount;
		ctx.updateUserState(ctx.loggedClient);
		setDepositSuccess(true);
		setDepositAmount(0);
		setDisabledSummitBtn(true)
		setValidAmount(false);
		setShowAmountError(false);
		setTimeout(() => {
			setDepositSuccess(false);
		}, 1500);
		navigate('/deposit'); // I don't find another way to update the balance in the navbar
	}
	function closeModal () {
		setDepositSuccess(false);
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card style={{ width: '36rem' }}>
				<Card.Body>
					<Card.Title>
						Deposit
					</Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Amount</label>
							<input
								value={depositAmount}
								type="number"
								className="form-control"
								id="amount"
								onChange={e => validateAmountInput(e)} />
							{(!validAmount && showAmountError) && <Alert className="alert alert-danger">{amountError}</Alert>}
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => handleDeposit(e)} disabled={disabledSummitBtn}>Make deposit</button>
					</form>
				</Card.Body>
			</Card>
			<Modal show={depositSuccess}>
				<Card className="text-center" bg='success' text='white'>
					<Card.Body>
						<Card.Text>
							Deposit Successfull!
						</Card.Text>
						<Button variant="light" onClick={closeModal}>Cool!</Button>
					</Card.Body>
				</Card>
			</Modal>
		</div>
	);
}
export default Deposit