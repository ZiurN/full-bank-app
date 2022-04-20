import {useState, createContext, useCallback} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAGJZCF4JYuH0MBGuzoo7_qHjwa66ol8q4",
	authDomain: "mit-test-project-57d3d.firebaseapp.com",
	databaseURL: "https://mit-test-project-57d3d-default-rtdb.firebaseio.com",
	projectId: "mit-test-project-57d3d",
	storageBucket: "mit-test-project-57d3d.appspot.com",
	messagingSenderId: "713529231221",
	appId: "1:713529231221:web:6e293568dff345ffc5753c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const UserContext = createContext();
const UserContextProvider = ({children}) => {
	const [userId, setUserId] = useState('');
	const [validUser, setValidUser] = useState(false);
	const [loggedClient, setLoggedClient] = useState(null);
	const [loginSuccess, setLoginSuccess] = useState(false);
	const navigate = useNavigate();
	const updateUserState = (loggedClient) => {
		setValidUser(loggedClient);
	};
	const validateUser = useCallback((validatedUser, loggedClient) => {
		if (validatedUser) {
			setLoginSuccess(validatedUser);
			setValidUser(validatedUser);
			setUserId(loggedClient.uid);
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
	async function addNewClient (newUser) {
		var requestOptions = {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		};
		const response = await fetch('http://localhost:5000/create-account', requestOptions);
		const content = await response.json();
		return content;
	}
	const contextValue = {
		loginSuccess,
		loggedClient,
		validUser,
		addNewClient,
		validateUser,
		updateUserState,
		logoutUser,
		app,
		auth,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut
	};
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}
export {UserContextProvider, UserContext}