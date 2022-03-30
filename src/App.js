import {useContext, useEffect} from 'react';
import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import NavBar from './components/navbar';
import Home from './pages/home';
import CreateAccount from './pages/createAccount';
import Deposit from './pages/deposit';
import Withdraw from './pages/withdraw';
import Login from './pages/login';
import AllData from './pages/alldata';
import {UserContext} from './contexts/userContext';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function App() {
	const ctx = useContext(UserContext);
	const location = useLocation();
	useEffect(() => {
		let path = location.pathname.replace('/', '').replace('-', ' ');
		let title = path.charAt(0).toUpperCase() + path.slice(1);
		document.title = title.length === 0 || title.includes('000') || location.pathname === '/' ? 'Bad Bank': title;
	}, [location]);
	return (
		<Container>
			<NavBar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/create-account" element={<CreateAccount />} />
				<Route path="/login" element={<Login />} />
				<Route path="/deposit" element={<Deposit/>} />
				<Route path="/withdraw"  element={<Withdraw/>} />
				<Route path="/all-data" element={<AllData/>} />
			</Routes>
			<Modal show={ctx.loginSuccess}>
				<Card className="text-center" bg='success' text='white'>
					<Card.Body>
						<Card.Text>
							Login Successfully!
						</Card.Text>
					</Card.Body>
				</Card>
			</Modal>
			<Modal show={ctx.clientCreated}>
				<Card className="text-center" bg='success' text='white'>
					<Card.Body>
						<Card.Text>
							Account Created!
						</Card.Text>
					</Card.Body>
				</Card>
			</Modal>
		</Container>
	);
}
export default App;
