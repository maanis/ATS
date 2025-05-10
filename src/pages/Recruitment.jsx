import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaCheck,
  FaTimes,
  FaUserCheck,
  FaBriefcase,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle
} from 'react-icons/fa'
import './Recruitment.css'

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState('jobs')
  
  // Sample job openings
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applicants: 24,
      status: 'active',
      postedDate: '2023-09-15',
    },
    {
      id: 2,
      title: 'HR Manager',
      department: 'Human Resources',
      location: 'New York, NY',
      type: 'Full-time',
      applicants: 18,
      status: 'active',
      postedDate: '2023-10-01',
    },
    {
      id: 3,
      title: 'Marketing Coordinator',
      department: 'Marketing',
      location: 'Chicago, IL',
      type: 'Full-time',
      applicants: 32,
      status: 'active',
      postedDate: '2023-09-22',
    },
    {
      id: 4,
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Boston, MA',
      type: 'Full-time',
      applicants: 15,
      status: 'closed',
      postedDate: '2023-08-10',
    },
    {
      id: 5,
      title: 'Customer Support Representative',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Part-time',
      applicants: 41,
      status: 'active',
      postedDate: '2023-10-05',
    },
  ]
  
  // Sample applicants
  const applicants = [
    {
      id: 1,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      position: 'Senior Frontend Developer',
      stage: 'interview',
      applied: '2023-10-02',
      status: 'shortlisted',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Jessica Williams',
      email: 'jessica.w@example.com',
      position: 'Senior Frontend Developer',
      stage: 'technical',
      applied: '2023-10-01',
      status: 'in progress',
      rating: 4.0,
    },
    {
      id: 3,
      name: 'Robert Smith',
      email: 'robert.smith@example.com',
      position: 'HR Manager',
      stage: 'interview',
      applied: '2023-10-03',
      status: 'shortlisted',
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Amanda Johnson',
      email: 'amanda.j@example.com',
      position: 'Marketing Coordinator',
      stage: 'initial',
      applied: '2023-09-30',
      status: 'new',
      rating: 3.5,
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.r@example.com',
      position: 'Senior Frontend Developer',
      stage: 'offer',
      applied: '2023-09-28',
      status: 'offered',
      rating: 4.8,
    },
  ]
  
  // Jobs table columns
  const jobColumns = [
    {
      key: 'title',
      title: 'Job Title',
      render: (job) => (
        <div className="job-title-column">
          <div className="job-title">{job.title}</div>
          <div className="job-department">{job.department}</div>
        </div>
      )
    },
    {
      key: 'location',
      title: 'Location',
    },
    {
      key: 'type',
      title: 'Type',
      render: (job) => (
        <span className="job-type">{job.type}</span>
      )
    },
    {
      key: 'applicants',
      title: 'Applicants',
      render: (job) => (
        <span className="applicant-count">{job.applicants}</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (job) => (
        <span className={`status-badge status-${job.status}`}>
          {job.status}
        </span>
      )
    },
    {
      key: 'postedDate',
      title: 'Posted Date',
      render: (job) => {
        const date = new Date(job.postedDate)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    },
  ]
  
  // Applicants table columns
  const applicantColumns = [
    {
      key: 'name',
      title: 'Applicant',
      render: (applicant) => (
        <div className="applicant-column">
          <div className="applicant-name">{applicant.name}</div>
          <div className="applicant-email">{applicant.email}</div>
        </div>
      )
    },
    {
      key: 'position',
      title: 'Position',
    },
    {
      key: 'stage',
      title: 'Stage',
      render: (applicant) => {
        let icon = null
        
        switch(applicant.stage) {
          case 'initial':
            icon = <FaHourglassHalf className="stage-icon initial" />
            break
          case 'technical':
            icon = <FaBriefcase className="stage-icon technical" />
            break
          case 'interview':
            icon = <FaUserCheck className="stage-icon interview" />
            break
          case 'offer':
            icon = <FaCheckCircle className="stage-icon offer" />
            break
          default:
            icon = <FaExclamationTriangle className="stage-icon" />
        }
        
        return (
          <div className="stage-column">
            {icon}
            <span className="stage-text">{applicant.stage}</span>
          </div>
        )
      }
    },
    {
      key: 'applied',
      title: 'Applied Date',
      render: (applicant) => {
        const date = new Date(applicant.applied)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    },
    {
      key: 'rating',
      title: 'Rating',
      render: (applicant) => (
        <div className="rating-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i} 
              className={`star ${i < Math.floor(applicant.rating) ? 'filled' : ''} ${i === Math.floor(applicant.rating) && applicant.rating % 1 ? 'half-filled' : ''}`}
            >
              ★
            </span>
          ))}
          <span className="rating-value">{applicant.rating}</span>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (applicant) => {
        let statusClass = ''
        
        switch(applicant.status) {
          case 'new':
            statusClass = 'new'
            break
          case 'in progress':
            statusClass = 'in-progress'
            break
          case 'shortlisted':
            statusClass = 'shortlisted'
            break
          case 'offered':
            statusClass = 'offered'
            break
          case 'rejected':
            statusClass = 'rejected'
            break
          default:
            statusClass = ''
        }
        
        return (
          <span className={`status-badge status-${statusClass}`}>
            {applicant.status}
          </span>
        )
      }
    },
  ]
  
  // Row actions for jobs
  const renderJobActions = (job) => (
    <div className="row-actions">
      <button 
        className="action-btn view-btn" 
        title="View details"
      >
        <FaEye />
      </button>
      <button 
        className="action-btn edit-btn" 
        title="Edit job"
      >
        <FaEdit />
      </button>
      {job.status === 'active' ? (
        <button 
          className="action-btn close-btn" 
          title="Close job"
        >
          <FaTimes />
        </button>
      ) : (
        <button 
          className="action-btn reopen-btn" 
          title="Reopen job"
        >
          <FaCheck />
        </button>
      )}
      <button 
        className="action-btn delete-btn" 
        title="Delete job"
      >
        <FaTrash />
      </button>
    </div>
  )
  
  // Row actions for applicants
  const renderApplicantActions = (applicant) => (
    <div className="row-actions">
      <button 
        className="action-btn view-btn" 
        title="View details"
      >
        <FaEye />
      </button>
      <button 
        className="action-btn advance-btn" 
        title="Advance to next stage"
      >
        <FaCheck />
      </button>
      <button 
        className="action-btn reject-btn" 
        title="Reject application"
      >
        <FaTimes />
      </button>
    </div>
  )
  
  return (
    <div className="recruitment-page">
      <div className="page-header">
        <h1>Recruitment</h1>
        <Button 
          variant="primary" 
          icon={<FaPlus />}
        >
          {activeTab === 'jobs' ? 'Post New Job' : 'Add Applicant'}
        </Button>
      </div>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Openings
          </button>
          <button 
            className={`tab ${activeTab === 'applicants' ? 'active' : ''}`}
            onClick={() => setActiveTab('applicants')}
          >
            Applicants
          </button>
        </div>
      </div>
      
      {activeTab === 'jobs' ? (
        <Card className="data-card">
          <Table 
            columns={jobColumns} 
            data={jobOpenings} 
            actions={renderJobActions}
            emptyMessage="No job openings found."
          />
        </Card>
      ) : (
        <Card className="data-card">
          <Table 
            columns={applicantColumns} 
            data={applicants} 
            actions={renderApplicantActions}
            emptyMessage="No applicants found."
          />
        </Card>
      )}
      
      {/* Stats cards */}
      <div className="stats-grid">
        {activeTab === 'jobs' ? (
          <>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon job-icon">
                  <FaBriefcase />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">Total Jobs</h3>
                  <p className="stat-value">{jobOpenings.length}</p>
                </div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon active-icon">
                  <FaCheck />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">Active Jobs</h3>
                  <p className="stat-value">
                    {jobOpenings.filter(job => job.status === 'active').length}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon applicant-icon">
                  <FaUserCheck />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">Total Applicants</h3>
                  <p className="stat-value">
                    {jobOpenings.reduce((sum, job) => sum + job.applicants, 0)}
                  </p>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon applicant-icon">
                  <FaUserCheck />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">Total Applicants</h3>
                  <p className="stat-value">{applicants.length}</p>
                </div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon interview-icon">
                  <FaBriefcase />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">In Interview</h3>
                  <p className="stat-value">
                    {applicants.filter(app => app.stage === 'interview').length}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon offer-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">Offers Extended</h3>
                  <p className="stat-value">
                    {applicants.filter(app => app.status === 'offered').length}
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default Recruitment