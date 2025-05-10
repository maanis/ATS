import { useState } from 'react'
import { FaUsers, FaUserTie, FaCheckCircle, FaChartLine } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend 
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import Card from '../components/ui/Card'
import './Dashboard.css'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [period, setPeriod] = useState('month')
  
  // Monthly labels
  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Weekly labels
  const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  // Employee growth data
  const employeeGrowthData = {
    labels: period === 'month' ? monthlyLabels : weeklyLabels,
    datasets: [
      {
        label: 'Employees',
        data: period === 'month' 
          ? [150, 155, 160, 170, 180, 190, 200, 220, 235, 245, 250, 255]
          : [240, 242, 245, 248, 250, 252, 255],
        borderColor: 'rgb(10, 132, 255)',
        backgroundColor: 'rgba(10, 132, 255, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  }
  
  // Recruitment data
  const recruitmentData = {
    labels: period === 'month' ? monthlyLabels : weeklyLabels,
    datasets: [
      {
        label: 'Applications',
        data: period === 'month' 
          ? [65, 75, 60, 80, 90, 70, 85, 95, 105, 100, 110, 115]
          : [95, 100, 105, 110, 108, 112, 115],
        backgroundColor: 'rgba(10, 132, 255, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Interviews',
        data: period === 'month' 
          ? [40, 45, 35, 50, 55, 45, 50, 60, 65, 60, 70, 75]
          : [55, 60, 65, 68, 70, 72, 75],
        backgroundColor: 'rgba(64, 200, 224, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Hires',
        data: period === 'month' 
          ? [10, 12, 8, 14, 16, 15, 18, 20, 22, 20, 25, 28]
          : [18, 20, 21, 22, 24, 26, 28],
        backgroundColor: 'rgba(52, 199, 89, 0.8)',
        borderRadius: 4,
      },
    ],
  }
  
  // Department distribution data
  const departmentData = {
    labels: ['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations'],
    datasets: [
      {
        data: [15, 95, 40, 65, 30, 50],
        backgroundColor: [
          'rgba(10, 132, 255, 0.8)',
          'rgba(64, 200, 224, 0.8)', 
          'rgba(255, 149, 0, 0.8)',
          'rgba(52, 199, 89, 0.8)',
          'rgba(255, 204, 0, 0.8)',
          'rgba(175, 82, 222, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }
  
  // Key metrics
  const metrics = [
    { 
      id: 1, 
      title: 'Total Employees', 
      value: 295, 
      change: '+5%', 
      isPositive: true, 
      icon: <FaUsers />,
      color: 'primary',
    },
    { 
      id: 2, 
      title: 'Open Positions', 
      value: 24, 
      change: '+12%', 
      isPositive: true, 
      icon: <FaUserTie />, 
      color: 'secondary',
    },
    { 
      id: 3, 
      title: 'Applications', 
      value: 156, 
      change: '+32%', 
      isPositive: true, 
      icon: <FaCheckCircle />, 
      color: 'accent',
    },
    { 
      id: 4, 
      title: 'Turnover Rate', 
      value: '3.2%', 
      change: '-0.5%', 
      isPositive: true, 
      icon: <FaChartLine />, 
      color: 'success',
    },
  ]

  // Recent activities
  const activities = [
    {
      id: 1,
      action: 'New employee onboarded',
      name: 'Sarah Johnson',
      position: 'UX Designer',
      department: 'Engineering',
      date: 'Today, 9:30 AM',
    },
    {
      id: 2,
      action: 'Job offer accepted',
      name: 'Michael Chen',
      position: 'Senior Developer',
      department: 'Engineering',
      date: 'Today, 11:45 AM',
    },
    {
      id: 3,
      action: 'Performance review completed',
      name: 'Emma Williams',
      position: 'Marketing Specialist',
      department: 'Marketing',
      date: 'Yesterday, 3:20 PM',
    },
    {
      id: 4,
      action: 'Leave request approved',
      name: 'Robert Davis',
      position: 'Sales Manager',
      department: 'Sales',
      date: 'Yesterday, 5:15 PM',
    },
  ]
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="period-selector">
          <button 
            className={`period-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button 
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <motion.div 
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: metric.id * 0.1 }}
          >
            <Card className={`metric-card card-${metric.color}`}>
              <div className="metric-content">
                <div className="metric-icon">
                  {metric.icon}
                </div>
                <div className="metric-details">
                  <h3 className="metric-title">{metric.title}</h3>
                  <div className="metric-value-container">
                    <span className="metric-value">{metric.value}</span>
                    <span className={`metric-change ${metric.isPositive ? 'positive' : 'negative'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="charts-container">
        <div className="chart-row">
          <Card title="Employee Growth" className="chart-card">
            <Line 
              data={employeeGrowthData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 140,
                  }
                }
              }}
            />
          </Card>
          
          <Card title="Recruitment Pipeline" className="chart-card">
            <Bar 
              data={recruitmentData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    stacked: false,
                  },
                  y: {
                    stacked: false,
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Card>
        </div>
        
        <div className="chart-row">
          <Card title="Department Distribution" className="chart-card">
            <div className="doughnut-container">
              <Doughnut 
                data={departmentData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                  cutout: '60%',
                }}
              />
            </div>
          </Card>
          
          <Card title="Recent Activities" className="chart-card">
            <div className="activities-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <div className="activity-marker"></div>
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <h4 className="activity-title">{activity.action}</h4>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                    <p className="activity-details">
                      {activity.name} • {activity.position} • {activity.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard