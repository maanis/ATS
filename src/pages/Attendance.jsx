import { useState } from 'react'
import { FaCalendarAlt, FaUserClock, FaClock } from 'react-icons/fa'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import './Attendance.css'

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  // Sample attendance data
  const attendanceData = [
    {
      id: 1,
      name: 'Jane Smith',
      department: 'HR',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 2,
      name: 'Mark Johnson',
      department: 'Engineering',
      checkIn: '08:45 AM',
      checkOut: '06:15 PM',
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 3,
      name: 'Sarah Williams',
      department: 'Marketing',
      checkIn: '09:15 AM',
      checkOut: '05:45 PM',
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 4,
      name: 'Robert Brown',
      department: 'Sales',
      status: 'absent',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 5,
      name: 'Emily Davis',
      department: 'Finance',
      checkIn: '09:30 AM',
      checkOut: '06:00 PM',
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 6,
      name: 'Michael Wilson',
      department: 'Operations',
      checkIn: '10:00 AM',
      checkOut: '--:-- --',
      status: 'late',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 7,
      name: 'Jennifer Lee',
      department: 'Engineering',
      status: 'leave',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 8,
      name: 'David Miller',
      department: 'Engineering',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    },
  ]
  
  // Calendar helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }
  
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
  }
  
  // Generate calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const monthName = currentMonth.toLocaleString('default', { month: 'long' })
    const year = currentMonth.getFullYear()
    const today = new Date()
    
    // Array of day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    // Generate blank days for start of month
    const blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <div key={`blank-${i}`} className="calendar-day empty"></div>
      )
    }
    
    // Generate days of month
    const days = []
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
      
      // Check if there is attendance data for this date
      const hasAttendance = attendanceData.some(record => record.date === dateString)
      
      // Check if this is today
      const isToday = 
        d === today.getDate() && 
        currentMonth.getMonth() === today.getMonth() && 
        currentMonth.getFullYear() === today.getFullYear()
      
      // Check if this is selected date
      const isSelected = 
        d === selectedDate.getDate() && 
        currentMonth.getMonth() === selectedDate.getMonth() && 
        currentMonth.getFullYear() === selectedDate.getFullYear()
      
      days.push(
        <div 
          key={d} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasAttendance ? 'has-data' : ''}`}
          onClick={() => handleDateClick(d)}
        >
          <span className="day-number">{d}</span>
          {hasAttendance && <span className="attendance-indicator"></span>}
        </div>
      )
    }
    
    // Combine blanks and days
    const totalSlots = [...blanks, ...days]
    const rows = []
    let cells = []
    
    // Create rows with 7 days each
    totalSlots.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day)
      } else {
        rows.push(cells)
        cells = [day]
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells)
      }
    })
    
    return (
      <div className="calendar">
        <div className="calendar-header">
          <Button 
            variant="outline" 
            onClick={handlePrevMonth}
          >
            &lt;
          </Button>
          <h3 className="calendar-title">{monthName} {year}</h3>
          <Button 
            variant="outline" 
            onClick={handleNextMonth}
          >
            &gt;
          </Button>
        </div>
        
        <div className="calendar-grid">
          {/* Day names */}
          {dayNames.map((name) => (
            <div key={name} className="calendar-day-name">
              {name}
            </div>
          ))}
          
          {/* Calendar days */}
          {rows.map((row, i) => 
            row.map((day, idx) => day)
          )}
        </div>
      </div>
    )
  }
  
  // Attendance summary
  const attendanceSummary = {
    present: attendanceData.filter(record => record.status === 'present').length,
    absent: attendanceData.filter(record => record.status === 'absent').length,
    late: attendanceData.filter(record => record.status === 'late').length,
    leave: attendanceData.filter(record => record.status === 'leave').length,
    total: attendanceData.length,
  }
  
  // Filter attendance records for selected date
  const selectedDateString = selectedDate.toISOString().split('T')[0]
  const selectedDateRecords = attendanceData.filter(record => 
    record.date === selectedDateString
  )
  
  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Attendance</h1>
        <Button 
          variant="primary" 
        >
          Generate Report
        </Button>
      </div>
      
      <div className="attendance-content">
        <div className="attendance-sidebar">
          {/* Calendar */}
          <Card title="Attendance Calendar">
            {renderCalendar()}
          </Card>
          
          {/* Summary card */}
          <Card title="Today's Summary" className="summary-card">
            <div className="summary-stats">
              <div className="summary-stat">
                <div className="stat-icon present-icon">
                  <FaUserClock />
                </div>
                <div className="stat-details">
                  <p className="stat-value">{attendanceSummary.present}</p>
                  <p className="stat-label">Present</p>
                </div>
              </div>
              
              <div className="summary-stat">
                <div className="stat-icon absent-icon">
                  <FaUserClock />
                </div>
                <div className="stat-details">
                  <p className="stat-value">{attendanceSummary.absent}</p>
                  <p className="stat-label">Absent</p>
                </div>
              </div>
              
              <div className="summary-stat">
                <div className="stat-icon late-icon">
                  <FaClock />
                </div>
                <div className="stat-details">
                  <p className="stat-value">{attendanceSummary.late}</p>
                  <p className="stat-label">Late</p>
                </div>
              </div>
              
              <div className="summary-stat">
                <div className="stat-icon leave-icon">
                  <FaCalendarAlt />
                </div>
                <div className="stat-details">
                  <p className="stat-value">{attendanceSummary.leave}</p>
                  <p className="stat-label">On Leave</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="attendance-main">
          <Card 
            title={`Attendance Records - ${selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}`}
            className="attendance-records-card"
          >
            {selectedDateRecords.length > 0 ? (
              <div className="attendance-table-container">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDateRecords.map(record => (
                      <tr key={record.id}>
                        <td>{record.name}</td>
                        <td>{record.department}</td>
                        <td>{record.checkIn || '--:-- --'}</td>
                        <td>{record.checkOut || '--:-- --'}</td>
                        <td>
                          <span className={`status-badge status-${record.status}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-records">
                No attendance records found for this date.
              </div>
            )}
          </Card>
          
          {/* Recent activity */}
          <Card title="Recent Activity" className="recent-activity-card">
            <div className="activity-timeline">
              <div className="timeline-item">
                <div className="timeline-icon check-in-icon">
                  <FaUserClock />
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">Jennifer Lee checked in</p>
                  <p className="timeline-time">Today, 08:30 AM</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon late-icon">
                  <FaClock />
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">Michael Wilson marked as late</p>
                  <p className="timeline-time">Today, 10:00 AM</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon check-out-icon">
                  <FaUserClock />
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">Emily Davis checked out</p>
                  <p className="timeline-time">Today, 06:00 PM</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon leave-icon">
                  <FaCalendarAlt />
                </div>
                <div className="timeline-content">
                  <p className="timeline-title">Sarah Williams requested leave</p>
                  <p className="timeline-time">Yesterday, 04:15 PM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Attendance