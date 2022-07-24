const SettingsModel = require(`${__dirname}/../models/settings-model.js`)
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const updateSettings = async (req, res) => {
  const { githubLink, contactEmail, siteDesc, prevLogoImgPath, prevLogoImgName } =
    req.body
  const { settingId } = req.params

  const { websiteLogo } = req.files || ''
  const websiteLogoName = uuidv4() + websiteLogo?.name.split('.')[0] + '.webp' || ''
  let websiteLogoDisplayPath = prevLogoImgPath
  let websiteLogoDisplayName = prevLogoImgName

  if (websiteLogo) {
    //delete the old image from s3 bucket
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: websiteLogoDisplayName
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.json({
          message: err,
          settingUpdated: 0
        })
        return
      }
    })

    //upload the new image to s3 bucket
    sharp(websiteLogo.data)
      .rotate()
      .resize(600)
      .jpeg({ mozjpeg: true, quality: 50 })
      .toBuffer()
      .then(newWebpImg => {
        //changing the old jpg image buffer to new webp buffer
        websiteLogo.data = newWebpImg

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: websiteLogoName,
          Body: newWebpImg,
          ContentType: 'image/webp'
        } //uploading the new webp image to s3 bucket, self executing function
        ;(async () => {
          try {
            const { Location } = await s3.upload(params).promise()

            //saving the new image path to the database
            websiteLogoDisplayPath = Location
            websiteLogoDisplayName = Location.split('.com/')[1]

            await SettingsModel.findByIdAndUpdate(settingId, {
              websiteLogoDisplayPath,
              websiteLogoDisplayName,
              githubLink,
              contactEmail,
              siteDesc
            })
            res.json({
              message: 'Settings Updated Successfully',
              settingUpdated: 1
            })
          } catch (error) {
            res.json({
              message: error,
              settingUpdated: 0
            })
            return
          }
        })()
      })
      .catch(err => {
        res.json({
          message: `Sorry! Something went wrong, check the error => 😥: \n ${err}`,
          settingUpdated: 0
        })
      })
  } else {
    await SettingsModel.findByIdAndUpdate(settingId, {
      githubLink,
      contactEmail,
      siteDesc
    })
    res.json({
      message: 'Settings Updated Successfully',
      settingUpdated: 1
    })
  }
}

const getSettings = async (req, res) => {
  try {
    const settings = await SettingsModel.findOne({})
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(settings)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = { updateSettings, getSettings }
