import React from 'react'
import styled, { keyframes } from 'styled-components'
import settings from 'components/_settings'

const dotStyles = `
	width: 18px;
	height: 18px;
	background-color: ${settings.navy};
	border-radius: 100%;
	display: inline-block;
	margin-right: 7px;
`
const bounce = keyframes`
	0%, 80%, 100% {
		transform: scale(0);
	} 40% {
		transform: scale(1.0);
	}
`

const First = styled.div`
	${dotStyles}
	animation: ${bounce} 1.4s infinite ease-in-out both;
	animation-delay: -0.32s;
`
const Second = styled.div`
	${dotStyles}
	animation: ${bounce} 1.4s infinite ease-in-out both;
	animation-delay: -0.16s;
`
const Third = styled.div`
	${dotStyles}
	margin-right: 0;
	animation: ${bounce} 1.4s infinite ease-in-out both;
`

export default class extends React.Component {
	render(){
		return (
			<div className='root'>
				<First />
				<Second />
				<Third />
				<style jsx>{`
					.root{
						margin: 75px auto;
						width: 70px;
						text-align: center;
					}
					@keyframes bouncedelay {
						0%, 80%, 100% {
							transform: scale(0);
						} 40% {
							transform: scale(1.0);
						}
					}
				`}</style>
			</div>
		)
	}
}
