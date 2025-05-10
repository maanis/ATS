import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaUserTie, 
  FaChartLine, 
  FaUsers, 
  FaStar, 
  FaRegStar,
  FaAngleDown,
  FaAngleUp
} from 'react-icons/fa'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import './Performance.css'

const Performance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [expandedReview, setExpandedReview] = useState(null)
  
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
  
  // Review cycles
  const reviewCycles = [
    {
      id: 1,
      title: 'Annual Performance Review 2023',
      status: 'active',
      department: 'All',
      startDate: '2023-10-01',
      endDate: '2023-11-30',
      progress: 45,
      completed: 36,
      pending: 44,
    },
    {
      id: 2,
      title: 'Q3 Engineering Team Review',
      status: 'completed',
      department: 'Engineering',
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      progress: 100,
      completed: 24,
      pending: 0,
    },
    {
      id: 3,
      title: 'Mid-year Marketing Assessment',
      status: 'completed',
      department: 'Marketing',
      startDate: '2023-06-15',
      endDate: '2023-07-15',
      progress: 100,
      completed: 12,
      pending: 0,
    },
  ]
  
  // Top performers
  const topPerformers = [
    {
      id: 1,
      name: 'David Miller',
      position: 'Product Manager',
      department: 'Engineering',
      score: 4.9,
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      position: 'Marketing Director',
      department: 'Marketing',
      score: 4.8,
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 3,
      name: 'Jennifer Lee',
      position: 'UI/UX Designer',
      department: 'Engineering',
      score: 4.7,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ]
  
  // Recent reviews
  const recentReviews = [
    {
      id: 1,
      employeeName: 'Mark Johnson',
      employeePosition: 'Senior Developer',
      employeeDepartment: 'Engineering',
      employeeAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      reviewerName: 'David Miller',
      reviewerPosition: 'Product Manager',
      reviewDate: '2023-10-15',
      cycle: 'Annual Performance Review 2023',
      overallRating: 4.5,
      ratings: {
        productivity: 4.5,
        quality: 4.0,
        teamwork: 5.0,
        innovation: 4.5,
        leadership: 4.3,
      },
      strengths: [
        'Excellent technical skills and problem solving abilities',
        'Great team player and mentor to junior developers',
        'Consistently delivers high-quality code on time',
      ],
      improvements: [
        'Could benefit from more involvement in project planning',
        'Documentation could be more thorough',
      ],
      comments: 'Mark has been an invaluable asset to the engineering team this year. His technical expertise and willingness to help others has elevated the entire team\'s performance.',
    },
    {
      id: 2,
      employeeName: 'Emily Davis',
      employeePosition: 'Financial Analyst',
      employeeDepartment: 'Finance',
      employeeAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      reviewerName: 'Jane Smith',
      reviewerPosition: 'HR Manager',
      reviewDate: '2023-10-12',
      cycle: 'Annual Performance Review 2023',
      overallRating: 4.2,
      ratings: {
        productivity: 4.0,
        quality: 4.5,
        teamwork: 4.0,
        innovation: 3.8,
        leadership: 4.0,
      },
      strengths: [
        'Detailed and thorough financial analysis',
        'Excellent attention to detail',
        'Reliable and meets all deadlines',
      ],
      improvements: [
        'Could benefit from more proactive communication',
        'Consider presenting more strategic insights alongside data',
      ],
      comments: 'Emily continues to be a reliable team member who consistently produces high-quality financial analysis. Her attention to detail ensures accuracy in all reports.',
    },
    {
      id: 3,
      employeeName: 'Michael Wilson',
      employeePosition: 'Operations Manager',
      employeeDepartment: 'Operations',
      employeeAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      reviewerName: 'Sarah Williams',
      reviewerPosition: 'Marketing Director',
      reviewDate: '2023-10-10',
      cycle: 'Annual Performance Review 2023',
      overallRating: 3.8,
      ratings: {
        productivity: 4.0,
        quality: 3.5,
        teamwork: 4.2,
        innovation: 3.0,
        leadership: 4.3,
      },
      strengths: [
        'Strong operational management and process improvements',
        'Effective team leadership',
        'Good cross-departmental collaboration',
      ],
      improvements: [
        'Process documentation needs improvement',
        'Could adopt more innovative approaches to solving operational issues',
        'More frequent status updates to stakeholders recommended',
      ],
      comments: 'Michael has done a good job managing the operations team through a challenging period. His leadership has kept the team focused, though there\'s room for improvement in documentation and innovation.',
    },
  ]
  
  // Toggle review expansion
  const toggleReview = (id) => {
    if (expandedReview === id) {
      setExpandedReview(null)
    } else {
      setExpandedReview(id)
    }
  }
  
  // Filter reviews by department
  const filteredReviews = recentReviews.filter(review => 
    selectedDepartment === 'all' || 
    review.employeeDepartment.toLowerCase() === selectedDepartment.toLowerCase()
  )
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-icon" />)
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star-icon half" />)
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star-icon empty" />)
    }
    
    return (
      <div className="star-rating">
        {stars}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    )
  }
  
  return (
    <div className="performance-page">
      <div className="page-header">
        <h1>Performance</h1>
        <Button 
          variant="primary" 
          icon={<FaUserTie />}
        >
          Start New Review
        </Button>
      </div>
      
      {/* Summary cards */}
      <div className="summary-grid">
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon review-icon">
              <FaChartLine />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Active Reviews</h3>
              <p className="summary-value">
                {reviewCycles.filter(cycle => cycle.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon employee-icon">
              <FaUsers />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Pending Reviews</h3>
              <p className="summary-value">
                {reviewCycles.reduce((sum, cycle) => sum + cycle.pending, 0)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="summary-card">
          <div className="summary-content">
            <div className="summary-icon rating-icon">
              <FaStar />
            </div>
            <div className="summary-details">
              <h3 className="summary-title">Avg. Performance</h3>
              <p className="summary-value">4.3</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="performance-content">
        <div className="performance-main">
          {/* Review Cycles */}
          <Card title="Review Cycles" className="review-cycles-card">
            {reviewCycles.map(cycle => (
              <div 
                key={cycle.id} 
                className={`review-cycle ${cycle.status === 'active' ? 'active-cycle' : ''}`}
              >
                <div className="cycle-header">
                  <div className="cycle-info">
                    <h3 className="cycle-title">{cycle.title}</h3>
                    <div className="cycle-meta">
                      <span className="cycle-department">{cycle.department}</span>
                      <span className="meta-separator">•</span>
                      <span className="cycle-dates">
                        {new Date(cycle.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} - {new Date(cycle.endDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="cycle-status">
                    <span className={`status-badge status-${cycle.status}`}>
                      {cycle.status}
                    </span>
                  </div>
                </div>
                
                <div className="cycle-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${cycle.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span className="progress-percentage">{cycle.progress}% complete</span>
                    <span className="progress-count">
                      {cycle.completed} completed, {cycle.pending} pending
                    </span>
                  </div>
                </div>
                
                {cycle.status === 'active' && (
                  <div className="cycle-actions">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="primary" size="sm">Continue Reviews</Button>
                  </div>
                )}
              </div>
            ))}
          </Card>
          
          {/* Recent Reviews */}
          <div className="reviews-header">
            <h2>Recent Reviews</h2>
            <div className="department-filter">
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
          
          <div className="reviews-container">
            {filteredReviews.map(review => (
              <Card key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-employee">
                    <img 
                      src={review.employeeAvatar} 
                      alt={review.employeeName} 
                      className="employee-avatar"
                    />
                    <div className="employee-info">
                      <h3 className="employee-name">{review.employeeName}</h3>
                      <p className="employee-position">
                        {review.employeePosition} • {review.employeeDepartment}
                      </p>
                    </div>
                  </div>
                  <div className="review-meta">
                    <div className="overall-rating">
                      {renderStars(review.overallRating)}
                    </div>
                    <p className="review-date">
                      Reviewed on {new Date(review.reviewDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="review-cycle-info">
                  <span className="cycle-badge">{review.cycle}</span>
                  <span className="reviewer-info">
                    by <strong>{review.reviewerName}</strong>, {review.reviewerPosition}
                  </span>
                </div>
                
                <motion.div 
                  className="review-details"
                  initial={false}
                  animate={{ height: expandedReview === review.id ? 'auto' : 0 }}
                >
                  <div className="review-ratings">
                    <h4>Performance Ratings</h4>
                    <div className="ratings-grid">
                      <div className="rating-item">
                        <span className="rating-label">Productivity</span>
                        <div className="rating-stars">
                          {renderStars(review.ratings.productivity)}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Quality</span>
                        <div className="rating-stars">
                          {renderStars(review.ratings.quality)}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Teamwork</span>
                        <div className="rating-stars">
                          {renderStars(review.ratings.teamwork)}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Innovation</span>
                        <div className="rating-stars">
                          {renderStars(review.ratings.innovation)}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Leadership</span>
                        <div className="rating-stars">
                          {renderStars(review.ratings.leadership)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="review-strengths">
                    <h4>Strengths</h4>
                    <ul className="review-list">
                      {review.strengths.map((strength, index) => (
                        <li key={index} className="review-list-item">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="review-improvements">
                    <h4>Areas for Improvement</h4>
                    <ul className="review-list">
                      {review.improvements.map((improvement, index) => (
                        <li key={index} className="review-list-item">{improvement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="review-comments">
                    <h4>Additional Comments</h4>
                    <p>{review.comments}</p>
                  </div>
                </motion.div>
                
                <button 
                  className="expand-btn"
                  onClick={() => toggleReview(review.id)}
                >
                  {expandedReview === review.id ? (
                    <>
                      <span>Hide Details</span>
                      <FaAngleUp />
                    </>
                  ) : (
                    <>
                      <span>Show Details</span>
                      <FaAngleDown />
                    </>
                  )}
                </button>
              </Card>
            ))}
            
            {filteredReviews.length === 0 && (
              <div className="no-reviews">
                <p>No reviews found for the selected department.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="performance-sidebar">
          {/* Top performers */}
          <Card title="Top Performers" className="top-performers-card">
            <div className="performers-list">
              {topPerformers.map((performer, index) => (
                <motion.div 
                  key={performer.id}
                  className="performer-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="performer-rank">{index + 1}</div>
                  <img 
                    src={performer.avatar} 
                    alt={performer.name} 
                    className="performer-avatar"
                  />
                  <div className="performer-info">
                    <h3 className="performer-name">{performer.name}</h3>
                    <p className="performer-position">
                      {performer.position}, {performer.department}
                    </p>
                  </div>
                  <div className="performer-score">
                    <div className="score-value">{performer.score}</div>
                    <div className="score-label">Score</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="card-footer">
              <Button variant="outline" className="full-width">View All Rankings</Button>
            </div>
          </Card>
          
          {/* Performance Tips */}
          <Card title="Performance Management Tips" className="tips-card">
            <div className="tips-list">
              <div className="tip-item">
                <h4 className="tip-title">Provide Regular Feedback</h4>
                <p className="tip-content">Don't wait for formal reviews. Regular feedback helps employees improve continuously.</p>
              </div>
              <div className="tip-item">
                <h4 className="tip-title">Set Clear Goals</h4>
                <p className="tip-content">Ensure goals are specific, measurable, achievable, relevant, and time-bound (SMART).</p>
              </div>
              <div className="tip-item">
                <h4 className="tip-title">Focus on Growth</h4>
                <p className="tip-content">Emphasize employee development and career growth in all performance discussions.</p>
              </div>
            </div>
            <div className="card-footer">
              <Button variant="outline" className="full-width">View More Tips</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Performance