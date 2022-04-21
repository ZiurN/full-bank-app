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
	const [loginStatus, setLoginStatus] = useState({showModal: false, type: 'success', message: 'OK'});
	const navigate = useNavigate();
	const updateUserState = (userInfo, transactionInf) => {
		let updatedInfo = {
			userInfo,
			transactionInf
		};
		return new Promise((resolve, reject) => {
			updateAccountInfo(updatedInfo).then((result) => {
				resolve(result);
			}).catch(err => {console.log(err); reject(err)});
		});
	};
	const validateUser = useCallback((validatedUser, loggedClient) => {
		if (validatedUser) {
			setLoginStatus({showModal: validatedUser, type: 'success', message: 'Login success'});
			setValidUser(validatedUser);
			setUserId(loggedClient.userInfo.userId);
			setLoggedClient(loggedClient);
			setTimeout(() => {
				navigate("/all-data");
				setLoginStatus({showModal: false, type: 'success', message: 'Login success'});
			}, 1500);
			return <Navigate to="/all-data" />
		} else {
			setLoginStatus({showModal: true, type: 'warning', message: 'Login failed'});
			setTimeout(() => {
				setLoginStatus({showModal: false, type: 'warning', message: 'Login failed'});
			}, 1500);
		}
	}, [navigate]);
	const logoutUser = useCallback(() => {
		setLoginStatus({showModal: false, type: 'success', message: 'OK'});
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
	async function updateAccountInfo (updatedInfo) {
		var requestOptions = {
			method: 'POST',
			body: JSON.stringify(updatedInfo),
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		};
		return new Promise ((resolve, reject) => {
			fetch('http://localhost:5000/update-account', requestOptions).then((response) => {
				if (response.status === 200) {
					response.json().then((content) => resolve(content)).catch((err) => reject(err));
				} else {
					reject(response);
				}
			}).catch((err) => reject(err));
		});
	}
	const contextValue = {
		loginStatus,
		loggedClient,
		userId,
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