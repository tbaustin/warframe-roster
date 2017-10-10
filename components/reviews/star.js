import React from 'react'
import styles from '../_global-settings'

export default class extends React.Component {
	render() {
		const fill = parseInt(this.props.fill);
		const classFill = (fill === 1 ? 'star--filled' : '');
		const entity = '\u2605'
		return (
			<div className={'star '+classFill}>
				{entity}
				<style jsx>{`
					.star {
						display: inline-block;
						color: grey;
					}

					.star--filled {
						color: orange;
					}
				`}</style>
			</div>
		)
	}
}