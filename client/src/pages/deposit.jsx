import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function Deposit () {
	const ctx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
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
		return (<uiCtx.Navigate to="/"/>);
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
			<uiCtx.Card style={{ width: '36rem' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>
						Deposit
					</uiCtx.Card.Title>
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Amount</label>
							<input
								value={depositAmount}
								type="number"
								className="form-control"
								id="amount"
								onChange={e => validateAmountInput(e)} />
							{(!validAmount && showAmountError) && <uiCtx.Alert className="alert alert-danger">{amountError}</uiCtx.Alert>}
						</div>
						<button type="submit" className="btn btn-primary btn-bank" onClick={(e) => handleDeposit(e)} disabled={disabledSummitBtn}>Make deposit</button>
					</form>
				</uiCtx.Card.Body>
			</uiCtx.Card>
			<uiCtx.UiModal
				show={depositSuccess}
				type='success'
				text={'Deposit Successfull!'}
				children={<uiCtx.Button variant="light" onClick={closeModal}>Cool!</uiCtx.Button>}/>
		</div>
	);
}
export default Deposit