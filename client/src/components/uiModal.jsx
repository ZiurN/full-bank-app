import {UiContext} from '../contexts/uiContext';
import {useContext} from 'react';
import Modal from 'react-bootstrap/Modal';

function UiModal ({show, type, text, children}) {
	const uiCtx = useContext(UiContext);
	let types = {
		'warning': {
			bg : 'warning',
			text : 'white'
		},
		'success': {
			bg : 'success',
			text : 'white'
		},
	}
	return (
		<Modal show={show}>
			<uiCtx.Card className="text-center" bg={types[type].bg} text={types[type].text}>
				<uiCtx.Card.Body>
					<uiCtx.Card.Text>
						{text}
					</uiCtx.Card.Text>
					{children != null && (children)}
				</uiCtx.Card.Body>
			</uiCtx.Card>
		</Modal>
	);
}

export default UiModal;