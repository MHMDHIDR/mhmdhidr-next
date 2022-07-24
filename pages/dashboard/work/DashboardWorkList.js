import { useState, useEffect } from 'react'
import Link from 'next/link'
import Axios from 'axios'

import useAxios from '../../../hooks/useAxios'
import useEventListener from '../../../hooks/useEventListener'

import abstractText from '../../../functions/abstractText'

import Notification from '../../../components/Notification'

const DashboardWorkList = ({ subTitle = 'الأعمال' }) => {
  const [data, setData] = useState('')
  const [deleteWorkStatus, setDeleteWorkStatus] = useState('')
  const [deleteWorkMsg, setDeleteWorkMsg] = useState('')

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const { response } = useAxios({
    method: 'get',
    url: '/works'
  })

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  useEventListener('click', e => {
    e.target.id === 'deleteWork' &&
      handleDeleteWork(
        e.target.dataset.id,
        e.target.dataset.name,
        e.target.dataset.imgname
      )
  })

  const handleDeleteWork = async (workId, workName, WORK_IMG_NAME) => {
    // Delete service confirmation
    if (window.confirm(`Are you sure you want to delete ${workName}?`)) {
      //using FormData to send constructed data
      const data = new FormData()
      data.append('prevWorkImgName', WORK_IMG_NAME)

      try {
        const response = await Axios.delete(`${BASE_URL}/works/${workId}`, { data })

        const { workDeleted, message } = response.data

        setDeleteWorkStatus(workDeleted)
        setDeleteWorkMsg(message)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <Notification sendStatus={deleteWorkStatus} sendStatusMsg={deleteWorkMsg} />

      {data &&
        data.map((work, idx) => (
          <div key={idx}>
            <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>
              {work.workName}
            </h3>
            <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
              <form
                method='POST'
                className='flex flex-col gap-14'
                encType='multipart/form-data'
              >
                <div
                  className='flex flex-col items-center justify-center gap-5 p-3 border-4 border-dashed xl:flex-row md:justify-between odd:bg-gray-50 dark:odd:bg-gray-700'
                  key={idx}
                >
                  <img
                    src={work.workImgDisplayPath}
                    alt={work.workName}
                    className='w-48 h-48 bg-gray-600 border-2 dark:bg-gray-700'
                  />
                  <h2 className='w-full text-lg font-bold text-center md:w-fit'>
                    {work.workName}
                  </h2>
                  <p className='w-full text-lg leading-10 text-center md:min-w-fit'>
                    {abstractText(work.workDesc, 100)}
                    <Link
                      href={`/dashboard/work/edit/${work._id}`}
                      className='inline-flex text-blue-500 dark:text-blue-400 underline-hover'
                    >
                      تعديل
                    </Link>
                  </p>
                  <div className='flex flex-wrap justify-around flex-1 w-full gap-4'>
                    <Link
                      href={`/dashboard/work/edit/${work._id}`}
                      className='px-20 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600'
                    >
                      تعديل
                    </Link>
                    <button
                      type='button'
                      id='deleteWork'
                      data-id={work._id}
                      data-name={work.workName}
                      data-imgname={work.workImgDisplayName}
                      className='px-20 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600'
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
    </>
  )
}

export default DashboardWorkList
