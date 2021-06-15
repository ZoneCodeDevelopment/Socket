const fs = require('fs')


module.exports = {

    async testSocket(req, res, args) {
        res.send('[SO] The Socket is ready to use!')
    },

    getPrivate() {
        const isPrivate = false;
        return isPrivate
    }

}