import Link from 'next/link'

const DashboardServices = () => {
  return (
    <section className='h-screen rtl'>
      <h3 className='mt-20 mb-12 text-3xl font-semibold text-center'>الخدمات</h3>

      <div className='flex flex-wrap gap-4 justify-evenly'>
        <Link
          href='add'
          className='px-10 py-5 text-2xl font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg hover:bg-blue-300'
        >
          إضافة خدمة جديدة
        </Link>
        <Link
          href='list'
          className='px-10 py-5 text-2xl font-bold text-blue-900 transition-colors bg-blue-200 rounded-lg hover:bg-blue-300'
        >
          تصفح الخدمات الخاصة بك
        </Link>
      </div>
      <Outlet />
    </section>
  )
}

export default DashboardServices
