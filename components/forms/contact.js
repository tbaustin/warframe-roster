import React from 'react'
import Input from 'components/forms/input'
import Email from 'components/forms/email'
import Textarea from 'components/forms/textarea'
import Button from 'components/forms/button'
import Form from 'components/forms/form'

export default class extends React.Component{
	render(){
		return (
			<Form name='contact' netlify='true' action='thank-you'>
				<div>
					<Input label='Your Name:' name='name' required />
					<Email label='Your Email:' name='email' required />
					<Textarea label='Message:' name='message' required />
					<Button type='submit' />
				</div>
			</Form>
		)
	}
}
