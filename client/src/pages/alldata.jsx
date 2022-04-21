import {useContext} from 'react';
import {UserContext} from '../contexts/userContext';
import {UiContext} from '../contexts/uiContext';

function AllData () {
	const userCtx = useContext(UserContext);
	const uiCtx = useContext(UiContext);
	const navigate = uiCtx.useNavigate();
	if(!userCtx.validUser) {
		navigate("/");
		return (<uiCtx.Navigate to="/"/>);
	}
	const client = userCtx.loggedClient.userInfo;
	const transactionsInfo = userCtx.loggedClient.userTransactionsInfo;
	let imageURL = client.image ? client.image : '';
	return (
		<div style={{display: 'flex', justifyContent: 'center', width: '36rem', flexWrap: 'nowrap', flexDirection: 'column', margin: 'auto'}}>
			<uiCtx.Card style={{ width: '100%' }}>
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
			<uiCtx.Card style={{ width: '100%' }}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Title>
						Transactions History
					</uiCtx.Card.Title>
					<uiCtx.Table responsive hover>
						<thead>
							<tr>
								<th>Date</th>
								<th>Description</th>
								<th>Deposit</th>
								<th>Withdraw</th>
							</tr>
						</thead>
						<tbody>
							{transactionsInfo.map(transaction => {
							 return<tr>
								<td>{uiCtx.formatDate(new Date(transaction.date))}</td>
								<td>{transaction.type}</td>
								<td style={{color: 'green'}}>{transaction.type === 'Deposit' ? transaction.amount: ''}</td>
								<td style={{color: 'red'}}>{transaction.type === 'Withdraw' ? transaction.amount: ''}</td>
							</tr>})}
						</tbody>
					</uiCtx.Table>
				</uiCtx.Card.Body>
			</uiCtx.Card>
		</div>
	);
}
export default AllData;