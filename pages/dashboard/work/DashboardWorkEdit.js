import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import useAxios from '../../../hooks/useAxios'
import useEventListener from '../../../hooks/useEventListener'

import Notification from '../../../components/Notification'
import Spinner from '../../../icons/Spinner'

const DashboardWorkEdit = () => {
  //Form States
  const [workName, setWorkName] = useState('')
  const [workGithub, setWorkGithub] = useState('')
  const [workOnlineLink, setWorkOnlineLink] = useState('')
  const [workDate, setWorkDate] = useState('')
  const [workDesc, setWorkDesc] = useState('')
  const [workUpdated, setworkUpdated] = useState('')
  const [workUpdatedMsg, setworkUpdatedMsg] = useState('')
  const [deleteWorkStatus, setDeleteWorkStatus] = useState('')
  const [deleteWorkMsg, setDeleteWorkMsg] = useState('')
  const [loading, setloading] = useState()
  const [data, setData] = useState('')

  const [workImgFile, setWorkImgFile] = useState('')
  const [preview, setPreview] = useState()
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const formMsg = document.querySelector('[data-form-msg]')

  const { workId } = useParams()

  const { response } = useAxios({
    method: 'get',
    url: `/works/${workId}`
  })

  useEffect(() => {
    response !== null && setData(response)
  }, [response])

  const updateWorkImg = e => {
    const ImgFile = e.target.files[0]

    if (ImgFile) {
      setWorkImgFile(ImgFile)

      const fileType = ImgFile.type.split('/')[0]
      const fileSizeToMB = ImgFile.size / 1000000
      const MAX_FILE_SIZE = 1 //mb

      if (formMsg) {
        formMsg.classList.remove('hidden')
        formMsg.classList.add(
          'text-center',
          'relative',
          'border',
          'border-solid',
          'py-2',
          'my-10',
          'rounded-lg',
          'text-lg',
          'transition-all',
          'duration-400',
          'bg-red-50',
          'text-red-700',
          'border-red-700',
          'animate-shake'
        )

        if (fileType !== 'image') {
          formMsg.textContent = 'يمكنك رفع صور فقط لهذا الملف'
        } else if (fileSizeToMB > MAX_FILE_SIZE) {
          formMsg.textContent = `حجم الصورة لا يمكن أن يزيد عن ${MAX_FILE_SIZE} MB`
          return
        } else {
          formMsg.classList.add('hidden')
          formMsg.textContent = ''
        }
      }
    }
  }

  useEffect(() => {
    // if there's an image
    if (workImgFile) {
      const reader = new FileReader()

      reader.onloadend = () => setPreview(reader.result)

      reader.readAsDataURL(workImgFile)
    } else {
      setPreview(null)
    }
  }, [workImgFile])

  useEventListener('click', e => {
    e.target.id === 'deleteWork' &&
      handleDeleteWork(
        e.target.dataset.id,
        e.target.dataset.name,
        e.target.dataset.imgname
      )
  })

  const handleUpdateWork = async e => {
    e.preventDefault()
    e.target[4].setAttribute('disabled', 'disabled')

    //initial form values if no value was updated taking it from [0] index
    const currentWorkId = data?._id
    const currentWorkName = data?.workName
    const currentWorkGithublink = data?.workGithub
    const currentWorkOnlineLink = data?.workOnlineLink
    const currentWorkDate = data?.workDate
    const currentWorkDesc = data?.workDesc
    const prevWorkImgPath = data?.workImgDisplayPath
    const prevWorkImgName = data?.workImgDisplayName

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('workName', workName || currentWorkName)
    formData.append('workGithub', workGithub || currentWorkGithublink)
    formData.append('workOnlineLink', workOnlineLink || currentWorkOnlineLink)
    formData.append('workDate', workDate || currentWorkDate)
    formData.append('workDesc', workDesc || currentWorkDesc)
    formData.append('workImg', workImgFile)
    formData.append('prevWorkImgPath', prevWorkImgPath)
    formData.append('prevWorkImgName', prevWorkImgName)

    setloading(true)

    try {
      const response = await Axios.patch(`${BASE_URL}/works/${currentWorkId}`, formData)

      const { workUpdated, message } = response.data
      setworkUpdated(workUpdated)
      setworkUpdatedMsg(message)
    } catch (err) {
      console.error(err)
    } finally {
      setloading(false)
    }
  }

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
    <div className='h-full'>
      <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
        <Notification
          sendStatus={workUpdated || deleteWorkStatus}
          sendStatusMsg={workUpdatedMsg || deleteWorkMsg}
        />

        <div
          data-form-msg
          className='my-14 text-red-400 font-[600] text-center text-xl'
        ></div>

        <form
          method='POST'
          className='flex flex-col gap-14'
          encType='multipart/form-data'
          onSubmit={handleUpdateWork}
        >
          <label
            htmlFor='workImg'
            className='flex flex-wrap items-center justify-center gap-5 cursor-pointer md:justify-between'
          >
            <img
              src={preview === null ? data?.workImgDisplayPath : preview}
              alt='Work Portfolio Preview'
              className='bg-gray-600 rounded-xl w-36 h-36 dark:bg-gray-700'
            />
            <input
              type='file'
              name='workImg'
              id='workImg'
              className='py-6 font-semibold text-white uppercase bg-blue-500 rounded-lg cursor-pointer px-28'
              accept='image/*'
              onChange={updateWorkImg}
            />
          </label>
          <div className='dashboard-group'>
            <label htmlFor='workName'>اسم العمل</label>
            <input
              type='text'
              id='workName'
              className='form-input'
              defaultValue={data?.workName}
              autoFocus
              onChange={e => {
                setWorkName(e.target.value.trim())
              }}
              required
              dir='auto'
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='workLinkGithub'>رابط العمل على Github</label>
            <input
              type='text'
              id='workLinkGithub'
              className='form-input'
              min='5'
              max='500'
              defaultValue={data?.workGithub}
              onChange={e => setWorkGithub(e.target.value.trim())}
              required
              dir='auto'
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='workLinkOnline'>رابط العمل على موقع Online</label>
            <input
              type='text'
              id='workLinkOnline'
              className='form-input'
              min='5'
              max='500'
              defaultValue={data?.workOnlineLink}
              onChange={e => setWorkOnlineLink(e.target.value.trim())}
              required
              dir='auto'
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='workDate'>تاريخ انجاز العمل</label>
            <input
              type='date'
              id='workDate'
              className='form-input'
              min='2010-01-01'
              max='2030-12-31'
              defaultValue={data?.workDate?.slice(0, 10)}
              onChange={e => setWorkDate(e.target.value.trim())}
              required
            />
          </div>
          <div className='dashboard-group'>
            <label htmlFor='workDescription'>وصف العمل</label>
            <textarea
              name='workDescription'
              id='workDescription'
              className='form-input'
              minLength='10'
              maxLength='300'
              defaultValue={data?.workDesc}
              onChange={e => setWorkDesc(e.target.value.trim())}
              required
              dir='auto'
            ></textarea>
          </div>
          <div className='flex justify-around text-lg'>
            <button
              type='submit'
              className={`px-20 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 flex justify-center items-center gap-3 ${
                loading && loading ? ' scale-105 cursor-progress' : ''
              } ${
                loading || !loading
                  ? ' disabled:opacity-30 disabled:hover:bg-green-600'
                  : ''
              }`}
            >
              {loading && loading ? (
                <>
                  <Spinner />
                  جاري التحديث
                </>
              ) : (
                'تحديث العمل'
              )}
            </button>
            <button
              type='button'
              id='deleteWork'
              data-id={data._id}
              data-name={data.workName}
              data-imgname={data.workImgDisplayName}
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

export default DashboardWorkEdit
