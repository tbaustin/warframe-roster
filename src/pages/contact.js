import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import buttonMixin from 'styles/mixins/button'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'
import Form from 'components/form'

export default class ContactPage extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.markdownRemark
		return(
			<Layout>
				<Meta
					title={frontmatter.title}
					description={excerpt}
				/>
				<div className={styles}>
					<div dangerouslySetInnerHTML={{ __html: html }} />
					<div className='form'>
						<Form
							success={(
								<div>Thank you for contacting us!</div>
							)}
							form={(
								<>
									<div>
										<input
											type='text'
											name='Name'
											required
										/>
									</div>
									<div>
										<textarea
											name='Message'
											required
										/>
									</div>
									<div>
										<button className={buttonMixin}>Submit</button>
									</div>
								</>
							)}
						/>
					</div>
				</div>
			</Layout>
		)
	}
}

const styles = css`
	label{
		display: block;
	}
	.grecaptcha-badge{
		display: none !important;
	}
`

export const query = graphql`
	query ContactTemplate {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/contact.md/"
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
