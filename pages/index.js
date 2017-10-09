import React from 'react'
import Link from 'next/link'
import H1 from 'components/h1'
import H2 from 'components/h2'
import H3 from 'components/h3'
import P from 'components/paragraph'
import Vignette from 'components/vignette'
import Layout from 'components/_layout'
import DealerLocator from 'components/dealer-locator/dealer-locator'
import mapStyles from '../styles/mapStyle.json'
import settings from 'components/_global-settings'

export default class extends React.Component {
	render(){
		return(
			<Layout>
				<div className='panes'>
					<div className='pane hero'>
						<Vignette />
						<H1><span className='wht'>Basketball Hoops</span></H1>
						<P><span className='org cpy'>Check out our selection of in-ground and portable hoops.</span></P>
						<Link href='/'><a className='btn cpy'>Shop Now</a></Link>
					</div>
					<div className='pane pane1'>
						<Vignette />
						<H2>
							<Link href='/'>
								<a>
									<span className='org'>Learn About Our </span>
									<span className='wht'>New Technology</span>
								</a>
							</Link>
						</H2>
						<Link href='/'>
							<a><img src='/static/img/stblzr.svg' /></a>
						</Link>
					</div>
					<div className='pane pane2'>
						<Vignette />
						<H2>
							<Link href='/'>
								<a>
									<span className='org'>Find accessories </span>
									<span className='wht'>for your hoop.</span>
								</a>
							</Link>
						</H2>
						<Link href='/'><a className='btn cpy'>Shop Now</a></Link>
					</div>
					<div className='pane spacePane'>
						<H2>
							<span className='org'>It all starts </span>
							<span className='wht'>with a goal</span>
						</H2>
						<img src='/static/img/g-white.svg' />
					</div>
				</div>
				<DealerLocator label="Find a dealer or local store near you" name="dealerLocator-home" brand="goalrilla" mapStyles={mapStyles.styles} distance="30" zip="47713" />
				<style jsx>{`
					.pane{
						min-height: 400px;
						padding: 30px;
						position: relative;
						overflow: hidden;
						& span{
							display: block;
						}
						& *{
							position: relative;
							z-index: 2;
						}
					}
					.hero{
						background: url('/static/img/w_1200/stblzr-dunk.jpg') center center no-repeat;
						background-size: cover;
					}
					.pane1{
						background: url('/static/img/w_1200/stblzr-location.jpg') center center no-repeat;
						background-size: cover;
						& img{
							width: 150px;
							height: 31px;
						}
					}
					.pane2{
						background: url('/static/img/w_1200/yard-guard.jpg') center center no-repeat;
						background-size: cover;
					}
					.pane3{
						background: url('/static/img/w_1200/lifestyle-dunk.jpg') top center no-repeat;
					}
					.spacePane{
						background: url('/static/img/w_1200/texture.jpg') top center no-repeat;
						background-size: cover;
						text-align: right;
						height: auto;
						min-height: 0;
						& img{
							opacity: .2;
							position: absolute;
							height: 200px;
							width: 200px;
							top: 0;
							left: 20px;
						}
					}
					.wht{
						color: #fff;
					}
					.org{
						color: ${settings.orange};
					}
					.cpy{
						position: relative;
						top: -12px;
					}
					.btn{
						color: #fff;
						text-transform: uppercase;
						border: 1px solid #fff;
						display: inline-block;
						padding: 10px;
						font-weight: bold;
						letter-spacing: 2;
						&:hover{
							color: ${settings.orange};
							border-color: ${settings.orange};
						}
					}
					a{
						text-decoration: none;
					}
					@media(min-width:700px){
						.pane{
							min-height: 60vh;
							font-size: 1.2em;
							padding: 50px;
						}
						.spacePane{
							min-height: 300px;
							font-size: 2.5em;
							padding: 120px;
							& img{
								top: auto;
								bottom: 20px;
								width: 400px;
								height: 250px;
							}
						}
					}
				`}</style>
			</Layout>
		)
	}
}
