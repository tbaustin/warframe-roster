import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { createHash } from 'crypto'

const {
	JWT_SIGNING_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_USERNAME,
	CLOUDINARY_API_SECRET,
} = process.env

export function handler(body, context, callback){

	const { nf_jwt } = parse(body.headers.cookie)

	try{
		const {
			app_metadata: {
				roles,
			},
		} = jwt.verify(nf_jwt, JWT_SIGNING_SECRET)
		if(roles.indexOf(`admin`) === -1){
			throw `Admin role not found`
		}
		const ts = Math.round((new Date()).getTime() / 1000)
		const sigString = `cloud_name=${CLOUDINARY_CLOUD_NAME}&timestamp=${ts}&username=${CLOUDINARY_USERNAME}${CLOUDINARY_API_SECRET}`
		const signature = createHash(`sha256`).update(sigString).digest(`hex`)
		console.log(`signature`, signature)
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				signature,
			}),
		})
	}
	catch(err){
		console.error(err)
		callback(null, {
			statusCode: 403,
			body: JSON.stringify({
				success: false,
			}),
		})
	}


}