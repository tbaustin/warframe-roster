import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/cloudinary'

export default class extends React.Component {
	constructor(props){
		super(props)
	}
	static async getInitialProps(req) {
		let product = require(`../json/category/${req.query.id}`)
		console.log(product)
		return {
			id: req.query.id,
			product: product
		}
	}
	render(){
		return(
			<Layout>
				<h1>{this.props.id}</h1>
			</Layout>
		)
	}
}
