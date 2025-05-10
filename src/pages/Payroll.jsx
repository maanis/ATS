import { useState } from 'react'
import { FaDownload, FaSearch, FaFilter, FaMoneyBillWave, FaChartBar, FaHistory } from 'react-icons/fa'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import './Payroll.css'

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState('October 2023')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  
  // Months for dropdown
  const months = [
    'October 2023',
    'September 2023',
    'August 2023',
    'July 2023',
    'June 2023',
    'May 2023',
  ]
  
  // Department options
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'hr', name: 'HR' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'finance', name: 'Finance' },
    { id: 'operations', name: 'Operations' },
  ]
  
  // Sample payroll data
  const payrollData = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Jane Smith',
      department: 'HR',
      position: 'HR Manager',
      baseSalary: 85000,
      overtime: 0,
      bonus: 2500,
      tax: 17500,
      netPay: 70000,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mark Johnson',
      department: 'Engineering',
      position: 'Senior Developer',
      baseSalary: 95000,
      overtime: 1200,
      bonus: 0,
      tax: 19240,
      netPay: 76960,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Sarah Williams',
      department: 'Marketing',
      position: 'Marketing Director',
      baseSalary: 90000,
      overtime: 0,
      bonus: 5000,
      tax: 19000,
      netPay: 76000,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Robert Brown',
      department: 'Sales',
      position: 'Sales Executive',
      baseSalary: 75000,
      overtime: 800,
      bonus: 7500,
      tax: 16660,
      netPay: 66640,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Emily Davis',
      department: 'Finance',
      position: 'Financial Analyst',
      baseSalary: 80000,
      overtime: 0,
      bonus: 1500,
      tax: 16300,
      netPay: 65200,
      paymentStatus: 'pending',
      paymentDate: null,
    },
    {
      id: 6,
      employeeId: 'EMP006',
      name: 'Michael Wilson',
      department: 'Operations',
      position: 'Operations Manager',
      baseSalary: 85000,
      overtime: 1000,
      bonus: 0,
      tax: 17200,
      netPay: 68800,
      paymentStatus: 'pending',
      paymentDate: null,
    },
    {
      id: 7,
      employeeId: 'EMP007',
      name: 'Jennifer Lee',
      department: 'Engineering',
      position: 'UI/UX Designer',
      baseSalary: 78000,
      overtime: 600,
      bonus: 1000,
      tax: 15920,
      netPay: 63680,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
    {
      id: 8,
      employeeId: 'EMP008',
      name: 'David Miller',
      department: 'Engineering',
      position: 'Product Manager',
      baseSalary: 92000,
      overtime: 0,
      bonus: 3000,
      tax: 19000,
      netPay: 76000,
      paymentStatus: 'paid',
      paymentDate: '2023-10-05',
    },
  ]
  
  // Filter payroll data based on search term and department
  const filteredPayroll = payrollData.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = 
      selectedDepartment === 'all' || 
      record.department.toLowerCase() === selectedDepartment.toLowerCase()
    
    return matchesSearch && matchesDepartment
  })
  
  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredPayroll.length / itemsPerPage)
  const paginatedPayroll = filteredPayroll.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // Payroll summary
  const payrollSummary = {
    totalSalary: payrollData.reduce((sum, record) => sum + record.baseSalary, 0),
    totalBonus: payrollData.reduce((sum, record) => sum + record.bonus, 0),
    totalOvertime: payrollData.reduce((sum, record) => sum + record.overtime, 0),
    totalTax: payrollData.reduce((sum, record) => sum + record.tax, 0),
    totalNet: payrollData.reduce((sum, record) => sum + record.netPay, 0),
    paidCount: payrollData.filter(record => record.paymentStatus === 'paid').length,
    pendingCount: payrollData.filter(record => record.paymentStatus === 'pending').length,
  }
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  
  // Table columns
  const columns = [
    {
      key: 'employeeId',
      title: 'Employee ID',
    },
    {
      key: 'name',
      title: 'Name',
      render: (record) => (
        <div className="employee-column">
          <div className="employee-name">{record.name}</div>
          <div className="employee-position">{record.position}</div>
        </div>
      )
    },
    {
      key: 'department',
      title: 'Department',
    },
    {
      key: 'baseSalary',
      title: 'Base Salary',
      render: (record) => formatCurrency(record.baseSalary),
    },
    {
      key: 'overtime',
      title: 'Overtime',
      render: (record) => formatCurrency(record.overtime),
    },
    {
      key: 'bonus',
      title: 'Bonus',
      render: (record) => formatCurrency(record.bonus),
    },
    {
      key: 'tax',
      title: 'Tax',
      render: (record) => formatCurrency(record.tax),
    },
    {
      key: 'netPay',
      title: 'Net Pay',
      render: (record) => (
        <span className="net-pay">{formatCurrency(record.netPay)}</span>
      ),
    },
    {
      key: 'paymentStatus',
      title: 'Status',
      render: (record) => (
        <span className={`status-badge status-${record.paymentStatus}`}>
          {record.paymentStatus}
        </span>
      )
    },
  ]
  
  // Row actions
  const renderActions = (record) => (
    <div className="row-actions">
      <button 
        className="action-btn view-btn" 
        title="View details"
      >
        <FaDownload />
      </button>
    </div>
  )
  
  return (
    <div className="payroll-page">
      <div className="page-header">
        <h1>Payroll</h1>
        <div className="header-actions">
          <div className="month-selector">
            <select 
              className="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <Button 
            variant="primary" 
            icon={<FaDownload />}
          >
            Export Payroll
          </Button>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="summary-grid">
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon total-icon">
              <FaMoneyBillWave />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Total Payroll</h3>
              <p className="summary-value">{formatCurrency(payrollSummary.totalNet)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon bonus-icon">
              <FaChartBar />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Total Bonus</h3>
              <p className="summary-value">{formatCurrency(payrollSummary.totalBonus)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon paid-icon">
              <FaHistory />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Payment Status</h3>
              <p className="summary-value">
                <span className="paid-count">{payrollSummary.paidCount} Paid</span>
                <span className="separator">•</span>
                <span className="pending-count">{payrollSummary.pendingCount} Pending</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Search and filter */}
      <Card className="filters-card">
        <div className="filters-container">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="department-filter">
            <FaFilter className="filter-icon" />
            <select 
              className="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {/* Payroll table */}
      <Card className="payroll-table-card">
        <Table 
          columns={columns} 
          data={paginatedPayroll} 
          actions={renderActions}
          emptyMessage="No payroll records found matching your search criteria."
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Payroll