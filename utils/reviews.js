'use strict'
require('dotenv').config({ silent: true })
const reviewsToJson = require('reviews-to-json')
const ids = require('./get-ids')
const dataStoreConfig = require('../config/reviews.config.json');

console.log('ids:');
console.dir(ids);

// Fetch reviews
reviewsToJson.fetchWriteProductReviews(ids, dataStoreConfig, {
		outputDir: './json/reviews',
		approved: true
	})
	.then(console.log)
