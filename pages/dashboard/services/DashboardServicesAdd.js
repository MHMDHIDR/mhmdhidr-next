import { useState } from 'react'
import Axios from 'axios'
import Notification from '../../../components/Notification'

const DashboardServicesAdd = ({ subTitle = 'الخدمات' }) => {
  //Form States
  const [serviceName, setServiceName] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceFeaturesList, setServiceFeaturesList] = useState([{ serviceFeature: '' }])
  const [serviceAdded, setServiceAdded] = useState('')
  const [serviceAddedMsg, setServiceAddedMsg] = useState('')
  const formMsg = document.querySelector('.notification__msg')
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

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

  const handleAddService = async e => {
    e.preventDefault()

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('serviceName', serviceName)
    formData.append('servicePrice', servicePrice)
    formData.append(
      'serviceFeatures',
      serviceFeaturesList.map(feature => feature['serviceFeature'])
    )

    if (serviceName === '' || servicePrice === '' || serviceFeaturesList === '') {
      formMsg.textContent = 'الرجاء إضافة جميع البيانات 😃'
    } else {
      try {
        const response = await Axios.post(`${BASE_URL}/services`, formData)

        const { serviceAdded, message } = response.data
        setServiceAdded(serviceAdded)
        setServiceAddedMsg(message)
      } catch (err) {
        setServiceAddedMsg(err)
        console.error(err)
      }
    }
  }

  return (
    <>
      <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>{subTitle}</h3>

      <div className='h-full'>
        <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
          <Notification sendStatus={serviceAdded} sendStatusMsg={serviceAddedMsg} />
          <div className='notification__msg'></div>
          <form
            method='POST'
            className='flex flex-col gap-14'
            encType='multipart/form-data'
            onSubmit={handleAddService}
          >
            <div className='dashboard-group'>
              <label htmlFor='serviceName'>اسم الخدمة</label>
              <input
                type='text'
                id='serviceName'
                className='form-input'
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
                className='form-input'
                min='5'
                max='500'
                step='0.01'
                onChange={e => setServicePrice(e.target.value.trim())}
                required
                dir='auto'
              />
            </div>
            <div className='dashboard-group'>
              <label htmlFor='serviceFeatures'>مميزات الخدمة</label>
              {serviceFeaturesList.map((x, i) => (
                <div className='space-y-4' key={i}>
                  <input
                    type='text'
                    name='serviceFeature'
                    value={x.serviceFeaturesList}
                    id='serviceFeature'
                    className='form-input'
                    min='5'
                    max='500'
                    onChange={e => handleInputChange(e, i)}
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
                إضافة
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DashboardServicesAdd
