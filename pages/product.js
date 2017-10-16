import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/images/cloudinary'
import AddToCart from 'components/add-cart-button'

export default class extends React.Component {
	constructor(props){
		super(props)
	}
	static async getInitialProps(req) {
		let product = require(`../json/product/${req.query.id}`)
		return product
	}
	render(){
		return(
			<Layout>
				<h1>{this.props.title}</h1>
				{this.props.images && this.props.images.length &&
					<img src={cloudinary(this.props.images[0], 'w_200')} />
				}
				<AddToCart
					id={this.props.id}
					/>
			</Layout>
		)
	}
}
