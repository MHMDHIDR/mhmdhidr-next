const mongoose = require('mongoose')
const servicesModel = require(`${__dirname}/../models/services-model.js`)

const addService = async (req, res) => {
  const { serviceName, servicePrice, serviceFeatures } = req.body

  const service = new servicesModel({
    serviceName,
    servicePrice,
    serviceFeatures
  })

  try {
    await service.save()

    res.send({
      message: 'Service Added Successfully',
      serviceAdded: 1
    })
  } catch (error) {
    res.send({
      message: `Sorry! Something went wrong, check the error => 😥: \n ${error}`,
      serviceAdded: 0
    })
  }
}

const updateService = async (req, res) => {
  const { serviceName, servicePrice, serviceFeatures } = req.body
  const { serviceId } = req.params
  if (!mongoose.Types.ObjectId.isValid(serviceId))
    return res.send({ message: `Sorry, No Service with this ID` })

  try {
    await servicesModel.findByIdAndUpdate(
      serviceId,
      { serviceName, servicePrice, serviceFeatures },
      { new: true }
    )

    res.send({
      message: 'Service Updated Successfully',
      serviceUpdated: 1
    })
  } catch (error) {
    res.send({
      message: `Sorry! Something went wrong, check the error => 😥: \n ${error}`,
      serviceUpdated: 0
    })
  }
}

const getService = async (req, res) => {
  const { serviceId } = req.params

  try {
    const services = serviceId
      ? await servicesModel.findById(serviceId)
      : await servicesModel.find({}).sort({ servicePrice: -1 })
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(services)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const deleteService = async (req, res) => {
  const { serviceId } = req.params

  try {
    await servicesModel.findByIdAndDelete(serviceId)

    res.json({
      message: 'Service Deleted Successfully',
      serviceDeleted: 1
    })
  } catch (error) {
    res.json({
      message: `Sorry! Something went wrong, check the error => 😥: \n ${error}`,
      serviceDeleted: 0
    })
  }
}

module.exports = { addService, updateService, getService, deleteService }
