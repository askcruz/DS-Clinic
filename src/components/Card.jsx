import React, { useState } from 'react';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  image, 
  altText,
  className = '',
  onClick = null 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(title);
    }
  };

  return (
    <div 
      className={`service-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image overlay that appears on hover */}
      <div className={`service-card-image-overlay ${isHovered ? 'service-card-image-visible' : ''}`}>
        <img 
          src={image} 
          alt={altText || `${title} service`}
          className="service-card-image"
        />
        <div className="service-card-image-gradient"></div>
      </div>

      {/* Content container */}
      <div className="service-card-content">
        
        <h3 className="service-card-title">
          {title}
        </h3>
        
        <p className="service-card-description">
          {description}
        </p>

      </div>
    </div>
  );
};

export default Card;