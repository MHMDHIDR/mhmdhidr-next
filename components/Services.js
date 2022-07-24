import scrollTo from '../functions/ScrollToSection'
import { useState, useEffect } from 'react'

import useAxios from '../hooks/useAxios'
import { ServicesBusinessIcon, ServicesPersonalIcon } from '../icons/Services'

const buyService = e => {
  const selectedSevice = e.target.parentElement.children[2].innerText
  document.querySelector('#msg').textContent = `Hi Mohammed,

I'd like to talk to you about the ( ${selectedSevice.toUpperCase()} ) plan, I have a project which is:

project name: ...

project description: ...

project budget: ...`
}

const Services = () => {
  const { response, loading } = useAxios({
    method: 'get',
    url: '/services'
  })
  const [data, setData] = useState('')

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  return (
    <section className='container py-20 mx-auto services'>
      <h2 className='pb-6 text-lg text-center underline md:text-3xl'>Services</h2>
      <div className='flex flex-wrap justify-center gap-20 mt-14'>
        {loading ? (
          <div className='w-3/5 h-64 bg-blue-300 rounded-lg shadow-xl dark:bg-white opacity-30 dark:opacity-40'>
            <div className='h-12 bg-gray-200 rounded-tl-lg rounded-tr-lg animate-pulse'></div>
            <div className='p-5'>
              <div className='h-4 mb-4 bg-gray-200 rounded-sm animate-pulse'></div>
              <div className='h-4 mb-4 bg-gray-200 rounded-sm animate-pulse'></div>
              <div className='h-4 mb-4 bg-gray-200 rounded-sm animate-pulse'></div>
              <div className='w-32 h-8 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse'></div>
            </div>
          </div>
        ) : (
          data &&
          data.map((service, serviceId) => (
            <div
              key={serviceId}
              className='flex flex-col items-center justify-between gap-4 px-10 py-6 pb-10 shadow-xl dark:bg-gray-300 dark:text-blue-700 dark:shadow-blue-100 dark:shadow-sm rounded-xl'
            >
              <h2 className='text-4xl font-bold'>
                <small className='text-2xl'>$</small>
                {service.servicePrice}
              </h2>
              {service?.serviceName === 'Business' ? (
                <ServicesBusinessIcon />
              ) : service?.serviceName === 'Personal' ? (
                <ServicesPersonalIcon />
              ) : (
                <ServicesBusinessIcon />
              )}
              <span className='font-bold text-blue-700 capitalize'>
                {service?.serviceName}
              </span>
              <div>
                {service?.serviceFeatures?.split(',').map((feature, featureId) => (
                  <div
                    key={featureId}
                    className='flex items-center gap-1 space-y-2 text-gray-700'
                  >
                    <svg
                      stroke='currentColor'
                      fill='none'
                      strokeWidth='0'
                      viewBox='0 0 16 16'
                      className='w-4 h-4 mr-2 fill-blue-400'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z'></path>
                    </svg>
                    <h3 className='pb-2'>{feature}</h3>
                  </div>
                ))}
              </div>
              <button
                className='w-[90%] py-2 bg-blue-700 text-white font-semibold text-xl rounded-lg hover:brightness-105 transition-all hover:scale-105'
                data-scroll='contact'
                onClick={e => {
                  scrollTo(e)
                  buyService(e)
                }}
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Services
