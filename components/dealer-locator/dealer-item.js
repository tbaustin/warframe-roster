import React from 'react'
import Link from 'next/link'
import settings from 'components/_settings'
import Button from 'components/forms/button'

export default class extends React.Component {
	render() {
		const dealer = this.props.dealer;

		const dealerVariantClass = dealer.dealerLevel === 'platinum' ? ' dealer--platinum' : '';
		// check for first in list
		const firstItemClass = this.props.index === 0 ? ' dealer--first' : '';
		const distanceDisplayClass = dealer.distance ? ' dealer__distance--show' : '';
		const websiteDisplayClass = dealer.web ? ' dealer__website--show' : '';
		const emailDisplayClass = dealer.email ? ' dealer__email--show' : '';
		const phoneDisplayClass = dealer.phone ? ' dealer__phone--show' : '';
	
		const distDisplay = dealer.distance ? dealer.distance.toFixed(2) : '';

		const quoteButton = dealer.dealerLevel === 'platinum' ? (
			<div className="dealer__quote">
				<Link href="/quote">
					<Button>
						Inquire for sale pricing
					</Button>
				</Link>
				<style jsx>{`
					.dealer__quote {
						margin: 2rem 0 0 0;
					}
				`}</style>
			</div>
		) : '';

		return (
			<div className={'dealer'+dealerVariantClass+firstItemClass}>
				<h1 className="dealer__name">{dealer.name}</h1>
				<div className={'dealer__distance'+distanceDisplayClass}>{distDisplay} miles</div>
				<address className="dealer__address">
					{dealer.address.address}<br />
					{dealer.address.city}, {dealer.address.state} {dealer.address.zip} {dealer.address.country}
				</address>
				<div className="dealer__contact">
					<div className={'dealer__website'+websiteDisplayClass}>
						<a href={dealer.web}>{dealer.web}</a>
					</div>
					<div className={'dealer__email'+emailDisplayClass}>
						<a href={'mailto:'+dealer.email}>{dealer.email}</a>
					</div>
					<div className={'dealer__phone'+phoneDisplayClass}>
						<a href={'tel:'}>{dealer.phone}</a>
					</div>
					{quoteButton}
				</div>
				<style jsx>{`
					a {
						color: ${settings.red};
					}

					.dealer {
						box-sizing: border-box;
						border-top: 4px solid ${settings.navy};
						padding: 1.5rem 2rem 1.5rem 1.5rem;
						word-wrap: break-word;
						background: ${settings.white};
						color: ${settings.black};
					}

					.dealer.dealer--first {
						border-top-width: 0;
					}

					.dealer__name, .dealer__distance.dealer__distance--show {
						margin-bottom: 0.3rem;
					}

					.dealer__name {
						margin-top: 0;
						font-size: 1.2rem;
						text-transform: uppercase;
						color: ${settings.black};
					}

					.dealer__distance, .dealer__website, .dealer__email, .dealer__phone {
						display: none;
					}

					.dealer__distance.dealer__distance--show, .dealer__website.dealer__website--show, .dealer__email.dealer__email--show, .dealer__phone.dealer__phone--show {
						display: block;
					}

					.dealer__distance.dealer__distance--show {
						font-weight: bold;
					}

					.dealer__address {
						margin-bottom: 1rem;
						font-style: normal;
					}

					.dealer__address, .dealer__contact {
						font-size: 0.8rem;
					}

					@media (max-width: 1000px) {
						.dealer__address {
							margin: 1.5rem 0;
						}
					}
				`}</style>
			</div>
		)
	}
}