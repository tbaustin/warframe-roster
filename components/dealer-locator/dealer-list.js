import React from 'react'
import settings from 'components/_settings'
import DealerItem from 'components/dealer-locator/dealer-item'

function getDealerHtml(dealer, index) {
	return (
		<li key={dealer.id} className={'dealerList__item'}>
			<DealerItem dealer={dealer} index={index} />
		</li>
	);
}
export default class extends React.Component {
	render() {
		const dealersRegular = (Array.isArray(this.props.dealers) ? this.props.dealers : [])
		.filter(dealer => dealer.dealerLevel !== 'platinum')
		.map(getDealerHtml);

		const dealersPlatinum = (Array.isArray(this.props.dealers) ? this.props.dealers : [])
		.filter(dealer => dealer.dealerLevel === 'platinum')
		.map(getDealerHtml);

		return (
			<div className="dealerList">
				<div className="dealerList__section">
					<ul className="dealerList__list dealerList__list--regular">
						{dealersRegular}
					</ul>
				</div>
				<style jsx>{`
					.dealerList__section {
						box-sizing: border-box;
						position: relative;
						top: 5rem;
						display: inline-block;
						vertical-align: top;
						border-right: 4px solid ${settings.navy};
						width: 100%;
						height: calc(800px - 5rem);
						overflow-y: scroll;
						margin: 0;
						padding: 0;
						background: rgba(41,86,116, 0.8);
					}

					.dealerList__list {
						list-style: none;
						margin: 0;
						padding: 0;
					}

					@media (max-width: 1000px) {
						.dealerList__list {
							position: static;
							width: 100%;
							height: 400px;
						}

						.dealerList__section {
							top: 0;
						}
					}
				`}</style>
			</div>
		)
	}
}