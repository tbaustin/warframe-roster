'use strict'
const express = require('express')
const open = require('open')
const portScanner = require('portscanner')
const server = express()
const path = require('path')

portScanner.findAPortNotInUse(3000, 8080, 8888)
	.then(port => {
		server.use(express.static('dist'))
		server.listen(port)
		open(`http://localhost:${port}`)
	})
