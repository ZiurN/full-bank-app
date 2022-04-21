import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function Withdraw () {
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('success');
	const [modalMessage, setModalMessage] = useState('');
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
	if(!userCtx.validUser) {
		navigate("/");
		return (<uiCtx.Navigate to="/"/>);
	}
	function validateAmountInput (e) {
		const regexp = /\d{1,}/;
		if (!showAmountError) setShowAmountError(true);
		let input = e.currentTarget.value;
		let currentBalance = userCtx.loggedClient.balance;
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
		let client = userCtx.loggedClient.userInfo;
		let lastBalance = client.balance;
		let transactionInfo = {
			type : 'Withdraw',
			userId : userCtx.userId,
			date: Date.now(),
			amount: withdrawAmount
		};
		client.balance = +client.balance - +withdrawAmount;
		userCtx.updateUserState(client, transactionInfo).then((result) => {
			setShowModal(true);
			setModalType('success');
			setModalMessage(result.message);
			setWithdrawAmount(0);
			setDisabledSummitBtn(true)
			setValidAmount(false);
			setShowAmountError(false);
			setTimeout(() => {
				setShowModal(false);
			}, 1500);
			navigate('/withdraw'); // I don't find another way to update the balance in the navbar
		}).catch(err => {
			setShowModal(true);
			setModalType('warning');
			setModalMessage('Withdaw Failed!');
			client.balance = +lastBalance;
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
			<uiCtx.UiModal
				show={showModal}
				type={modalType}
				text={modalMessage}
				children={<uiCtx.Button variant="light" onClick={closeModal}>Ok!</uiCtx.Button>}/>
		</div>
	);
}
export default Withdraw;