import React from 'react'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			hideClass: ''
		}
		this.close = this.close.bind(this)
	}
	close(e){
		e.preventDefault()
		if(this.props.onClose){
			this.props.onClose()
		}
	}
	boxClick(e){
		e.stopPropagation()
	}
	render(){
		if(this.props.open === false){
			return null
		}
		return (
			<div className={this.state.hideClass + ' root'} onClick={this.close} role='dialog'>
				<div className='box' onClick={this.boxClick}>
					<button onClick={this.close}>&times;</button>
					{this.props.children}
				</div>
				<style>{`
					body{
						overflow: hidden;
					}
				`}</style>
				<style jsx>{`
					.root{
						z-index: 9;
						background-color: rgba(0, 0, 0, .5);
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						overflow: scroll;
					}
					.box{
						background-color: #fff;
						max-width: 900px;
						margin: auto;
						padding: 30px;
						position: relative;
					}
					.hide{
						display: none;
					}
					button{
						background: transparent;
						border: 0;
						outline: 0;
						font-size: 2em;
						position: absolute;
						top: 15px;
						right: 15px;
						line-height: 23px;
						cursor: pointer;
					}
					@media(min-width: 1000px){
						.box{
							margin: 30px auto;
						}
					}
				`}</style>
			</div>
		)
	}
}
