import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {UserContext} from '../contexts/userContext';
import { useState, useContext } from 'react';

function NavBar () {
	const [showModal, setShowModal] = useState(false);
	const ctx = useContext(UserContext);
	const validUser = ctx.validUser;
	const navigate = useNavigate();
	function handleLogout() {
		ctx.logoutUser()
		setShowModal(true);
		setTimeout(() => {
			setShowModal(false);
		}, 1500)
		navigate('/');
	}
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Link className="navbar-brand" to="/" >
					<div style={{backGroundColor : "red", width: "10rem", height: "4rem"}}>
						<img src={window.location.origin + '/images/badbanklogo1.svg'} alt="badbanklogo1" />
					</div>
				</Link>
				{!validUser && <Link className="nav-link nav-link-hover" to="/create-account" title="Create an account in Bad Bank">Create Account</Link>}
				{!validUser && <Link className="nav-link nav-link-hover" to="/login" title="loging to your account">Login</Link>}
				{validUser && (<h3>Balance: $ {ctx.loggedClient != null ? ctx.loggedClient.balance : 0} </h3>)}
				{validUser && (<Link className="nav-link nav-link-hover" to="/deposit" title="Make a deposit to your account" >Deposit</Link>)}
				{validUser && (<Link className="nav-link nav-link-hover" to="/withdraw" title="Request money from your account" >Withdraw</Link>)}
				{validUser && (<Link className="nav-link nav-link-hover" to="/all-data" title="See a general overview of your account" >All Data</Link>)}
				{validUser && (<Button className="nav-link nav-link-hover" variant="light" onClick={handleLogout} title="Sign out of your account">Logout</Button>)}
			</Container>
			<Modal show={showModal}>
				<Card className="text-center" bg='success' text='white'>
					<Card.Body>
						<Card.Text>
							have a nice day!
						</Card.Text>
					</Card.Body>
				</Card>
			</Modal>
		</Navbar>
	);
}
export default NavBar;