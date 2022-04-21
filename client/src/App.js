import {useContext, useEffect} from 'react';
import {UserContext} from './contexts/userContext';
import {UiContext} from './contexts/uiContext';

function App() {
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const location = uiCtx.useLocation();
	useEffect(() => {
		let path = location.pathname.replace('/', '').replace('-', ' ');
		let title = path.charAt(0).toUpperCase() + path.slice(1);
		document.title = title.length === 0 || title.includes('000') || location.pathname === '/' ? 'Bad Bank': title;
	}, [location]);
	return (
		<uiCtx.Container>
			<uiCtx.MainNavBar/>
			<uiCtx.Routes>
				<uiCtx.Route path="/" exact element={<uiCtx.Home />} />
				<uiCtx.Route path="/create-account" element={<uiCtx.CreateAccount/>} />
				<uiCtx.Route path="/login" element={<uiCtx.Login />} />
				<uiCtx.Route path="/deposit" element={<uiCtx.Deposit/>} />
				<uiCtx.Route path="/withdraw"  element={<uiCtx.Withdraw/>} />
				<uiCtx.Route path="/all-data" element={<uiCtx.AllData/>} />
			</uiCtx.Routes>
			<uiCtx.UiModal show={userCtx.loginStatus.showModal} type={userCtx.loginStatus.type} text={userCtx.loginStatus.message}/>
			<uiCtx.UiModal show={userCtx.clientCreated} type='success' text='Account Created!'/>
		</uiCtx.Container>
	);
}
export default App;
