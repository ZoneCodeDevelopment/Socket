const express = require('express')
const logger  = require('morgan')
const fs      = require('fs')
const app     = express()

app.use(logger('dev'))

const config = JSON.parse(fs.readFileSync('./config.json'))

app.get('/', (req, res) => {
    var key = req.query.key,
        event = req.query.event,
        args = req.query.args

        if(args.indexOf(';') > -1) {
            args = req.query.args.toString().split(';')
        }
    if (key === config.config.KEY) {
        if (event) {
            if (event in config.eventMap) {
                var eventImport = require(`./events/${config.eventMap[event]}`)
                if(eventImport.getPrivate() === false) {
                    eventImport[event](req, res, args)
                } else {
                    res.sendStatus(403)
                }
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(500)
        }
    } else if(key === config.privateConfig.KEY) {
        if (event) {
            if (event in config.eventMap) {
                var eventImport = require(`./events/${config.eventMap[event]}`)
                eventImport[event](req, res, args)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(403)
    }
})

app.listen(config.config.PORT, () => {
    console.log(`[SO] Socket is now listing to port ${config.config.PORT}.`)
})
