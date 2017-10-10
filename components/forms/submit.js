import React from 'react'
import styles from '../_settings'

export default class extends React.Component {
	render(){
		return (
			<div>
				<input value={this.props.value || 'Submit'} type="submit" />
				<style jsx>{`
					input{
						background-color: ${styles.white};
						color: ${styles.black};
						border: 1px solid ${styles.black};
						padding: ${styles.smallPadding};
						cursor: pointer;
						user-select: none;
						line-height: ${styles.lineHeight};
						font-size: .75em;
						font-family: ${styles.mainFont};
						text-transform: uppercase;
						font-weight: bold;
						outline: 0;
						width: auto;
						margin-bottom: 20px;
						&:hover, &:active, &:focus{
							background-color: ${styles.black};
							color: ${styles.white};
						}
					}
				`}</style>
			</div>
		)
	}
}
