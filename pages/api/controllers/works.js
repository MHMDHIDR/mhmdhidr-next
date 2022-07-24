const WorksModel = require(`${__dirname}/../models/work-model.js`)
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const addWork = async (req, res) => {
  const { workName, workGithub, workOnlineLink, workDesc } = req.body
  const { workImg } = req.files
  const workImgName = uuidv4() + workImg.name.split('.')[0] + '.webp'

  let workImgDisplayPath, workImgDisplayName

  const works = new WorksModel({
    workImgDisplayPath,
    workImgDisplayName,
    workName,
    workGithub,
    workOnlineLink,
    workDesc
  })

  sharp(workImg.data)
    .rotate()
    .resize(600)
    .jpeg({ mozjpeg: true, quality: 50 })
    .toBuffer()
    .then(newWebpImg => {
      //changing the old jpg image buffer to new webp buffer
      workImg.data = newWebpImg

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: workImgName,
        Body: newWebpImg,
        ContentType: 'image/webp'
      } //uploading the new webp image to s3 bucket, self executing function
      ;(async () => {
        try {
          const { Location } = await s3.upload(params).promise()

          //saving the new image path to the database
          works.workImgDisplayPath = Location
          works.workImgDisplayName = Location.split('.com/')[1]
          await works.save()

          res.json({
            message: 'Work added successfully',
            workAdded: 1
          })
        } catch (error) {
          res.json({
            message: error,
            workAdded: 0
          })
          return
        }
      })()
    })
    .catch(err => {
      res.json({
        message: `Sorry! Something went wrong, check the error => 😥: \n ${err}`,
        workAdded: 0
      })
    })
}

const updateWork = async (req, res) => {
  const {
    workName,
    workGithub,
    workOnlineLink,
    workDate,
    workDesc,
    prevWorkImgPath,
    prevWorkImgName
  } = req.body
  const { workId } = req.params

  const { workImg } = req.files || ''
  const workImgName = uuidv4() + workImg?.name.split('.')[0] + '.webp' || ''
  let workImgDisplayPath = prevWorkImgPath
  let workImgDisplayName = prevWorkImgName

  //if the user has uploaded a new image
  if (workImg) {
    //delete the old image from s3 bucket
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: workImgDisplayName
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.json({
          message: err,
          workUpdated: 0
        })
        return
      }
    })

    //upload the new image to s3 bucket
    sharp(workImg.data)
      .rotate()
      .resize(600)
      .jpeg({ mozjpeg: true, quality: 50 })
      .toBuffer()
      .then(newWebpImg => {
        //changing the old jpg image buffer to new webp buffer
        workImg.data = newWebpImg

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: workImgName,
          Body: newWebpImg,
          ContentType: 'image/webp'
        } //uploading the new webp image to s3 bucket, self executing function
        ;(async () => {
          try {
            const { Location } = await s3.upload(params).promise()

            //saving the new image path to the database
            workImgDisplayPath = Location
            workImgDisplayName = Location.split('.com/')[1]

            await WorksModel.findByIdAndUpdate(workId, {
              workImgDisplayPath,
              workImgDisplayName,
              workName,
              workGithub,
              workOnlineLink,
              workDate,
              workDesc
            })
            res.json({
              message: 'Work Updated Successfully',
              workUpdated: 1
            })
          } catch (error) {
            res.json({
              message: error,
              workUpdated: 0
            })
            return
          }
        })()
      })
      .catch(err => {
        res.json({
          message: `Sorry! Something went wrong, check the error => 😥: \n ${err}`,
          workUpdated: 0
        })
      })
  } else {
    await WorksModel.findByIdAndUpdate(workId, {
      workName,
      workGithub,
      workOnlineLink,
      workDate,
      workDesc
    })
    res.json({
      message: 'Work Updated Successfully',
      workUpdated: 1
    })
  }
}

const getWork = async (req, res) => {
  const { workId } = req.params

  try {
    const works = workId
      ? await WorksModel.findById(workId)
      : await WorksModel.find({}).sort({ workDate: -1 }) //sort by date in descending order
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(works)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const deleteWork = async (req, res) => {
  const { prevWorkImgName } = req.body
  const { workId } = req.params

  //delete the old image from s3 bucket
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: prevWorkImgName
  }

  try {
    await WorksModel.findByIdAndDelete(workId)

    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.json({
          message: err,
          workDeleted: 0
        })
        return
      }

      res.json({
        message: 'Work Deleted Successfully',
        workDeleted: 1
      })
      return
    })
  } catch (error) {
    res.json({
      message: `Sorry! Something went wrong, check the error => 😥: \n ${error}`,
      workDeleted: 0
    })
  }
}

module.exports = { addWork, updateWork, getWork, deleteWork }
