import React from 'react'
import styles from '../_global-settings'
import H2 from 'components/h2'
import Review from 'components/reviews/review'
import StarRating from 'components/reviews/star-rating'

export default class extends React.Component {
	render() {
		const reviews = this.props.reviews.map((review, index) => (
			<div className="review"><Review data={review} />
				<style jsx>{`
					.review {
						margin-bottom: 1rem;
					}
				`}</style>
			</div>
		));

		let trimmedReviews = reviews;
		if (this.props.length) {
			trimmedReviews = reviews.slice(0, this.props.length);
		}

		// hide 'load more' button if all reviews are displayed
		const hideLoadClass = (parseInt(this.props.length) >= reviews.length ? ' reviewList__loadMore--hidden' : '');

		return (
			<div className="reviewList">
				<div className="reviewList__header">
					<div className="reviewList__title">
						<H2>{this.props.title}</H2>
					</div>
					<div className="reviewList__writeReview">
						<a href="#" className="reviewList__writeReviewLink">Write a review</a>
					</div>
				</div>
				<div className="reviewList__stats">
					<div className="reviewList__average">
						<div className="reviewList__averageStars"><StarRating rating={this.props.average} /></div>
						<div className="reviewList__averageNum">{parseInt(this.props.average).toFixed(1)}</div>
					</div>
					<div className="reviewList__amount">
						{this.props.reviews.length + (this.props.reviews.length > 1 ? ' reviews' : ' review')}
					</div>
				</div>
				<div className="reviewList__reviews">
					{trimmedReviews}
				</div>
				<button className={'reviewList__loadMore' + hideLoadClass} onClick={this.props.loadMore}>Load more</button>
				<style jsx>{`
					.reviewList__title {
						text-transform: uppercase;
					}

					.reviewList__header, .reviewList__reviews, .reviewList__stats {
						padding: 0 5rem;
					}
					.reviewList__title, .reviewList__writeReview, .reviewList__average, .reviewList__amount {
						display: inline-block;
						vertical-align: middle;
						width: 50%;
					}

					.reviewList__writeReview, .reviewList__amount {
						text-align: right;
					}

					.reviewList__writeReviewLink {
						padding: 0.5rem 1rem;
						text-transform: uppercase;
						text-decoration: none;
						background: #FF671B;
						color: #fff;
					}

					.reviewList__stats {
						background: #f1f2f2; 
						padding-top: 0.3rem;
						padding-bottom: 0.3rem;
					}

					.reviewList__amount {
						text-transform: uppercase;
						font-weight: bold;
					}

					.reviewList__averageStars, .reviewList__averageNum {
						display: inline-block;
						vertical-align: middle;
					}

					.reviewList__averageNum {
						margin-left: 0.7rem;
						font-weight: bold;
					}

					.reviewList__loadMore {
						display: block;
						margin: 0 auto 3rem auto;
						padding: 0.5rem 3rem;
						border-width: 0 0 1px 0;
						border-style: solid;
						border-color: #000;
						font-size: 1rem;
						text-transform: uppercase;
						font-weight: bold;
						background: transparent;
						cursor: pointer;
					}

					.reviewList__loadMore.reviewList__loadMore--hidden {
						display: none;
					}
				`}</style>
			</div>
		)
	}
}
