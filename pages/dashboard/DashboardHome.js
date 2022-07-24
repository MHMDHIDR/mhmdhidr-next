import Link from 'next/link'

import DashboardNav from '../../components/dashboard/DashboardNav'
import PageNotFound from '../../PageNotFound'

const DashboardHome = () => {
  //getting user id from local storage
  const USER_ID =
    'user' in localStorage ? JSON.parse(localStorage.getItem('user'))._id : null

  return !USER_ID ? (
    <PageNotFound />
  ) : (
    <main className='container relative px-10 py-6 mx-auto'>
      <DashboardNav />
      <div className='grid grid-cols-2 grid-rows-3 gap-3 py-4 text-center md:py-6 md:grid-cols-3 rtl'>
        <Link
          href='appsettings'
          className='flex items-center justify-center p-2 text-xs font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg md:text-2xl hover:bg-blue-300'
        >
          إعدادات الموقع
        </Link>
        <Link
          href='work/list'
          className='flex items-center justify-center p-2 text-xs font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg md:text-2xl hover:bg-blue-300'
        >
          تصفح الأعمال الخاصة بك
        </Link>
        <Link
          href='work/add'
          className='flex items-center justify-center p-2 text-xs font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg md:text-2xl hover:bg-blue-300'
        >
          إضافة عمل جديد
        </Link>
        <Link
          href='services/list'
          className='flex items-center justify-center p-2 text-xs font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg md:text-2xl hover:bg-blue-300'
        >
          تصفح الخدمات
        </Link>
        <Link
          href='services/add'
          className='flex items-center justify-center p-2 text-xs font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg md:text-2xl hover:bg-blue-300'
        >
          إضافة خدمة جديدة
        </Link>
      </div>

      {/* Child routes */}
      <Outlet />
    </main>
  )
}

export default DashboardHome
