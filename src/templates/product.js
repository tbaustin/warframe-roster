import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/default"

export default class ProductTemplate extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		const {
			props: {
				data: {
					markdownRemark: { frontmatter },
				},
			},
		} = this

		const { title } = frontmatter
		return (
			<Layout title={title} description={`Warframe - ${title}`}>
				Warframe
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductTemplate($id: String!) {
		markdownRemark(frontmatter: { id: { eq: $id } }) {
			frontmatter {
				title
				id
			}
			html
		}
	}
`
