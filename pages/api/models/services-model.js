const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.CONNECTION_URL)

const reqString = {
  type: String,
  required: true
}

const ServicesSchema = new mongoose.Schema(
  {
    serviceName: reqString,
    servicePrice: reqString,
    serviceFeatures: reqString
  },
  { collection: 'mhmdhidrServices' }
)

const servicesModel = connection.model('mhmdhidrPortfolio', ServicesSchema)

module.exports = servicesModel
