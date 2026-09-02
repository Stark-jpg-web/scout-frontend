import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import useStore from '../../store/useStore'
import { useEffect } from 'react'

function AppLayout() {
  const { theme } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <div className="">
      <Navbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
