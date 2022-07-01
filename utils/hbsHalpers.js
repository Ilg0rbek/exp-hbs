const moment = require('moment')

const hbsHalpers = (handlebars) => {
    handlebars.registerHelper('formatDate', (date) => {
        return new handlebars.SafeString(
            moment(date).format('DD.MM.YYYY').toUpperCase()
        )
    })
}
module.exports = hbsHalpers