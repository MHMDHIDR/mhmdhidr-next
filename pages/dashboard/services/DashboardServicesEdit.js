import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import useAxios from '../../../hooks/useAxios'
import useEventListener from '../../../hooks/useEventListener'

import Notification from '../../../components/Notification'

const DashboardServicesEdit = () => {
  //Form States
  const [serviceName, setServiceName] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceFeaturesList, setServiceFeaturesList] = useState([{ serviceFeature: '' }])
  const [data, setData] = useState('')
  const [serviceUpdated, setServiceUpdated] = useState('')
  const [serviceUpdatedMsg, setServiceUpdatedMsg] = useState('')
  const [deleteServiceStatus, setDeleteServiceStatus] = useState('')
  const [deleteServiceMsg, setDeleteServiceMsg] = useState('')

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...serviceFeaturesList]
    list[index][name] = value
    setServiceFeaturesList(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...serviceFeaturesList]
    list.splice(index, 1)
    setServiceFeaturesList(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setServiceFeaturesList([...serviceFeaturesList, { serviceFeature: '' }])
  }

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const { serviceId } = useParams()

  const { response } = useAxios({
    method: 'get',
    url: `/services/${serviceId}`
  })

  useEffect(() => {
    if (response !== null) {
      setData(response)
      setServiceFeaturesList(
        [...response?.serviceFeatures?.split(',')].map(feature => ({
          serviceFeature: feature
        }))
      )
    }
  }, [response])

  useEventListener('click', e => {
    e.target.id === 'deleteFood' &&
      handleDeleteService(e.target.dataset.id, e.target.dataset.name)
  })

  const handleUpdateService = async e => {
    e.preventDefault()

    //initial form values if no value was updated taking it from [0] index
    const currentServiceName = data?.serviceName
    const currentServicePrice = data?.servicePrice
    const currentServiceFeaturesList = data?.serviceFeatures?.split(',')

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('serviceName', serviceName || currentServiceName)
    formData.append('servicePrice', servicePrice || currentServicePrice)
    formData.append(
      'serviceFeatures',
      serviceFeaturesList.map(feature => feature['serviceFeature']) ||
        currentServiceFeaturesList
    )

    //send data to backend
    try {
      const response = await Axios.patch(`${BASE_URL}/services/${serviceId}`, formData)

      const { serviceUpdated, message } = response.data
      setServiceUpdated(serviceUpdated)
      setServiceUpdatedMsg(message)
    } catch (err) {
      setServiceUpdatedMsg(err)
      console.error(err)
    }
  }

  const handleDeleteService = async (serviceId, serviceName) => {
    // Delete service confirmation
    if (window.confirm(`Are you sure you want to delete ${serviceName}?`)) {
      try {
        const response = await Axios.delete(`${BASE_URL}/services/${serviceId}`)

        const { serviceDeleted, message } = response.data

        setDeleteServiceStatus(serviceDeleted)
        setDeleteServiceMsg(message)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className='h-full'>
      <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
        <Notification
          sendStatus={serviceUpdated || deleteServiceStatus}
          sendStatusMsg={serviceUpdatedMsg || deleteServiceMsg}
        />

        <form
          method='POST'
          className='flex flex-col gap-14'
          encType='multipart/form-data'
          onSubmit={handleUpdateService}
        >
          <div className='dashboard-group'>
            <label htmlFor='serviceName'>اسم الخدمة</label>
            <input
              type='text'
              id='serviceName'
              className='form-input'
              defaultValue={data.serviceName}
              autoFocus
              onChange={e => {
                setServiceName(e.target.value.trim())
              }}
              required
              dir='auto'
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='servicePrice'>سعر الخدمة</label>
            <input
              type='number'
              id='servicePrice'
              min='5'
              max='500'
              step='0.01'
              defaultValue={data.servicePrice}
              onChange={e => setServicePrice(e.target.value.trim())}
              className='form-input'
              required
              dir='auto'
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='serviceFeatures'>مميزات الخدمة</label>
            {serviceFeaturesList[0].serviceFeature !== '' &&
              // Only if the first feature is not empty then display the list
              serviceFeaturesList.map((x, i) => (
                <div className='space-y-4' key={i}>
                  <input
                    type='text'
                    name='serviceFeature'
                    value={x.serviceFeaturesList}
                    id='serviceFeature'
                    min='5'
                    max='500'
                    onChange={e => handleInputChange(e, i)}
                    className='form-input'
                    defaultValue={x?.serviceFeature}
                    required
                    dir='auto'
                  />
                  <div className='flex gap-4'>
                    {serviceFeaturesList.length !== 1 && (
                      <button
                        className='px-5 py-2 text-white transition-colors bg-red-500 rounded-lg w-fit hover:bg-red-600'
                        onClick={() => handleRemoveClick(i)}
                      >
                        -
                      </button>
                    )}
                    {serviceFeaturesList.length - 1 === i && (
                      <button
                        className='px-5 py-2 text-white transition-colors bg-blue-500 rounded-lg w-fit hover:bg-blue-600'
                        onClick={handleAddClick}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className='flex justify-around text-lg'>
            <button
              type='submit'
              className='px-20 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600'
            >
              تحديث
            </button>
            <button
              type='button'
              id='deleteFood'
              data-id={data._id}
              data-name={data.serviceName}
              className='px-20 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600'
            >
              حذف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DashboardServicesEdit
