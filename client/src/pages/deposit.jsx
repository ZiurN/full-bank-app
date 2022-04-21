import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function Deposit () {
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
	const [depositAmount, setDepositAmount] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('success');
	const [modalMessage, setModalMessage] = useState('');
	const [validAmount, setValidAmount] = useState(false);
	const [showAmountError, setShowAmountError] = useState(false);
	const [amountError, setAmountError] = useState('');
	const [disabledSummitBtn, setDisabledSummitBtn] = useState(true);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		function checkToEnableSummitBtn () {
			setDisabledSummitBtn(!validAmount);
		}
		checkToEnableSummitBtn();
	}, [validAmount]);
	if(!userCtx.validUser) {
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
		setLoading(true);
		e.preventDefault();
		let client = userCtx.loggedClient.userInfo;
		let lastBalance = client.balance
		let transactionInfo = {
			type : 'Deposit',
			userId : userCtx.userId,
			date: Date.now(),
			amount: depositAmount
		};
		client.balance = +client.balance + +depositAmount;
		userCtx.updateUserState(client, transactionInfo).then((result) => {
			setShowModal(true);
			setModalType('success');
			setModalMessage(result.message);
			setDepositAmount(0);
			setDisabledSummitBtn(true)
			setValidAmount(false);
			setShowAmountError(false);
			setLoading(false);
			setTimeout(() => {
				setShowModal(false);
			}, 1500);
			navigate('/deposit');
		}).catch(err => {
			setShowModal(true);
			setModalType('warning');
			setModalMessage('Deposit Failed!');
			client.balance = lastBalance;
			setLoading(false);
		});
	}
	function closeModal () {
		setShowModal(false);
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
				show={showModal}
				type={modalType}
				text={modalMessage}
				children={<uiCtx.Button variant="light" onClick={closeModal}>Ok!</uiCtx.Button>}/>
			<uiCtx.UiSpinner show={loading} />
		</div>
	);
}
export default Deposit