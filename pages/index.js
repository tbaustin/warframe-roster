import React from 'react'
import Layout from 'components/_layout'
import Link from 'next/link'

export default class extends React.Component {
	render(){
		return(
			<Layout>
				<div>
					<Link href='/product?id=a6czl1015r' as='/product/a6czl1015r' prefetch>
						<a>Product</a>
					</Link>
				</div>
				<div>
					<Link href='/category?id=traditional' as='/category/traditional' prefetch>
						<a>Category</a>
					</Link>
				</div>
			</Layout>
		)
	}
}
