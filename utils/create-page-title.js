'use strict'
module.exports = (siteTitle, siteDescription, pageTitle, delimeter = ' | ') => {
	if (pageTitle) {
		return `${pageTitle}${delimeter}${siteTitle}`
	}
	if (siteDescription) {
		return `${siteTitle}${delimeter}${siteDescription}`
	}
	return siteName
}