'use strict'
const getIds = require('./get-ids')
const getProduct = require('./get-product')
module.exports = () => {
   return getIds().map(id => {
      return getProduct(id)
   })
}
