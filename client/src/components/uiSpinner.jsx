import Spinner from 'react-bootstrap/Spinner';

function UiSpinner ({show}) {
	let className = show ? 'ui-spinner' : 'ui-spinner-hidden';
	return (
		<div className={className}>
			<Spinner animation="border" variant="secondary" />
		</div>
	);
}

export default UiSpinner;