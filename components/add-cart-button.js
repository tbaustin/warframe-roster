import React from 'react'
import settings from 'components/_settings'
import fetch from 'isomorphic-fetch'
import fetchStock from 'utils/product/get-stock'
import env from 'json/env.json'
import zygoteRefresh from 'utils/next/zygote-refresh'

// How often real time stock updates, min/sec/mili
const updateStockInterval = 20 * 60 * 1000

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stock: false
		}
		this.updateStock = this.updateStock.bind(this)
		this.setStock = this.setStock.bind(this)
	}
	updateStock() {
		if (env.ENABLE_ECOMMERCE) {
			fetchStock()
				.then(stock => {
					window.productStock = stock
					this.setStock(stock)
				})
				.catch(err => { throw err })
		}
	}
	componentDidMount() {
		if (env.ENABLE_ECOMMERCE) {
			if (!window.productStock) {
				this.updateStock()
				setInterval(this.updateStock, updateStockInterval)
			}
			else if (typeof window.productStock === 'object') {
				this.setStock(window.productStock)
			}
		}
	}
	setStock(stock) {
		this.setState({ stock: stock })
		zygoteRefresh()
	}
	render() {
		return (
			<div>
				{this.state.stock[this.props.id] > 0 &&
					<button
						className={this.state.stock === false && 'loading'}
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
						Add to Cart
					</button>
				}
				{this.state.stock[this.props.id] === 0 &&
					<span>Out of Stock</span>
				}
				<style jsx>{`
					button {
						border: 0;
						padding: 0.7rem 2rem;
						font-size: 1.7rem;
						text-transform: uppercase;
						font-family: 'Oswald';
						background: ${settings.navy};
						color: #fff;
						cursor: pointer;
					}
					.loading{
						visibility: hidden;
					}
					span{
						text-transform: uppercase;
					}
				`}</style>
			</div>
		)
	}
}