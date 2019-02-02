import React from "react"
import { graphql } from "gatsby"
// import Link from "gatsby-link"
import Layout from "../components/layouts/default"

export default class ProductCategoryTemplate extends React.Component {
	render() {
		const {
			data: {
				// productMarkdown,
				categoryMarkdown: {
					frontmatter,
					// html,
					excerpt,
				},
			},
		} = this.props
		const { title } = frontmatter
		return (
			<Layout title={title} description={excerpt}>
				<h1>{title}</h1>
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!) {
		productMarkdown: allMarkdownRemark(
			filter: {
				frontmatter: { category: { eq: $category }, published: { eq: true } }
			}
			sort: { order: DESC, fields: [frontmatter___order] }
		) {
			edges {
				node {
					frontmatter {
						id
						title
					}
					fields {
						path
					}
				}
			}
		}
		categoryMarkdown: markdownRemark(frontmatter: { id: { eq: $category } }) {
			frontmatter {
				title
			}
			html
			excerpt(pruneLength: 175)
		}
	}
`
