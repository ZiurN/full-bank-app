import {useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function AllData () {
	const ctx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
	if(!ctx.validUser) {
		navigate("/");
		return (<uiCtx.Navigate to="/"/>);
	}
	const client = ctx.loggedClient;
	let imageURL = client.image ? client.image : '';
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<uiCtx.Card style={{ width: '36rem' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>
						Welcome to the BadBank <span style={{color: '#CE6784'}} >{client.name.toUpperCase()}</span>
					</uiCtx.Card.Title>
					<uiCtx.Stack direction="horizontal" gap={2} style={{paddingTop: '2rem'}}>
						<div style={{borderRadius: '50%', overflow: 'hidden', width : '25%'}}>
							<img
								className="d-block w-100"
								src={imageURL}
								alt="First slide"
							/>
						</div>
						<uiCtx.ListGroup variant="flush" style={{width : '75%'}}>
							<uiCtx.ListGroup.Item><span style={{color: '#CE6784'}} >Name: </span>{client.name.toUpperCase()}</uiCtx.ListGroup.Item>
							<uiCtx.ListGroup.Item><span style={{color: '#CE6784'}} >Email: </span>{client.email}</uiCtx.ListGroup.Item>
							<uiCtx.ListGroup.Item><span style={{color: '#CE6784'}} >Balance: </span>$ {client.balance}</uiCtx.ListGroup.Item>
						</uiCtx.ListGroup>
					</uiCtx.Stack>
				</uiCtx.Card.Body>
			</uiCtx.Card>
		</div>
	);
}
export default AllData;