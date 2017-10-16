import env from 'json/env.json'

// Refreshes Zygote info & searches for new links
export default function () {
	if ('zygote' in window) {
		zygote.findButtons()
		zygote.findQty()
		zygote.findIcons()
		if (!zygote.api) {
			zygote.api = env.ZYGOTE_API
			zygote.properties = {
				site: env.ECOMMERCE_API_SITE
			}
		}
	}
}