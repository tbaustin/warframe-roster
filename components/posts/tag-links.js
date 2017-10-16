import React from 'react'
import Link from 'next/link'

function cap(str){
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export default class extends React.Component {

	render() {
		if (!this.props.tags || !this.props.tags.length) return ''
		const els = []
		this.props.tags.forEach((tag, key) => {
			els.push(
				<Link href={`/tag?id=${tag}`} as={`/tag/${tag}`} key={key}>
					<a>{cap(tag)}</a>
				</Link>
			)
			els.push(<span key={`${key}-comma`}>, </span>)
		})
		els.pop()
		return (
			<small>
				Tags: {els}
				<style jsx>{`
					small{
						display: block;
						font-size: 1em;
					}
				`}</style>
			</small>
		)
	}
}
