import { motion } from 'framer-motion'
import './Card.css'

const Card = ({ 
  children, 
  title, 
  className = '',
  icon,
  footer,
  variant = 'default',
  ...props 
}) => {
  return (
    <motion.div 
      className={`card card-${variant} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {(title || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          {title && <h3 className="card-title">{title}</h3>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </motion.div>
  )
}

export default Card