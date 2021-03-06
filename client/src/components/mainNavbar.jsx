import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';
import {useState, useContext} from 'react';

function MainNavBar () {
	const [showModal, setShowModal] = useState(false);
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const validUser = userCtx.validUser;
	const client = userCtx.loggedClient?.userInfo;
	function handleLogout() {
		userCtx.signOut(userCtx.auth)
			.then(() => {
				userCtx.logoutUser()
				setShowModal(true);
				setTimeout(() => {
					setShowModal(false);
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
			});
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
				{validUser && (<h3>Balance: $ {client != null ? client.balance : 0} </h3>)}
				{validUser && (<uiCtx.Link className="nav-link nav-link-hover" to="/deposit" title="Make a deposit to your account" >Deposit</uiCtx.Link>)}
				{validUser && (<uiCtx.Link className="nav-link nav-link-hover" to="/withdraw" title="Request money from your account" >Withdraw</uiCtx.Link>)}
				{validUser && (
					<uiCtx.Dropdown>
					<uiCtx.Dropdown.Toggle id="dropdown-basic" className="dropdown-user-toggle">
						{client != null ? client.name : "User"}
					</uiCtx.Dropdown.Toggle>
					<uiCtx.Dropdown.Menu>
						<uiCtx.Link className="nav-link nav-link-hover" to="/all-data" title="See a general overview of your account" >All Data</uiCtx.Link>
						<uiCtx.Button className="nav-link nav-link-hover btn-logout" variant="light" onClick={handleLogout} title="Sign out of your account">Logout</uiCtx.Button>
					</uiCtx.Dropdown.Menu>
				  </uiCtx.Dropdown>
				)}
			</uiCtx.Container>
			<uiCtx.UiModal show={showModal} type='success' text='Have a nice day!'/>
		</uiCtx.Navbar>
	);
}
export default MainNavBar;