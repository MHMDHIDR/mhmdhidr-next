const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.CONNECTION_URL)

const reqString = {
  type: String,
  required: true
}

const WorkSchema = new mongoose.Schema(
  {
    workImgDisplayPath: reqString,
    workImgDisplayName: reqString,
    workName: reqString,
    workGithub: reqString,
    workOnlineLink: reqString,
    workDate: {
      type: Date,
      required: true
    },
    workDesc: reqString
  },
  //Collection Name
  { collection: 'mhmdhidrWorks' }
)

const WorkModel = connection.model('mhmdhidrPortfolio', WorkSchema)

module.exports = WorkModel
