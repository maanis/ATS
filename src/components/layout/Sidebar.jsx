import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaHome, 
  FaUsers, 
  FaUserTie, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaGraduationCap, 
  FaFileAlt, 
  FaCog, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa'
import './Sidebar.css'

const navItems = [
  { path: '/', label: 'Dashboard', icon: <FaHome /> },
  { path: '/employees', label: 'Employees', icon: <FaUsers /> },
  { path: '/recruitment', label: 'Recruitment', icon: <FaUserTie /> },
  { path: '/attendance', label: 'Attendance', icon: <FaCalendarAlt /> },
  { path: '/payroll', label: 'Payroll', icon: <FaMoneyBillWave /> },
  { path: '/performance', label: 'Performance', icon: <FaChartLine /> },
  { path: '/training', label: 'Training', icon: <FaGraduationCap /> },
  { path: '/documents', label: 'Documents', icon: <FaFileAlt /> },
  { path: '/settings', label: 'Settings', icon: <FaCog /> },
]

const Sidebar = ({ open, toggleSidebar }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    closed: { 
      x: '-100%', 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      }
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Mobile toggle button */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      
      <AnimatePresence>
        <motion.aside
          className="sidebar"
          initial={false}
          animate={open ? 'open' : 'closed'}
          variants={sidebarVariants}
        >
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <motion.div 
                className="logo-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                HR
              </motion.div>
              <h1 className="logo-text">HRManager</h1>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="User" 
                />
              </div>
              <div className="user-details">
                <p className="user-name">John Smith</p>
                <p className="user-role">HR Manager</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  )
}

export default Sidebar