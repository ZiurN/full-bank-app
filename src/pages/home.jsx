import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel'
function Home () {
	return (
		<Card>
			<Card.Body>
				<Carousel variant="dark">
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide0.png'}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h5>BAD BANK</h5>
							<p>Because the safety of your money is not important</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide1.png'}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h5>Do you want to save your money with us?</h5>
							<p>Think about it</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide2.png'}
							alt="Second slide"
						/>
						<Carousel.Caption>
							<h5>Probably your money will be stolen</h5>
							<p>How can we protect it from bad people?</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
						className="d-block w-100 slide-img"
						src={window.location.origin + '/images/slide3.png'}
						alt="Third slide"
						/>
						<Carousel.Caption>
							<h5>You will be bankrupt</h5>
							<p>bet your money at the casino would be a better investment option</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 slide-img"
							src={window.location.origin + '/images/slide4.png'}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h5>It would be like burning your money</h5>
							<p>Please, spend your money with your family, indeed!</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<div className="home-text-container">
					<h1>WELCOME TO BAD BANK</h1>
					<p>This bank is the most unsecure bank of the world, if you want to flip a coin, being sure you will lose, this is your bank</p>
				</div>
			</Card.Body>
		</Card>
	);
}
export default Home;