import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function Withdraw () {
	const ctx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
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
		return (<uiCtx.Navigate to="/"/>);
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
		ctx.loggedClient.balance = + ctx.loggedClient.balance - + withdrawAmount;
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
			<uiCtx.Card style={{ width: '36rem' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>
						Withdraw
					</uiCtx.Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Amount</label>
							<input
								value={withdrawAmount}
								type="number"
								className="form-control"
								id="amount"
								onChange={e => validateAmountInput(e)} />
							{(!validAmount && showAmountError) && <uiCtx.Alert className="alert alert-danger">{amountError}</uiCtx.Alert>}
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => handleWithdraw(e)} disabled={disabledSummitBtn}>Make withdraw</button>
					</form>
				</uiCtx.Card.Body>
			</uiCtx.Card>
			<uiCtx.Modal show={withdrawSuccess}>
				<uiCtx.Card className="text-center" bg='success' text='white'>
					<uiCtx.Card.Body>
						<uiCtx.Card.Text>
							Withdraw Successfull!
						</uiCtx.Card.Text>
						<uiCtx.Button variant="light" onClick={closeModal}>Cool!</uiCtx.Button>
					</uiCtx.Card.Body>
				</uiCtx.Card>
			</uiCtx.Modal>
		</div>
	);
}
export default Withdraw;