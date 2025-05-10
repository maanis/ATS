import { useState } from 'react'
import { FaPlus, FaSearch, FaSort, FaEdit, FaTrash, FaEye, FaFilter } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import './Employees.css'

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('table')
  
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
  
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: 'Jane Smith',
      position: 'HR Manager',
      department: 'HR',
      email: 'jane.smith@company.com',
      phone: '(555) 123-4567',
      status: 'active',
      startDate: '2018-05-12',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 2,
      name: 'Mark Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'mark.johnson@company.com',
      phone: '(555) 234-5678',
      status: 'active',
      startDate: '2019-02-18',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 3,
      name: 'Sarah Williams',
      position: 'Marketing Director',
      department: 'Marketing',
      email: 'sarah.williams@company.com',
      phone: '(555) 345-6789',
      status: 'active',
      startDate: '2017-11-05',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 4,
      name: 'Robert Brown',
      position: 'Sales Executive',
      department: 'Sales',
      email: 'robert.brown@company.com',
      phone: '(555) 456-7890',
      status: 'on leave',
      startDate: '2020-03-24',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 5,
      name: 'Emily Davis',
      position: 'Financial Analyst',
      department: 'Finance',
      email: 'emily.davis@company.com',
      phone: '(555) 567-8901',
      status: 'active',
      startDate: '2021-01-15',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 6,
      name: 'Michael Wilson',
      position: 'Operations Manager',
      department: 'Operations',
      email: 'michael.wilson@company.com',
      phone: '(555) 678-9012',
      status: 'active',
      startDate: '2019-08-07',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 7,
      name: 'Jennifer Lee',
      position: 'UI/UX Designer',
      department: 'Engineering',
      email: 'jennifer.lee@company.com',
      phone: '(555) 789-0123',
      status: 'active',
      startDate: '2020-06-30',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 8,
      name: 'David Miller',
      position: 'Product Manager',
      department: 'Engineering',
      email: 'david.miller@company.com',
      phone: '(555) 890-1234',
      status: 'active',
      startDate: '2018-12-10',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ]
  
  // Filter employees based on search term and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = 
      selectedDepartment === 'all' || 
      employee.department.toLowerCase() === selectedDepartment.toLowerCase()
    
    return matchesSearch && matchesDepartment
  })
  
  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // Table columns
  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (employee) => (
        <div className="employee-name-cell">
          <img 
            src={employee.avatar} 
            alt={employee.name} 
            className="employee-avatar"
          />
          <div className="employee-info">
            <div className="employee-name">{employee.name}</div>
            <div className="employee-position">{employee.position}</div>
          </div>
        </div>
      )
    },
    {
      key: 'department',
      title: 'Department',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'status',
      title: 'Status',
      render: (employee) => (
        <span className={`status-badge status-${employee.status.replace(/\s+/g, '-')}`}>
          {employee.status}
        </span>
      )
    },
    {
      key: 'startDate',
      title: 'Start Date',
      render: (employee) => {
        const date = new Date(employee.startDate)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    },
  ]
  
  // Row actions
  const renderActions = (employee) => (
    <div className="row-actions">
      <button 
        className="action-btn view-btn" 
        title="View details"
      >
        <FaEye />
      </button>
      <button 
        className="action-btn edit-btn" 
        title="Edit employee"
      >
        <FaEdit />
      </button>
      <button 
        className="action-btn delete-btn" 
        title="Delete employee"
      >
        <FaTrash />
      </button>
    </div>
  )
  
  return (
    <div className="employees-page">
      <div className="page-header">
        <h1>Employees</h1>
        <Button 
          variant="primary" 
          icon={<FaPlus />}
        >
          Add Employee
        </Button>
      </div>
      
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
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>
      </Card>
      
      {viewMode === 'table' ? (
        <Card className="employees-table-card">
          <Table 
            columns={columns} 
            data={paginatedEmployees} 
            actions={renderActions}
            emptyMessage="No employees found matching your search criteria."
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
      ) : (
        <div className="employees-grid">
          {paginatedEmployees.map(employee => (
            <motion.div 
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="employee-card">
                <div className="employee-card-header">
                  <img 
                    src={employee.avatar} 
                    alt={employee.name} 
                    className="employee-card-avatar"
                  />
                  <div className="employee-card-actions">
                    <button className="card-action-btn">
                      <FaEye />
                    </button>
                    <button className="card-action-btn">
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div className="employee-card-body">
                  <h3 className="employee-card-name">{employee.name}</h3>
                  <p className="employee-card-position">{employee.position}</p>
                  <p className="employee-card-department">{employee.department}</p>
                  <p className="employee-card-email">{employee.email}</p>
                  <div className="employee-card-footer">
                    <span className={`status-badge status-${employee.status.replace(/\s+/g, '-')}`}>
                      {employee.status}
                    </span>
                    <span className="employee-card-date">
                      Since {new Date(employee.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {/* Pagination for grid view */}
          {totalPages > 1 && (
            <div className="pagination grid-pagination">
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
        </div>
      )}
    </div>
  )
}

export default Employees