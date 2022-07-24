const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.CONNECTION_URL)

const reqString = {
  type: String,
  required: true
}

const SettingsSchema = new mongoose.Schema(
  {
    websiteLogoDisplayPath: reqString,
    githubLink: reqString,
    contactEmail: reqString,
    siteDesc: reqString
  },
  //Collection Name
  { collection: 'mhmdhidrSettings' }
)

const SettingsModel = connection.model('mhmdhidrPortfolio', SettingsSchema)

module.exports = SettingsModel
