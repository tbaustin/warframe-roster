import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import excerpt from 'excerpt-html'

export default class extends React.Component {
	render(){
		return (
			<section>
				<h2>
					<Link href={`/post?id=${this.props.data.permalink}`} as={`/post/${this.props.data.permalink}`}>
						<a>
							{this.props.data.title}
						</a>
					</Link>
				</h2>
				<small>{moment(this.props.data.date).format('MMMM Do YYYY')}</small>
				<p>
					<Link href={`/post?id=${this.props.data.permalink}`} as={`/post/${this.props.data.permalink}`}>
						<a>
							{excerpt(this.props.data.contents, { pruneLength: 300 })}
						</a>
					</Link>
				</p>
				<style jsx>{`
					h2{
						margin-bottom: 2px;
						margin-top: 0;
					}
					p{
						margin: 5px 0 7px 0;
					}
					small{
						display: block;
						font-size: .9em;
					}
					section{
						margin-bottom: 30px;
					}
				`}</style>
			</section>
		)
	}
}
