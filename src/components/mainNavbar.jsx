
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';
import {useState, useContext} from 'react';

function MainNavBar () {
	const [showModal, setShowModal] = useState(false);
	const ctx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const validUser = ctx.validUser;
	const navigate = uiCtx.useNavigate();
	function handleLogout() {
		ctx.logoutUser()
		setShowModal(true);
		setTimeout(() => {
			setShowModal(false);
		}, 1500)
		navigate('/');
	}
	return (
		<uiCtx.Navbar bg="light" expand="lg">
			<uiCtx.Container>
				<uiCtx.Link className="navbar-brand" to="/" >
					<div style={{backGroundColor : "red", width: "10rem", height: "4rem"}}>
						<img src={window.location.origin + '/images/badbanklogo1.svg'} alt="badbanklogo1" />
					</div>
				</uiCtx.Link>
				{!validUser && <uiCtx.Link className="nav-link nav-link-hover" to="/create-account" title="Create an account in Bad Bank">Create Account</uiCtx.Link>}
				{!validUser && <uiCtx.Link className="nav-link nav-link-hover" to="/login" title="loging to your account">Login</uiCtx.Link>}
				{validUser && (<h3>Balance: $ {ctx.loggedClient != null ? ctx.loggedClient.balance : 0} </h3>)}
				{validUser && (<uiCtx.Link className="nav-link nav-link-hover" to="/deposit" title="Make a deposit to your account" >Deposit</uiCtx.Link>)}
				{validUser && (<uiCtx.Link className="nav-link nav-link-hover" to="/withdraw" title="Request money from your account" >Withdraw</uiCtx.Link>)}
				{validUser && (<uiCtx.Link className="nav-link nav-link-hover" to="/all-data" title="See a general overview of your account" >All Data</uiCtx.Link>)}
				{validUser && (<uiCtx.Button className="nav-link nav-link-hover" variant="light" onClick={handleLogout} title="Sign out of your account">Logout</uiCtx.Button>)}
			</uiCtx.Container>
			<uiCtx.Modal show={showModal}>
				<uiCtx.Card className="text-center" bg='success' text='white'>
					<uiCtx.Card.Body>
						<uiCtx.Card.Text>
							Have a nice day!
						</uiCtx.Card.Text>
					</uiCtx.Card.Body>
				</uiCtx.Card>
			</uiCtx.Modal>
		</uiCtx.Navbar>
	);
}
export default MainNavBar;