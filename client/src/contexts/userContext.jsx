import {useState, createContext, useCallback, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

const UserContext = createContext();
const UserContextProvider = ({children}) => {
	const [validUser, setValidUser] = useState(false);
	const [tempClientsList, setTempClientsList] = useState([]);
	const [clientCreated, setClientCreated] = useState(false);
	const [loggedClient, setLoggedClient] = useState(null);
	const [loginSuccess, setLoginSuccess] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		getClients().then((data) => {
			console.log(data);
			setTempClientsList([...tempClientsList, ...data.clients]);
		}).catch((error) => {
			console.log(error);
		});
	}, []);
	const getClients = async function () {
		var requestOptions = {
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		};
		const response = await fetch(window.location.origin + '/clients.json', requestOptions);
		const content = await response.json();
		let obj = {clients: content.data};
		return obj;
	}
	const addNewClient = (newClient) => {
		setTempClientsList([...tempClientsList, newClient]);
		setClientCreated(true);
		setLoggedClient(newClient);
		setValidUser(true);
		setTimeout(() => {
			setClientCreated(false);
		}, 1500);
	};
	const updateUserState = (loggedClient) => {
		setValidUser(loggedClient);
	};
	const validateUser = useCallback((validatedUser, loggedClient) => {
		if (validatedUser) {
			setLoginSuccess(validatedUser);
			setValidUser(validatedUser);
			setLoggedClient(loggedClient);
			setTimeout(() => {
				navigate("/all-data");
				setLoginSuccess(false);
			}, 1500);
			return <Navigate to="/all-data" />
		}
	}, [navigate]);
	const logoutUser = useCallback(() => {
		setLoginSuccess(false);
		setValidUser(false);
		setLoggedClient(null);
	}, []);
	const contextValue = {
		loginSuccess: loginSuccess,
		tempClientsList: tempClientsList,
		loggedClient: loggedClient,
		validUser: validUser,
		clientCreated: clientCreated,
		validateUser: validateUser,
		updateUserState: updateUserState,
		logoutUser: logoutUser,
		addNewClient: addNewClient
	};
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}
export {UserContextProvider, UserContext}