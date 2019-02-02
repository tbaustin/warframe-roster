import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layouts/default"

export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
		}
	}
	render() {
		const { productMarkdown } = this.props.data

		console.log(productMarkdown)
		const warframes = productMarkdown.edges.map(({ node }) => node)
		return (
			<Layout>
				<h1>Warframe Roster</h1>
				<ul css={[styles.list, styles.flex]}>
					{warframes.map(({ frontmatter, html }, i) => (
						<li key={i}>
							<Link to={`/${frontmatter.category}/${frontmatter.id}`}>
								<h1>{frontmatter.title}</h1>
								<div>Tier: {frontmatter.subCategory}</div>
								<div dangerouslySetInnerHTML={{ __html: html }} />
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export const query = graphql`
	query HomePage {
		...productFragment
	}
`

const styles = {
	list: css`
		list-style: none;
		padding: 0;
		margin: 0;
	`,
	flex: css`
		display: flex;
		flex-flow: row wrap;
	`,
}
