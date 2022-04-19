import {createContext} from "react";
/** Router */
import {Route, Routes, useLocation, Link, useNavigate} from "react-router-dom";
/** UI Bootstrap Components */
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
/** UI Custom components */
import MainNavBar from '../components/mainNavbar';
/** UI Custom Pages */
import Home from '../pages/home';
import CreateAccount from '../pages/createAccount';
import Deposit from '../pages/deposit';
import Withdraw from '../pages/withdraw';
import Login from '../pages/login';
import AllData from '../pages/alldata';

const UiContext = createContext();

const UiContextProvider = ({children}) => {
	const contextValue = {
		Route,
		Routes,
		useLocation,
		Link,
		useNavigate,
		MainNavBar,
		Home,
		CreateAccount,
		Deposit,
		Withdraw,
		Login,
		AllData,
		Card,
		Modal,
		Container,
		Button,
		Navbar
	};
	return (
		<UiContext.Provider value={contextValue}>
			{children}
		</UiContext.Provider>
	);
}
export {UiContextProvider, UiContext}
