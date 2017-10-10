import React from 'react'

export default class extends React.Component {
	static defaultProps = {
		uiColor: 'white',
		showInfo: 0,
		modestBranding: 1,
		autoHide: 1,
		related: 0,
		standard: false
	}
	render(){
		const outerClasses = [ 'outer' ]
		if(this.props.standard) outerClasses.push('standard')
		return (
			<div className={outerClasses.join(' ')}>
				<div className='inner'>
					<iframe frameBorder="0" height="315" src={`https://www.youtube.com/embed/${this.props.id}?color=${this.props.uiColor}&rel=${this.props.related}&showinfo=${this.props.showInfo}&modestbranding=${this.props.modestBranding}&autohide=${this.props.autoHide}`} width="560" allowFullScreen></iframe>
				</div>
				<style jsx>{`
					.outer{
						margin: 15px 0;
						&:after{
							content: ' ';
							clear: both;
							display: block;
						}
					}
					.standard{
						& .inner{
							padding-bottom: 75%;
						}
					}
					.inner{
						padding-bottom: 56.25%;
						position: relative;
						height: 0;
						margin: 0 0 1rem 0;
						overflow: hidden;
					}
					iframe{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border: 0;
					}
				`}</style>
			</div>
		)
	}
}
