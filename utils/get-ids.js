'use strict'
const path = require('path')
const glob = require('glob-promise')

module.exports = uppercase => new Promise((resolve, reject) => {
   glob('./markdown/product/**/*.md')
      .then(files => {
         const ids = []
         files.forEach(file => {
            let name = path.parse(file).name
            if(uppercase){
               name = name.toUpperCase()
            }
            ids.push(name)
         })
         return ids
      })
      .then(resolve)
      .catch(reject)
})
