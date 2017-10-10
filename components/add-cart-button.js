import React from 'react'
import settings from 'components/_settings'

export default class extends React.Component {
	render() {
		return (
			<button
				className="addToCart"
				style={this.props.style || {}}
				onClick={this.props.handleClick}
				data-id={this.props.id}
				data-name={this.props.name}
				data-price={this.props.price}
				data-img={this.props.img}
				data-url={this.props.url}
				data-desc={this.props.desc}
				data-qty={this.props.quantity}
				data-open-cart
				>
				Add to cart
				<style jsx>{`
					.addToCart {
						border: 0;
						padding: 0.7rem 2rem;
						font-size: 1.7rem;
						text-transform: uppercase;
						font-family: 'Oswald';
						background: ${settings.navy};
						color: #fff;
						cursor: pointer;
					}
				`}</style>
			</button>
		)
	}
}