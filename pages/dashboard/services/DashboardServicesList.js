import { useState, useEffect } from 'react'
import Link from 'next/link'
import Axios from 'axios'

import useAxios from '../../../hooks/useAxios'
import useEventListener from '../../../hooks/useEventListener'

import Notification from '../../../components/Notification'

const DashboardServicesList = () => {
  const [data, setData] = useState('')
  const [deleteServiceStatus, setDeleteServiceStatus] = useState('')
  const [deleteServiceMsg, setDeleteServiceMsg] = useState('')

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const { response } = useAxios({
    method: 'get',
    url: '/services'
  })

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  useEventListener('click', e => {
    e.target.id === 'deleteService' &&
      handleDeleteService(e.target.dataset.id, e.target.dataset.name)
  })

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
    <>
      <Notification sendStatus={deleteServiceStatus} sendStatusMsg={deleteServiceMsg} />

      {data &&
        data.map((service, serviceId) => (
          <div key={serviceId}>
            <h3 className='mt-20 mb-5 text-3xl font-semibold text-center'>
              {service.serviceName}
            </h3>
            <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
              <div
                className='flex flex-col items-center justify-center gap-12 p-3 border-4 border-dashed xl:flex-row md:justify-between odd:bg-gray-50 dark:odd:bg-gray-700'
                key={serviceId}
              >
                <h2 className='w-full text-lg font-bold text-center md:w-fit'>
                  {service.serviceName}
                </h2>
                <p className='w-full p-3 text-lg leading-10 text-center bg-gray-300 dark:text-gray-800 md:w-fit rounded-3xl'>
                  ${service.servicePrice}
                </p>
                <div className='text'>
                  {service?.serviceFeatures?.split(',').map((feature, featureId) => (
                    <li key={featureId} className='pb-2'>
                      {feature}
                    </li>
                  ))}
                </div>
                <div className='flex flex-wrap justify-around flex-1 w-full gap-4'>
                  <Link
                    href={`/dashboard/services/edit/${service._id}`}
                    className='px-20 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600'
                  >
                    تعديل
                  </Link>
                  <button
                    type='button'
                    id='deleteService'
                    data-id={service._id}
                    data-name={service.serviceName}
                    className='px-20 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600'
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default DashboardServicesList
