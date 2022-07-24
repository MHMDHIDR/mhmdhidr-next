import { useState, useEffect } from 'react'
import Axios from 'axios'
import Notification from '../../../components/Notification'

const DashboardWorkAdd = ({ subTitle = 'الأعمال' }) => {
  //Form States
  const [workName, setWorkName] = useState('')
  const [workGithub, setWorkGithub] = useState('')
  const [workOnlineLink, setWorkOnlineLink] = useState('')
  const [workDate, setWorkDate] = useState('')
  const [workDesc, setWorkDesc] = useState('')
  const [workAdded, setworkAdded] = useState('')
  const [workAddedMsg, setworkAddedMsg] = useState('')

  const [workImgFile, setWorkImgFile] = useState('')
  const [preview, setPreview] = useState()
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const formMsg = document.querySelector('.notification__msg')

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
          'py-4',
          'px-6',
          'mb-10',
          'rounded-lg',
          'font-bold',
          'text-2xl',
          'transition-all',
          'duration-500',
          'bg-red-100',
          'text-red-800',
          'border-red-700'
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

  const handleAddWork = async e => {
    e.preventDefault()

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('workName', workName)
    formData.append('workGithub', workGithub)
    formData.append('workOnlineLink', workOnlineLink)
    formData.append('workDate', workDate)
    formData.append('workDesc', workDesc)
    formData.append('workImg', workImgFile)

    if (
      (workName === '' || workGithub === '' || workOnlineLink === '' || workDate === '',
      workDesc === '')
    ) {
      formMsg.textContent = 'الرجاء إضافة جميع البيانات 😃'
    } else {
      try {
        const response = await Axios.post(`${BASE_URL}/works`, formData)

        const { workAdded, message } = response.data
        setworkAdded(workAdded)
        setworkAddedMsg(message)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>{subTitle}</h3>

      <div className='h-full'>
        <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
          <Notification sendStatus={workAdded} sendStatusMsg={workAddedMsg} />
          <div className='notification__msg'></div>
          <form
            method='POST'
            className='flex flex-col gap-14'
            encType='multipart/form-data'
            onSubmit={handleAddWork}
          >
            <label
              htmlFor='workImg'
              className='flex flex-wrap items-center justify-center gap-5 cursor-pointer md:justify-between'
            >
              <img
                src={
                  preview === null ? 'https://source.unsplash.com/random?webdev' : preview
                }
                alt='Work Portfolio Preview'
                className='w-36 h-36'
              />
              <input
                type='file'
                name='workImg'
                id='workImg'
                className='py-6 font-semibold text-white uppercase bg-blue-500 rounded-lg cursor-pointer px-28'
                accept='image/*'
                onChange={updateWorkImg}
                multiple
                required
              />
            </label>
            <div className='dashboard-group'>
              <label htmlFor='workName'>اسم العمل</label>
              <input
                type='text'
                id='workName'
                className='form-input'
                autoFocus
                onChange={e => {
                  setWorkName(e.target.value.trim())
                }}
                required
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
                onChange={e => setWorkGithub(e.target.value.trim())}
                required
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
                onChange={e => setWorkOnlineLink(e.target.value.trim())}
                required
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
                onChange={e => {
                  console.log(e.target.value)
                  setWorkDate(e.target.value)
                }}
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
                onChange={e => setWorkDesc(e.target.value.trim())}
                required
              ></textarea>
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

export default DashboardWorkAdd
