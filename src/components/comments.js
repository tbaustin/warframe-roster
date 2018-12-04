import React from 'react'
import { css } from 'emotion'
import Gravatar from 'react-gravatar'
import formatDateTime from '../functions/format-date-time'

const avatarSize = 75

export default class Comments extends React.Component{
	render(){
		const { comments } = this.props
		const hasComments = !!comments.length
		return (
			<>
				<h3>Comments:</h3>
				{hasComments && (
					<div className={styles.commentsList}>
						{comments.map(({
							node: {
								comment: {
									childMarkdownRemark: {
										html,
									},
								},
								name,
								md5,
								date,
							},
						}, index) => {
							return (
								<div className={styles.columns} key={`comment${index}`}>
									<div>
										<Gravatar
											md5={md5}
											rating='pg'
											default='mp'
											size={avatarSize}
										/>
									</div>
									<div>
										<h4 className={styles.name}>{name}</h4>
										<time
											dateTime={date}
											className={styles.time}
										>
											{formatDateTime(date)}
										</time>
										<div dangerouslySetInnerHTML={{ __html: html }} />
									</div>
								</div>
							)
						})}
					</div>
				)}
				{!hasComments && (
					<div>There are no comments for this post.</div>
				)}
			</>
		)
	}
}


const styles = {
	commentsList: css`
		> div{
			border-top: 1px solid #ccc;
			padding: 20px 0;
			:first-of-type{
				border-top: 0;
			}
		}
	`,
	name: css`
		margin: 0;
	`,
	time: css`
		font-size: .75em;
	`,
	columns: css`
		display: flex;
		> div{
			:first-of-type{
			width: ${avatarSize}px;
			}
			:last-of-type{
				padding-left: 30px;
				width: calc(100% - ${avatarSize}px);
			}
		}
	`,
}