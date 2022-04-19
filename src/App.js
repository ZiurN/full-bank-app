import {useContext, useEffect} from 'react';
import {UserContext} from './contexts/userContext';
import {UiContext} from './contexts/uiContext';

function App() {
	const ctx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const location = uiCtx.useLocation();
	useEffect(() => {
		let path = location.pathname.replace('/', '').replace('-', ' ');
		let title = path.charAt(0).toUpperCase() + path.slice(1);
		document.title = title.length === 0 || title.includes('000') || location.pathname === '/' ? 'Bad Bank': title;
	}, [location]);
	return (
		<uiCtx.Container>
			<uiCtx.NavBar/>
			<uiCtx.Routes>
				<uiCtx.Route path="/" exact element={<uiCtx.Home />} />
				<uiCtx.Route path="/create-account" element={<uiCtx.CreateAccount/>} />
				<uiCtx.Route path="/login" element={<uiCtx.Login />} />
				<uiCtx.Route path="/deposit" element={<uiCtx.Deposit/>} />
				<uiCtx.Route path="/withdraw"  element={<uiCtx.Withdraw/>} />
				<uiCtx.Route path="/all-data" element={<uiCtx.AllData/>} />
			</uiCtx.Routes>
			<uiCtx.Modal show={ctx.loginSuccess}>
				<uiCtx.Card className="text-center" bg='success' text='white'>
					<uiCtx.Card.Body>
						<uiCtx.Card.Text>
							Login Successfully!
						</uiCtx.Card.Text>
					</uiCtx.Card.Body>
				</uiCtx.Card>
			</uiCtx.Modal>
			<uiCtx.Modal show={ctx.clientCreated}>
				<uiCtx.Card className="text-center" bg='success' text='white'>
					<uiCtx.Card.Body>
						<uiCtx.Card.Text>
							Account Created!
						</uiCtx.Card.Text>
					</uiCtx.Card.Body>
				</uiCtx.Card>
			</uiCtx.Modal>
		</uiCtx.Container>
	);
}
export default App;
