import {UiContext} from '../contexts/uiContext';
import {useContext} from 'react';

function Home () {
	const uiCtx = useContext(UiContext);
	return (
		<uiCtx.Card>
			<uiCtx.Card.Body>
				<uiCtx.Carousel variant="dark">
					<uiCtx.Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide0.png'}
							alt="First slide"
						/>
						<uiCtx.Carousel.Caption>
							<h5>BAD BANK</h5>
							<p>Because the safety of your money is not important</p>
						</uiCtx.Carousel.Caption>
					</uiCtx.Carousel.Item>
					<uiCtx.Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide1.png'}
							alt="First slide"
						/>
						<uiCtx.Carousel.Caption>
							<h5>Do you want to save your money with us?</h5>
							<p>Think about it</p>
						</uiCtx.Carousel.Caption>
					</uiCtx.Carousel.Item>
					<uiCtx.Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide2.png'}
							alt="Second slide"
						/>
						<uiCtx.Carousel.Caption>
							<h5>Probably your money will be stolen</h5>
							<p>How can we protect it from bad people?</p>
						</uiCtx.Carousel.Caption>
					</uiCtx.Carousel.Item>
					<uiCtx.Carousel.Item interval={3000}>
						<img
						className="d-block w-100 slide-img"
						src={window.location.origin + '/images/slide3.png'}
						alt="Third slide"
						/>
						<uiCtx.Carousel.Caption>
							<h5>You will be bankrupt</h5>
							<p>bet your money at the casino would be a better investment option</p>
						</uiCtx.Carousel.Caption>
					</uiCtx.Carousel.Item>
					<uiCtx.Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide4.png'}
							alt="Third slide"
						/>
						<uiCtx.Carousel.Caption>
							<h5>It would be like burning your money</h5>
							<p>Please, spend your money with your family, indeed!</p>
						</uiCtx.Carousel.Caption>
					</uiCtx.Carousel.Item>
				</uiCtx.Carousel>
				<div className="home-text-container">
					<h1>WELCOME TO BAD BANK</h1>
					<p>This bank is the most unsecure bank of the world, if you want to flip a coin, being sure you will lose, this is your bank</p>
				</div>
			</uiCtx.Card.Body>
		</uiCtx.Card>
	);
}
export default Home;