import React from 'react'
import Layout from 'components/_layout'
import Contact from 'components/forms/contact'

export default class extends React.Component {
	constructor(props){
		super(props)
		console.log(props)
		this.id = props.url.query.id
		this.data = require(`../json/markdown/pages/${this.id}.json`)
	}
	render(){
		return (
			<Layout title={ this.data.title }>
				<main>
					<div dangerouslySetInnerHTML={{ __html: this.data.contents }}></div>
					<Contact />
				</main>
				<style jsx>{`
					main{
						max-width: 1200px;
						padding: 30px;
						margin: auto;
					}
				`}</style>
			</Layout>
		)
	}
}
