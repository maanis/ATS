import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { motion } from 'framer-motion'

const Layout = ({ children, sidebarOpen, toggleSidebar }) => {
  // Close sidebar on small screens when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && sidebarOpen) {
        toggleSidebar()
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen, toggleSidebar])

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </>
  )
}

export default Layout