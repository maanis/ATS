import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaBell, 
  FaSearch, 
  FaEnvelope, 
  FaSignOutAlt, 
  FaUserCircle 
} from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showUserMenu) setShowUserMenu(false)
  }
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    if (showNotifications) setShowNotifications(false)
  }

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'application',
      message: 'New application received for Senior Developer',
      time: '5 mins ago'
    },
    {
      id: 2,
      type: 'leave',
      message: 'Sarah Johnson requested leave approval',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Performance review meeting at 3:00 PM',
      time: 'Today'
    }
  ]

  return (
    <header className="header">
      <div className="header-search">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <div className="header-action-item">
          <motion.button 
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotifications}
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </motion.button>
          
          {showNotifications && (
            <motion.div 
              className="dropdown-menu notifications-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h3 className="dropdown-title">Notifications</h3>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-icon">
                      {notification.type === 'application' && <FaUserCircle />}
                      {notification.type === 'leave' && <FaSignOutAlt />}
                      {notification.type === 'reminder' && <FaBell />}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-time">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="view-all-btn">View all notifications</button>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="header-action-item">
          <motion.button 
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            <span className="notification-badge">5</span>
          </motion.button>
        </div>
        
        <div className="header-action-item user-profile">
          <motion.button 
            className="profile-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleUserMenu}
          >
            <img 
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100" 
              alt="User" 
              className="avatar"
            />
            <span className="user-name">John Smith</span>
          </motion.button>
          
          {showUserMenu && (
            <motion.div 
              className="dropdown-menu user-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="user-menu-header">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="User" 
                  className="avatar"
                />
                <div>
                  <h4>John Smith</h4>
                  <p>HR Manager</p>
                </div>
              </div>
              <div className="user-menu-items">
                <a href="#profile" className="user-menu-item">
                  <FaUserCircle />
                  <span>My Profile</span>
                </a>
                <a href="#logout" className="user-menu-item">
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header