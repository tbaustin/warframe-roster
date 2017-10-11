import React from 'react'
import Layout from 'components/_layout'
import Link from 'next/link'

export default class extends React.Component {
	render(){
		return(
			<Layout>
				<Link href='/product?id=a6czl1015r' as='/product/a6czl1015r' prefetch>
					<a>Product</a>
				</Link>
				<style jsx>{`

				`}</style>
			</Layout>
		)
	}
}
