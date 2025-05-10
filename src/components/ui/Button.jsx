import { motion } from 'framer-motion'
import './Button.css'

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  isDisabled = false,
  isFullWidth = false,
  onClick,
  ...props
}) => {
  const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${isFullWidth ? 'btn-full-width' : ''} 
    ${icon ? `with-icon icon-${iconPosition}` : ''} 
    ${className}
  `
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </motion.button>
  )
}

export default Button