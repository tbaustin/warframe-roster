import React from 'react'
import styled, { keyframes } from 'styled-components'
import settings from 'components/_settings'

const anim = keyframes`
	from{
		transform: translate(-100%, 0);
	}
	to{
		transform: translate(0%, 0);
	}
`
const Bar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: #000;
	transform: translate(-100%, 0);
	animation: ${anim} 3s linear infinite;
`

export default class extends React.Component {
	render(){
		return (
			<div className={this.props.loading && 'loading'} style={{zIndex: 100}}>
				{this.props.loading && <Bar />}
				<style jsx>{`
					div{
						box-sizing: border-box;
						position: fixed;
						top: 0;
						right: 0;
						left: 0;
						height: 9px;
						overflow: hidden;
						background-color: #fff;
						display: none;
					}
					.loading{
						display: block;
					}
					@media(min-width: 1024px){
						div{
							right: 1px;
							left: 91px;
							background-color: transparent;
						}
					}
				`}</style>
			</div>
		)
	}
}
