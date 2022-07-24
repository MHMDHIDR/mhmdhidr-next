import { useState, useEffect } from 'react'
import Axios from 'axios'
import useAxios from '../../hooks/useAxios'
import Notification from '../../components/Notification'

const DashboardAppSettings = ({ subTitle = 'إعدادات الموقع' }) => {
  //Form States
  const [githubLink, setGithubLink] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [siteDesc, setSiteDesc] = useState('')
  const [settingUpdated, setSettingUpdated] = useState('')
  const [settingUpdatedMsg, setSettingUpdatedMsg] = useState('')
  const [data, setData] = useState('')

  const [websiteLogo, setWebsiteLogo] = useState('')
  const [preview, setPreview] = useState()
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL

  const { response } = useAxios({
    method: 'get',
    url: '/settings'
  })

  useEffect(() => {
    if (response !== null) {
      setData(response)
    }
  }, [response])

  const updateLogoImg = e => {
    const LogoFile = e.target.files[0]

    if (LogoFile) {
      setWebsiteLogo(LogoFile)
    }
  }

  useEffect(() => {
    // if there's an image
    if (websiteLogo) {
      const reader = new FileReader()

      reader.onloadend = () => setPreview(reader.result)

      reader.readAsDataURL(websiteLogo)
    } else {
      setPreview(null)
    }
  }, [websiteLogo])

  const handleUpdateSettings = async e => {
    e.preventDefault()

    //initial form values if no value was updated taking it from [0] index
    const currentWorkId = data?._id
    const currentGithubLink = data?.githubLink
    const currentContactEmail = data?.contactEmail
    const currentSiteDesc = data?.siteDesc
    const prevSettingImgPath = data?.websiteLogoDisplayPath
    const prevSettingImgName = data?.websiteLogoDisplayName

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('githubLink', githubLink || currentGithubLink)
    formData.append('contactEmail', contactEmail || currentContactEmail)
    formData.append('siteDesc', siteDesc || currentSiteDesc)
    formData.append('prevLogoImgPath', prevSettingImgPath)
    formData.append('prevLogoImgName', prevSettingImgName)
    formData.append('websiteLogo', websiteLogo)

    try {
      const response = await Axios.patch(
        `${BASE_URL}/settings/${currentWorkId}`,
        formData
      )

      const { settingUpdated, message } = response.data
      setSettingUpdated(settingUpdated)
      setSettingUpdatedMsg(message)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>{subTitle}</h3>

      <div className='h-full rtl'>
        <div className='flex flex-col gap-3 py-4 text-sm font-semibold'>
          <Notification sendStatus={settingUpdated} sendStatusMsg={settingUpdatedMsg} />
          <form
            method='POST'
            className='flex flex-col gap-14'
            encType='multipart/form-data'
            onSubmit={handleUpdateSettings}
          >
            <label
              htmlFor='logoImg'
              className='flex flex-wrap items-center justify-center gap-5 cursor-pointer md:justify-between'
            >
              <img
                src={preview === null ? data?.websiteLogoDisplayPath : preview}
                alt='Work Portfolio Preview'
                className='logo-preview w-36 h-36'
              />
              <input
                type='file'
                name='logoImg'
                id='logoImg'
                className='py-6 font-semibold text-white uppercase bg-blue-500 rounded-lg cursor-pointer px-28'
                accept='image/*'
                onChange={updateLogoImg}
              />
            </label>
            <div className='dashboard-group'>
              <label htmlFor='githubLink'>رابط الحساب على Github</label>
              <input
                type='text'
                id='githubLink'
                className='form-input'
                min='5'
                max='500'
                dir='auto'
                defaultValue={data?.githubLink}
                onChange={e => setGithubLink(e.target.value.trim())}
                required
              />
            </div>
            <div className='dashboard-group'>
              <label htmlFor='contactEmail'>الايميل الخاص بالتواصل</label>
              <input
                type='email'
                id='contactEmail'
                className='form-input'
                min='5'
                max='500'
                dir='auto'
                defaultValue={data?.contactEmail}
                onChange={e => setContactEmail(e.target.value.trim())}
                required
              />
            </div>
            <div className='dashboard-group'>
              <label htmlFor='siteDesc'>وصف الموقع</label>
              <textarea
                name='siteDesc'
                id='siteDesc'
                className='form-input'
                minLength='10'
                maxLength='300'
                dir='auto'
                defaultValue={data?.siteDesc}
                onChange={e => setSiteDesc(e.target.value.trim())}
                required
              ></textarea>
            </div>
            <div className='flex justify-around text-lg'>
              <button
                type='submit'
                className='px-20 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600'
              >
                تحديث الإعدادات
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DashboardAppSettings
