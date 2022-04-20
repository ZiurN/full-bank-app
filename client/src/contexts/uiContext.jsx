import {createContext} from "react";
/** Router */
import {Route, Routes, useLocation, Link, useNavigate, Navigate} from "react-router-dom";
/** UI Bootstrap Components */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
/** UI Custom components */
import MainNavBar from '../components/mainNavbar';
import UiModal from '../components/uiModal';
import UiSpinner from '../components/uiSpinner';
/** UI Custom Pages */
import Home from '../pages/home';
import CreateAccount from '../pages/createAccount';
import Deposit from '../pages/deposit';
import Withdraw from '../pages/withdraw';
import Login from '../pages/login';
import AllData from '../pages/alldata';
/** CSS */
import '../App.css';

const UiContext = createContext();

const UiContextProvider = ({children}) => {
	const contextValue = {
		Route,
		Routes,
		useLocation,
		Link,
		useNavigate,
		Navigate,
		MainNavBar,
		UiModal,
		UiSpinner,
		Home,
		CreateAccount,
		Deposit,
		Withdraw,
		Login,
		AllData,
		Card,
		Container,
		Button,
		Navbar,
		Carousel,
		Alert,
		Stack,
		ListGroup
	};
	return (
		<UiContext.Provider value={contextValue}>
			{children}
		</UiContext.Provider>
	);
}
export {UiContextProvider, UiContext}
