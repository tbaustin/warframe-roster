'use strict'
const express = require('express')
const open = require('open')
const portScanner = require('portscanner')
const server = express()
const ports = require('./ports')

portScanner.findAPortNotInUse(ports)
	.then(port => {
		server.use(express.static('dist'))
		server.listen(port)
		open(`http://localhost:${port}`)
	})
