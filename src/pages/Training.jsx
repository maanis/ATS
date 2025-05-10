import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { FaGraduationCap, FaPlayCircle, FaBook, FaCertificate, FaCalendarAlt } from 'react-icons/fa'
import './Training.css'

const Training = () => {
  // Training programs
  const trainingPrograms = [
    {
      id: 1,
      title: 'Leadership Development Program',
      description: 'Develop essential leadership skills to effectively manage teams and drive organizational success.',
      category: 'Leadership',
      duration: '12 weeks',
      startDate: '2023-11-15',
      enrollmentStatus: 'Open',
      enrolled: 24,
      maxCapacity: 30,
      instructor: 'Jane Smith',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Technical Skills Bootcamp',
      description: 'Intensive training program covering latest technical skills in software development and architecture.',
      category: 'Technical',
      duration: '8 weeks',
      startDate: '2023-12-01',
      enrollmentStatus: 'Open',
      enrolled: 18,
      maxCapacity: 25,
      instructor: 'David Johnson',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Effective Communication Workshop',
      description: 'Enhance your communication skills in professional settings through practical exercises and techniques.',
      category: 'Soft Skills',
      duration: '4 weeks',
      startDate: '2023-11-10',
      enrollmentStatus: 'Closed',
      enrolled: 30,
      maxCapacity: 30,
      instructor: 'Sarah Williams',
      image: 'https://images.pexels.com/photos/7171890/pexels-photo-7171890.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ]
  
  // Available courses
  const availableCourses = [
    {
      id: 1,
      title: 'Project Management Fundamentals',
      category: 'Management',
      level: 'Beginner',
      duration: '6 hours',
      format: 'Video',
      rating: 4.7,
      enrolled: 345,
      description: 'Learn the essential principles and practices of effective project management.'
    },
    {
      id: 2,
      title: 'Advanced Excel for HR Professionals',
      category: 'Technical',
      level: 'Intermediate',
      duration: '8 hours',
      format: 'Video',
      rating: 4.5,
      enrolled: 212,
      description: 'Master advanced Excel techniques specifically tailored for HR data analysis and reporting.'
    },
    {
      id: 3,
      title: 'Conflict Resolution in the Workplace',
      category: 'Soft Skills',
      level: 'All Levels',
      duration: '4 hours',
      format: 'Interactive',
      rating: 4.8,
      enrolled: 189,
      description: 'Develop strategies to effectively manage and resolve workplace conflicts.'
    },
    {
      id: 4,
      title: 'Diversity and Inclusion Training',
      category: 'Compliance',
      level: 'All Levels',
      duration: '5 hours',
      format: 'Video',
      rating: 4.9,
      enrolled: 678,
      description: 'Understand the importance of diversity and inclusion and implement best practices.'
    },
  ]
  
  // Upcoming training events
  const upcomingEvents = [
    {
      id: 1,
      title: 'HR Tech Conference 2023',
      date: '2023-11-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Virtual',
      type: 'Conference',
      description: 'Annual conference showcasing the latest HR technologies and innovation.'
    },
    {
      id: 2,
      title: 'New Manager Orientation',
      date: '2023-11-25',
      time: '10:00 AM - 12:00 PM',
      location: 'Conference Room A',
      type: 'Workshop',
      description: 'Orientation session for newly promoted managers covering key responsibilities.'
    },
    {
      id: 3,
      title: 'Compliance Update Session',
      date: '2023-12-05',
      time: '2:00 PM - 3:30 PM',
      location: 'Virtual',
      type: 'Webinar',
      description: 'Updates on recent changes to employment laws and compliance requirements.'
    },
  ]
  
  // My enrolled courses
  const myEnrolledCourses = [
    {
      id: 1,
      title: 'Leadership Development Program',
      progress: 65,
      nextSession: '2023-11-08',
      instructor: 'Jane Smith',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Project Management Fundamentals',
      progress: 80,
      completedDate: '2023-10-15',
      instructor: 'Michael Wilson',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ]
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  return (
    <div className="training-page">
      <div className="page-header">
        <h1>Training & Development</h1>
        <Button 
          variant="primary" 
          icon={<FaGraduationCap />}
        >
          Request Training
        </Button>
      </div>
      
      {/* My Learning */}
      <section className="my-learning-section">
        <div className="section-header">
          <h2>My Learning</h2>
          <Button 
            variant="outline" 
            size="sm"
          >
            View All
          </Button>
        </div>
        
        <div className="enrolled-courses">
          {myEnrolledCourses.map(course => (
            <Card key={course.id} className="enrolled-course-card">
              <div className="enrolled-course-content">
                <div className="course-image-container">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="course-image"
                  />
                  {course.progress < 100 ? (
                    <div className="progress-indicator">
                      <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle 
                          cx="30" 
                          cy="30" 
                          r="25" 
                          fill="none" 
                          stroke="rgba(255, 255, 255, 0.3)" 
                          strokeWidth="5"
                        />
                        <circle 
                          cx="30" 
                          cy="30" 
                          r="25" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="5"
                          strokeDasharray={`${2 * Math.PI * 25 * course.progress / 100} ${2 * Math.PI * 25 * (1 - course.progress / 100)}`}
                          strokeDashoffset={2 * Math.PI * 25 * 0.25}
                        />
                      </svg>
                      <span className="progress-text">{course.progress}%</span>
                    </div>
                  ) : (
                    <div className="completed-indicator">
                      <FaCertificate className="completed-icon" />
                    </div>
                  )}
                </div>
                <div className="course-details">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-instructor">Instructor: {course.instructor}</p>
                  
                  {course.progress < 100 ? (
                    <>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="next-session">
                        Next session: {formatDate(course.nextSession)}
                      </p>
                    </>
                  ) : (
                    <p className="completed-date">
                      Completed on {formatDate(course.completedDate)}
                    </p>
                  )}
                  
                  <div className="course-actions">
                    <Button 
                      variant={course.progress < 100 ? "primary" : "outline"} 
                      size="sm"
                    >
                      {course.progress < 100 ? "Continue" : "View Certificate"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className="find-course-card">
            <div className="find-course-content">
              <div className="find-icon">
                <FaGraduationCap />
              </div>
              <h3>Find New Courses</h3>
              <p>Explore our catalog to find courses that match your career goals</p>
              <Button variant="primary">Browse Catalog</Button>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Training Programs */}
      <section className="training-programs-section">
        <div className="section-header">
          <h2>Training Programs</h2>
          <Button 
            variant="outline" 
            size="sm"
          >
            View All Programs
          </Button>
        </div>
        
        <div className="programs-grid">
          {trainingPrograms.map(program => (
            <Card key={program.id} className="program-card">
              <div className="program-image-container">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="program-image"
                />
                <span className={`program-status status-${program.enrollmentStatus.toLowerCase()}`}>
                  {program.enrollmentStatus}
                </span>
              </div>
              <div className="program-content">
                <div className="program-category">{program.category}</div>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
                <div className="program-meta">
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{program.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Starts:</span>
                    <span className="meta-value">{formatDate(program.startDate)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Enrollment:</span>
                    <span className="meta-value">{program.enrolled}/{program.maxCapacity}</span>
                  </div>
                </div>
                <div className="program-instructor">
                  <span className="instructor-label">Instructor:</span>
                  <span className="instructor-name">{program.instructor}</span>
                </div>
                <div className="program-actions">
                  <Button 
                    variant={program.enrollmentStatus === 'Open' ? "primary" : "outline"}
                    disabled={program.enrollmentStatus !== 'Open'}
                  >
                    {program.enrollmentStatus === 'Open' ? "Enroll Now" : "Enrollment Closed"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Available Courses */}
      <section className="available-courses-section">
        <div className="section-header">
          <h2>Available Courses</h2>
          <div className="courses-filter">
            <select className="filter-select">
              <option value="all">All Categories</option>
              <option value="management">Management</option>
              <option value="technical">Technical</option>
              <option value="soft-skills">Soft Skills</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
        </div>
        
        <div className="courses-list">
          {availableCourses.map(course => (
            <Card key={course.id} className="course-list-item">
              <div className="course-list-content">
                <div className="course-list-icon">
                  {course.format === 'Video' ? (
                    <FaPlayCircle />
                  ) : (
                    <FaBook />
                  )}
                </div>
                <div className="course-list-details">
                  <div className="course-list-header">
                    <h3 className="course-list-title">{course.title}</h3>
                    <div className="course-list-meta">
                      <span className="course-category">{course.category}</span>
                      <span className="meta-dot">•</span>
                      <span className="course-level">{course.level}</span>
                      <span className="meta-dot">•</span>
                      <span className="course-duration">{course.duration}</span>
                    </div>
                  </div>
                  <p className="course-list-description">{course.description}</p>
                  <div className="course-list-footer">
                    <div className="course-stats">
                      <div className="course-rating">
                        <div className="rating-stars">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span 
                              key={i} 
                              className={`star ${i < Math.floor(course.rating) ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="rating-value">{course.rating.toFixed(1)}</span>
                      </div>
                      <span className="enrolled-count">{course.enrolled} enrolled</span>
                    </div>
                    <Button variant="outline" size="sm">View Course</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="upcoming-events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <Button 
            variant="outline" 
            size="sm"
          >
            View Calendar
          </Button>
        </div>
        
        <div className="events-list">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="event-card">
              <div className="event-content">
                <div className="event-date-container">
                  <div className="event-date">
                    <div className="date-month">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="date-day">
                      {new Date(event.date).getDate()}
                    </div>
                  </div>
                  <div className="event-type">
                    {event.type}
                  </div>
                </div>
                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <div className="meta-item">
                      <FaCalendarAlt className="meta-icon" />
                      <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="meta-item">
                      <span className="event-location">{event.location}</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <Button variant="outline" size="sm">Add to Calendar</Button>
                    <Button variant="primary" size="sm">Register</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Training