import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Navigate, useNavigate} from "react-router-dom";

function Withdraw () {
	const ctx = useContext(UserContext);
	const navigate = useNavigate();
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [withdrawSuccess, setWithdrawSuccess] = useState(false);
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
		let currentBalance = ctx.loggedClient.balance;
		let numberInvalid = !input.match(regexp);
		let positiveInvalid = input <= 0;
		let overdraftInvalid = Number(input) > Number(currentBalance);
		if (numberInvalid) {
			setAmountError('You must enter a valid number');
		} else if (positiveInvalid) {
			setAmountError('You must a positive number');
		} else if (overdraftInvalid) {
			setAmountError('You don\'t have enough funds');
		}
		setValidAmount(!numberInvalid && !positiveInvalid && !overdraftInvalid);
		setWithdrawAmount(e.currentTarget.value);
	}
	function handleWithdraw (e) {
		e.preventDefault();
		ctx.loggedClient.balance = +ctx.loggedClient.balance - +withdrawAmount;
		ctx.updateUserState(ctx.loggedClient);
		setWithdrawSuccess(true);
		setWithdrawAmount(0);
		setDisabledSummitBtn(true)
		setValidAmount(false);
		setShowAmountError(false);
		setTimeout(() => {
			setWithdrawSuccess(false);
		}, 1500);
		navigate('/withdraw'); // I don't find another way to update the balance in the navbar
	}
	function closeModal () {
		setWithdrawSuccess(false);
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card style={{ width: '36rem' }}>
				<Card.Body>
					<Card.Title>
						Withdraw
					</Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Amount</label>
							<input
								value={withdrawAmount}
								type="number"
								className="form-control"
								id="amount"
								onChange={e => validateAmountInput(e)} />
							{(!validAmount && showAmountError) && <Alert className="alert alert-danger">{amountError}</Alert>}
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => handleWithdraw(e)} disabled={disabledSummitBtn}>Make withdraw</button>
					</form>
				</Card.Body>
			</Card>
			<Modal show={withdrawSuccess}>
				<Card className="text-center" bg='success' text='white'>
					<Card.Body>
						<Card.Text>
							Withdraw Successfull!
						</Card.Text>
						<Button variant="light" onClick={closeModal}>Cool!</Button>
					</Card.Body>
				</Card>
			</Modal>
		</div>
	);
}
export default Withdraw;