import React from 'react';
import {UserContext} from '../contexts/userContext';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Navigate, useNavigate} from "react-router-dom";

function AllData () {
	const ctx = React.useContext(UserContext);
	const navigate = useNavigate();
	if(!ctx.validUser) {
		navigate("/");
		return (<Navigate to="/"/>);
	}
	const client = ctx.loggedClient;
	let imageName = client.image ? client.name : 'newUser';
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card style={{ width: '36rem' }}>
				<Card.Body>
					<Card.Title>
						Welcome to the BadBank <span style={{color: '#CE6784'}} >{client.name.toUpperCase()}</span>
					</Card.Title>
					<Stack direction="horizontal" gap={2} style={{paddingTop: '2rem'}}>
						<div style={{borderRadius: '50%', overflow: 'hidden', width : '25%'}}>
							<img
								className="d-block w-100"
								src={window.location.origin + '/images/' + imageName + '.jpg'}
								alt="First slide"
							/>
						</div>
						<ListGroup variant="flush" style={{width : '75%'}}>
							<ListGroup.Item><span style={{color: '#CE6784'}} >Name: </span>{client.name.toUpperCase()}</ListGroup.Item>
							<ListGroup.Item><span style={{color: '#CE6784'}} >Email: </span>{client.email}</ListGroup.Item>
							<ListGroup.Item><span style={{color: '#CE6784'}} >Balance: </span>$ {client.balance}</ListGroup.Item>
						</ListGroup>
					</Stack>
				</Card.Body>
			</Card>
		</div>
	);
}
export default AllData;