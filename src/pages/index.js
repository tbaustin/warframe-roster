import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/layouts/default'

export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
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
						<li css={styles.listItem} key={i}>
							<Link to={`/${frontmatter.category}/${frontmatter.id}`}>
								<div className={`banner`}>Banner goes Here</div>
								<div className={`info`}>
									<h1>{frontmatter.title}</h1>
									<div>
										<span>Tier :</span> {frontmatter.subCategory}
									</div>
									<div dangerouslySetInnerHTML={{ __html: html }} />
								</div>
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
		margin: -5px;
	`,
	listItem: css`
		border: 2px solid #ccc;
		border-radius: 10px;
		overflow: hidden;
		margin: 5px;
		transition: all 0.2s ease-in-out;
		flex: 1 0 calc(100%);
		.banner {
			max-height: 200px;
			overflow: hidden;
			position: relative;
			width: 100%;
			:after {
				background-color: rgba(0, 0, 0, 0.2);
				opacity: 0;
				bottom: 0;
				content: '';
				left: 0;
				z-index: 2;
				position: absolute;
				right: 0;
				top: 0;
				transition: opacity 0.3s;
			}
		}
		.info {
			padding: 10px;
			span {
				font-weight: 800;
			}
		}
		:hover {
			box-shadow: 0 10px 15px -10px #333;
			transform: scale(1.015);
			.banner {
				:after {
					opacity: 1;
				}
			}
			.info {
				color: #00008b;
			}
		}
		@media (min-width: 650px) {
			flex: 1 0 calc(100% / 2 - 10px);
		}
		@media (min-width: 1000px) {
			flex: 1 0 calc(100% / 3 - 10px);
		}
	`,
	flex: css`
		display: flex;
		flex-flow: row wrap;
	`
}
