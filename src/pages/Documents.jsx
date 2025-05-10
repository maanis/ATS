import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  FaFileUpload, 
  FaFileAlt, 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel,
  FaFileImage,
  FaFolder,
  FaDownload,
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaSort,
  FaFilter
} from 'react-icons/fa'
import './Documents.css'

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'policies', name: 'Company Policies' },
    { id: 'forms', name: 'HR Forms' },
    { id: 'contracts', name: 'Contracts' },
    { id: 'reports', name: 'Reports' },
    { id: 'personal', name: 'Personal Documents' },
  ]
  
  // Folders
  const folders = [
    {
      id: 'policies',
      name: 'Company Policies',
      count: 12,
      icon: <FaFolder />,
      color: '#0A84FF',
    },
    {
      id: 'forms',
      name: 'HR Forms',
      count: 18,
      icon: <FaFolder />,
      color: '#FF9500',
    },
    {
      id: 'contracts',
      name: 'Contracts',
      count: 8,
      icon: <FaFolder />,
      color: '#40C8E0',
    },
    {
      id: 'reports',
      name: 'Reports',
      count: 15,
      icon: <FaFolder />,
      color: '#34C759',
    },
    {
      id: 'personal',
      name: 'Personal Documents',
      count: 6,
      icon: <FaFolder />,
      color: '#AF52DE',
    },
  ]
  
  // Documents
  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2023.pdf',
      category: 'policies',
      size: '2.5 MB',
      type: 'pdf',
      uploadedBy: 'Jane Smith',
      uploadedDate: '2023-09-05',
      lastModified: '2023-10-15',
      icon: <FaFilePdf />,
    },
    {
      id: 2,
      name: 'Vacation Request Form.docx',
      category: 'forms',
      size: '350 KB',
      type: 'word',
      uploadedBy: 'Jane Smith',
      uploadedDate: '2023-08-20',
      lastModified: '2023-08-20',
      icon: <FaFileWord />,
    },
    {
      id: 3,
      name: 'Q3 Financial Report.xlsx',
      category: 'reports',
      size: '1.2 MB',
      type: 'excel',
      uploadedBy: 'Michael Wilson',
      uploadedDate: '2023-10-10',
      lastModified: '2023-10-12',
      icon: <FaFileExcel />,
    },
    {
      id: 4,
      name: 'Remote Work Policy.pdf',
      category: 'policies',
      size: '480 KB',
      type: 'pdf',
      uploadedBy: 'Sarah Williams',
      uploadedDate: '2023-07-15',
      lastModified: '2023-09-01',
      icon: <FaFilePdf />,
    },
    {
      id: 5,
      name: 'Employment Contract Template.docx',
      category: 'contracts',
      size: '420 KB',
      type: 'word',
      uploadedBy: 'Jane Smith',
      uploadedDate: '2023-06-30',
      lastModified: '2023-06-30',
      icon: <FaFileWord />,
    },
    {
      id: 6,
      name: 'Company Organization Chart.png',
      category: 'policies',
      size: '1.8 MB',
      type: 'image',
      uploadedBy: 'David Miller',
      uploadedDate: '2023-09-22',
      lastModified: '2023-09-22',
      icon: <FaFileImage />,
    },
    {
      id: 7,
      name: 'Annual Performance Review Form.pdf',
      category: 'forms',
      size: '680 KB',
      type: 'pdf',
      uploadedBy: 'Jane Smith',
      uploadedDate: '2023-10-01',
      lastModified: '2023-10-01',
      icon: <FaFilePdf />,
    },
    {
      id: 8,
      name: 'Benefits Summary 2023.pdf',
      category: 'policies',
      size: '920 KB',
      type: 'pdf',
      uploadedBy: 'Sarah Williams',
      uploadedDate: '2023-01-15',
      lastModified: '2023-01-15',
      icon: <FaFilePdf />,
    },
  ]
  
  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesFolder = !selectedFolder || doc.category === selectedFolder
    
    return matchesSearch && matchesCategory && matchesFolder
  })
  
  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let comparison = 0
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === 'date') {
      comparison = new Date(a.lastModified) - new Date(b.lastModified)
    } else if (sortBy === 'size') {
      const sizeA = parseFloat(a.size.split(' ')[0])
      const sizeB = parseFloat(b.size.split(' ')[0])
      
      // Adjust for units (MB vs KB)
      const adjustedSizeA = a.size.includes('MB') ? sizeA * 1024 : sizeA
      const adjustedSizeB = b.size.includes('MB') ? sizeB * 1024 : sizeB
      
      comparison = adjustedSizeA - adjustedSizeB
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Get file type color
  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf':
        return '#FF3B30'
      case 'word':
        return '#0A84FF'
      case 'excel':
        return '#34C759'
      case 'image':
        return '#AF52DE'
      default:
        return '#8E8E93'
    }
  }
  
  // Handle folder click
  const handleFolderClick = (folderId) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId)
    if (selectedFolder !== folderId) {
      setSelectedCategory(folderId)
    }
  }
  
  // Toggle sort order
  const handleSortClick = (sortType) => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(sortType)
      setSortOrder('desc')
    }
  }
  
  return (
    <div className="documents-page">
      <div className="page-header">
        <h1>Documents</h1>
        <Button 
          variant="primary" 
          icon={<FaFileUpload />}
        >
          Upload Document
        </Button>
      </div>
      
      <div className="documents-content">
        <div className="documents-sidebar">
          {/* Categories */}
          <Card title="Categories" className="categories-card">
            <ul className="categories-list">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedFolder(null)
                    }}
                  >
                    <span className="category-name">{category.name}</span>
                    {category.id !== 'all' && (
                      <span className="category-count">
                        {documents.filter(doc => doc.category === category.id).length}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Storage */}
          <Card title="Storage" className="storage-card">
            <div className="storage-usage">
              <div className="storage-bar">
                <div 
                  className="storage-used"
                  style={{ width: '68%' }}
                ></div>
              </div>
              <div className="storage-details">
                <span className="storage-text">6.8 GB used</span>
                <span className="storage-text total">10 GB total</span>
              </div>
              <div className="storage-upgrade">
                <Button variant="outline" size="sm" className="full-width">
                  Upgrade Storage
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Recent Activity */}
          <Card title="Recent Activity" className="activity-card">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon upload">
                  <FaFileUpload />
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <strong>Jane Smith</strong> uploaded <strong>Q3 Financial Report.xlsx</strong>
                  </p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon download">
                  <FaDownload />
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <strong>Mark Johnson</strong> downloaded <strong>Vacation Request Form.docx</strong>
                  </p>
                  <p className="activity-time">Yesterday, 4:30 PM</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon edit">
                  <FaFileAlt />
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <strong>Sarah Williams</strong> updated <strong>Remote Work Policy.pdf</strong>
                  </p>
                  <p className="activity-time">Oct 15, 2023</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="documents-main">
          {/* Search and filters */}
          <Card className="search-card">
            <div className="search-container">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-container">
                <div className="sort-dropdown">
                  <button className="sort-button">
                    <FaSort className="sort-icon" />
                    <span>Sort by</span>
                  </button>
                  <div className="sort-menu">
                    <button 
                      className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                      onClick={() => handleSortClick('name')}
                    >
                      Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                      className={`sort-option ${sortBy === 'date' ? 'active' : ''}`}
                      onClick={() => handleSortClick('date')}
                    >
                      Date Modified {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                      className={`sort-option ${sortBy === 'size' ? 'active' : ''}`}
                      onClick={() => handleSortClick('size')}
                    >
                      Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-button">
                    <FaFilter className="filter-icon" />
                    <span>Filter</span>
                  </button>
                  <div className="filter-menu">
                    <div className="filter-group">
                      <h4 className="filter-group-title">File Type</h4>
                      <label className="filter-checkbox">
                        <input type="checkbox" defaultChecked />
                        <span>PDF</span>
                      </label>
                      <label className="filter-checkbox">
                        <input type="checkbox" defaultChecked />
                        <span>Word</span>
                      </label>
                      <label className="filter-checkbox">
                        <input type="checkbox" defaultChecked />
                        <span>Excel</span>
                      </label>
                      <label className="filter-checkbox">
                        <input type="checkbox" defaultChecked />
                        <span>Images</span>
                      </label>
                    </div>
                    <div className="filter-group">
                      <h4 className="filter-group-title">Date</h4>
                      <label className="filter-radio">
                        <input type="radio" name="date" defaultChecked />
                        <span>Any time</span>
                      </label>
                      <label className="filter-radio">
                        <input type="radio" name="date" />
                        <span>Last 7 days</span>
                      </label>
                      <label className="filter-radio">
                        <input type="radio" name="date" />
                        <span>Last 30 days</span>
                      </label>
                      <label className="filter-radio">
                        <input type="radio" name="date" />
                        <span>Last 90 days</span>
                      </label>
                    </div>
                    <div className="filter-actions">
                      <Button size="sm" variant="outline">Reset</Button>
                      <Button size="sm" variant="primary">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {!selectedFolder && (
            <div className="folders-grid">
              {folders.map((folder) => (
                <div 
                  key={folder.id}
                  className={`folder-card ${selectedCategory === folder.id ? 'active-folder' : ''}`}
                  onClick={() => handleFolderClick(folder.id)}
                >
                  <div 
                    className="folder-icon"
                    style={{ backgroundColor: `${folder.color}20`, color: folder.color }}
                  >
                    {folder.icon}
                  </div>
                  <div className="folder-details">
                    <h3 className="folder-name">{folder.name}</h3>
                    <p className="folder-count">{folder.count} documents</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Documents list */}
          <Card className="documents-card">
            {sortedDocuments.length > 0 ? (
              <table className="documents-table">
                <thead>
                  <tr>
                    <th 
                      className={`sortable ${sortBy === 'name' ? 'sorted' : ''}`}
                      onClick={() => handleSortClick('name')}
                    >
                      Name
                      {sortBy === 'name' && (
                        <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th>Category</th>
                    <th 
                      className={`sortable ${sortBy === 'size' ? 'sorted' : ''}`}
                      onClick={() => handleSortClick('size')}
                    >
                      Size
                      {sortBy === 'size' && (
                        <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortBy === 'date' ? 'sorted' : ''}`}
                      onClick={() => handleSortClick('date')}
                    >
                      Modified
                      {sortBy === 'date' && (
                        <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDocuments.map(doc => (
                    <tr key={doc.id}>
                      <td className="document-name-cell">
                        <div 
                          className="document-icon"
                          style={{ color: getFileTypeColor(doc.type) }}
                        >
                          {doc.icon}
                        </div>
                        <span className="document-name">{doc.name}</span>
                      </td>
                      <td>
                        <span className="document-category">
                          {categories.find(cat => cat.id === doc.category)?.name}
                        </span>
                      </td>
                      <td>{doc.size}</td>
                      <td>{formatDate(doc.lastModified)}</td>
                      <td>
                        <div className="document-actions">
                          <button className="action-btn view-btn" title="View">
                            <FaEye />
                          </button>
                          <button className="action-btn download-btn" title="Download">
                            <FaDownload />
                          </button>
                          <button className="action-btn delete-btn" title="Delete">
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-documents">
                <div className="no-documents-icon">
                  <FaFileAlt />
                </div>
                <h3>No documents found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Documents