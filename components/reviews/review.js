import React from 'react'
import styles from '../_global-settings'
import H3 from 'components/h3'
import P from 'components/paragraph'
import StarRating from 'components/reviews/star-rating'
import UserAge from 'components/reviews/user-age'
import UserGender from 'components/reviews/user-gender'
import UserLengthOwned from 'components/reviews/user-length-owned'
import UserProductRecommended from 'components/reviews/user-product-recommended'

export default class extends React.Component {
	render() {
		// hide the .review__userOptionalData element if it'll contain no data
		const hideOptionalUserData = (!this.props.data.userAgeOpt && !this.props.data.userGenderOpt && !this.props.data.lengthOwnedOpt);
		const hideClass = (hideOptionalUserData ? 'review__userOptionalData--hidden' : '');
		
		return (
			<div className="review">
				<div className="review__info">
					<div className="review__rating"><StarRating rating={this.props.data.productRating} /></div>
					<div className="review__userAlias">{this.props.data.userAlias}</div>
					<div className="review__userLocation">From {this.props.data.userLocation}</div>
					<ul className={'review__userOptionalData '+hideClass}>
						<li className="review__userOptionalDataItem">
							<UserAge optionId={this.props.data.userAgeOpt} />
						</li>
						<li className="review__userOptionalDataItem">
							<UserGender optionId={this.props.data.userGenderOpt} />
						</li>
						<li className="review__userOptionalDataItem">
							<UserLengthOwned optionId={this.props.data.lengthOwnedOpt} />
						</li>
					</ul>
				</div>
				<div className="review__content">
					<h3 className="review__title">{this.props.data.reviewSummary}</h3>
					<P>{this.props.data.reviewBody}</P>
				</div>
				<style jsx>{`
					.review {
						padding: 1.5rem 4rem;
						font-size: 0.8rem;
					}

					.review__info, .review__content {
						display: inline-block;
						vertical-align: top;
					}

					.review__info {
						width: 25%;
					}

					.review__content {
						width: 75%;
					}

					.review__rating {
						font-size: 1.3rem;
						letter-spacing: 3px;
						margin-bottom: 0.4rem;
					}

					.review__userAlias, .review__userLocation, .review__title {
						text-transform: uppercase;
					}

					.review__userAlias, .review__title {
						color: #FF671B;
						font-weight: bold;
					}

					.review__userOptionalData {
						list-style: none;
						padding: 0;
						margin: 0.4rem 0 0 0;
					}

					.review__userOptionalDataItem {
						line-height: 1.5em;
					}

					.review__userOptionalData.review__userOptionalData--hidden {
						display: none;
					}

					.review__title {
						margin-top: 0;
					}
				`}</style>
			</div>
		)
	}
}