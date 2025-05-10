import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  FaUser, 
  FaBell, 
  FaLock, 
  FaPalette, 
  FaDesktop, 
  FaSignOutAlt,
  FaEnvelope,
  FaCheck,
  FaTimes
} from 'react-icons/fa'
import './Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [theme, setTheme] = useState('light')
  
  // User profile data
  const userProfile = {
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    role: 'HR Manager',
    department: 'Human Resources',
    joinDate: '2018-05-12',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    employeeUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    systemUpdates: true
  })
  
  // Toggle notification setting
  const toggleNotification = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    })
  }
  
  // Change theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    // In a real app, this would also apply the theme to the application
    // document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
      </div>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <div className="settings-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className="nav-icon" />
              <span>Profile</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell className="nav-icon" />
              <span>Notifications</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FaLock className="nav-icon" />
              <span>Security</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <FaPalette className="nav-icon" />
              <span>Appearance</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'system' ? 'active' : ''}`}
              onClick={() => setActiveTab('system')}
            >
              <FaDesktop className="nav-icon" />
              <span>System</span>
            </button>
          </div>
          
          <div className="logout-button">
            <Button 
              variant="outline" 
              icon={<FaSignOutAlt />}
              className="full-width"
            >
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="settings-main">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="section-title">Profile Settings</h2>
              <p className="section-description">
                Manage your personal information and account settings
              </p>
              
              <Card className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar-container">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name} 
                      className="profile-avatar"
                    />
                    <button className="change-avatar-btn">
                      Change photo
                    </button>
                  </div>
                  <div className="profile-details">
                    <h3 className="profile-name">{userProfile.name}</h3>
                    <p className="profile-role">{userProfile.role} • {userProfile.department}</p>
                    <p className="profile-joined">
                      Joined on {new Date(userProfile.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        className="form-control" 
                        defaultValue={userProfile.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="form-control" 
                        defaultValue={userProfile.email}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="form-control" 
                        defaultValue={userProfile.phone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select id="department" className="form-control" defaultValue={userProfile.department}>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input 
                        type="text" 
                        id="role" 
                        className="form-control" 
                        defaultValue={userProfile.role}
                        disabled
                      />
                      <small className="form-text">Role can only be changed by an administrator</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="timezone">Timezone</label>
                      <select id="timezone" className="form-control" defaultValue="America/New_York">
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="bio">Bio</label>
                      <textarea 
                        id="bio" 
                        className="form-control" 
                        rows="3"
                        placeholder="Write a short bio about yourself"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-title">Notification Settings</h2>
              <p className="section-description">
                Configure how and when you receive notifications
              </p>
              
              <Card className="notification-card">
                <h3 className="card-subtitle">Email Notifications</h3>
                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">Email Updates</h4>
                      <p className="notification-description">
                        Receive emails about your account activity and security
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.emailUpdates ? 'active' : ''}`}
                      onClick={() => toggleNotification('emailUpdates')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">Employee Updates</h4>
                      <p className="notification-description">
                        Get notified when employees join, leave, or request time off
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.employeeUpdates ? 'active' : ''}`}
                      onClick={() => toggleNotification('employeeUpdates')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">Security Alerts</h4>
                      <p className="notification-description">
                        Receive emails about security concerns and suspicious login attempts
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.securityAlerts ? 'active' : ''}`}
                      onClick={() => toggleNotification('securityAlerts')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">Marketing Emails</h4>
                      <p className="notification-description">
                        Receive promotional emails about new features and services
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.marketingEmails ? 'active' : ''}`}
                      onClick={() => toggleNotification('marketingEmails')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                </div>
                
                <h3 className="card-subtitle">System Notifications</h3>
                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">Weekly Digest</h4>
                      <p className="notification-description">
                        Receive a weekly summary of important events and updates
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.weeklyDigest ? 'active' : ''}`}
                      onClick={() => toggleNotification('weeklyDigest')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4 className="notification-title">System Updates</h4>
                      <p className="notification-description">
                        Get notified about system maintenance and updates
                      </p>
                    </div>
                    <button 
                      className={`toggle-button ${notificationSettings.systemUpdates ? 'active' : ''}`}
                      onClick={() => toggleNotification('systemUpdates')}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                  </div>
                </div>
                
                <div className="form-actions">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </Card>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="section-title">Security Settings</h2>
              <p className="section-description">
                Manage your password and security preferences
              </p>
              
              <Card className="security-card">
                <h3 className="card-subtitle">Change Password</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      className="form-control" 
                      placeholder="Enter your current password"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      className="form-control" 
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      className="form-control" 
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <div className="password-requirements">
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li className="requirement met">
                      <FaCheck className="requirement-icon" />
                      At least 8 characters long
                    </li>
                    <li className="requirement">
                      <FaTimes className="requirement-icon" />
                      Contains uppercase letters
                    </li>
                    <li className="requirement">
                      <FaTimes className="requirement-icon" />
                      Contains numbers
                    </li>
                    <li className="requirement">
                      <FaTimes className="requirement-icon" />
                      Contains special characters
                    </li>
                  </ul>
                </div>
                
                <div className="form-actions">
                  <Button variant="primary">Update Password</Button>
                </div>
                
                <div className="security-divider"></div>
                
                <h3 className="card-subtitle">Two-Factor Authentication</h3>
                <div className="two-factor-container">
                  <div className="two-factor-info">
                    <p>Two-factor authentication adds an extra layer of security to your account.</p>
                    <p>Status: <span className="status-text inactive">Not Enabled</span></p>
                  </div>
                  <Button variant="primary">Enable 2FA</Button>
                </div>
                
                <div className="security-divider"></div>
                
                <h3 className="card-subtitle">Login Sessions</h3>
                <div className="sessions-list">
                  <div className="session-item current">
                    <div className="session-details">
                      <div className="session-device">Chrome on Windows</div>
                      <div className="session-location">San Francisco, CA, USA</div>
                      <div className="session-time">Current session</div>
                    </div>
                    <div className="session-actions">
                      <span className="current-badge">Current</span>
                    </div>
                  </div>
                  
                  <div className="session-item">
                    <div className="session-details">
                      <div className="session-device">Safari on MacOS</div>
                      <div className="session-location">San Francisco, CA, USA</div>
                      <div className="session-time">Last active: Today, 9:41 AM</div>
                    </div>
                    <div className="session-actions">
                      <Button variant="outline" size="sm">Logout</Button>
                    </div>
                  </div>
                  
                  <div className="session-item">
                    <div className="session-details">
                      <div className="session-device">Mail App on iPhone</div>
                      <div className="session-location">San Francisco, CA, USA</div>
                      <div className="session-time">Last active: Yesterday, 3:12 PM</div>
                    </div>
                    <div className="session-actions">
                      <Button variant="outline" size="sm">Logout</Button>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions center">
                  <Button variant="error">Logout of All Devices</Button>
                </div>
              </Card>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2 className="section-title">Appearance Settings</h2>
              <p className="section-description">
                Customize the look and feel of your interface
              </p>
              
              <Card className="appearance-card">
                <h3 className="card-subtitle">Theme</h3>
                <div className="theme-options">
                  <div 
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className="theme-preview light-theme">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-body">
                          <div className="preview-card"></div>
                          <div className="preview-card"></div>
                        </div>
                      </div>
                    </div>
                    <div className="theme-label">
                      <span>Light</span>
                      {theme === 'light' && <FaCheck className="theme-selected" />}
                    </div>
                  </div>
                  
                  <div 
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className="theme-preview dark-theme">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-body">
                          <div className="preview-card"></div>
                          <div className="preview-card"></div>
                        </div>
                      </div>
                    </div>
                    <div className="theme-label">
                      <span>Dark</span>
                      {theme === 'dark' && <FaCheck className="theme-selected" />}
                    </div>
                  </div>
                  
                  <div 
                    className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('system')}
                  >
                    <div className="theme-preview system-theme">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-body">
                          <div className="preview-card"></div>
                          <div className="preview-card"></div>
                        </div>
                      </div>
                    </div>
                    <div className="theme-label">
                      <span>System</span>
                      {theme === 'system' && <FaCheck className="theme-selected" />}
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </Card>
            </div>
          )}
          
          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="settings-section">
              <h2 className="section-title">System Settings</h2>
              <p className="section-description">
                Configure system settings and preferences
              </p>
              
              <Card className="system-card">
                <h3 className="card-subtitle">Account Information</h3>
                <div className="system-info-list">
                  <div className="system-info-item">
                    <div className="info-label">Version</div>
                    <div className="info-value">HR Manager v2.5.3</div>
                  </div>
                  
                  <div className="system-info-item">
                    <div className="info-label">Last Updated</div>
                    <div className="info-value">October 12, 2023</div>
                  </div>
                  
                  <div className="system-info-item">
                    <div className="info-label">Account Type</div>
                    <div className="info-value">Enterprise</div>
                  </div>
                  
                  <div className="system-info-item">
                    <div className="info-label">Account ID</div>
                    <div className="info-value">HRMS-92385-ENT</div>
                  </div>
                </div>
                
                <div className="system-divider"></div>
                
                <h3 className="card-subtitle">Support</h3>
                <div className="support-options">
                  <div className="support-option">
                    <div className="support-icon">
                      <FaEnvelope />
                    </div>
                    <div className="support-details">
                      <h4>Email Support</h4>
                      <p>Contact our support team via email for assistance</p>
                      <Button variant="outline" size="sm">Contact Support</Button>
                    </div>
                  </div>
                  
                  <div className="support-option">
                    <div className="support-icon">
                      <FaFileAlt />
                    </div>
                    <div className="support-details">
                      <h4>Documentation</h4>
                      <p>Access user guides and documentation</p>
                      <Button variant="outline" size="sm">View Documentation</Button>
                    </div>
                  </div>
                </div>
                
                <div className="system-divider"></div>
                
                <h3 className="card-subtitle">Data Management</h3>
                <div className="data-options">
                  <Button variant="outline">Export User Data</Button>
                  <Button variant="error">Delete Account</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings