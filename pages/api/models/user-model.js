const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.CONNECTION_URL)

const reqString = {
  type: String,
  required: true
}

const UserSchema = new mongoose.Schema(
  {
    userEmail: reqString,
    userPassword: reqString
  },
  //Collection Name
  { collection: 'mhmdhidrUsers' }
)

const UserModel = connection.model('mhmdhidrPortfolio', UserSchema)

module.exports = UserModel
