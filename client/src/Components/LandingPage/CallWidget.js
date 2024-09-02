import React, { useState } from 'react';

const CallWidget = () => {
  const phoneNumber = "+918801103053"; // Specify the phone number
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className='position-fixed' 
      style={{ 
        bottom: '93px', 
        right: '25px', 
        zIndex: 9999 
      }}
    >
      {isHovered && (
        <div 
          className='position-absolute bg-primary text-white rounded px-3 py-2 shadow text-center'
          style={{ 
            top: '-75px', 
            right: '10px', 
            minWidth: '220px', 
            zIndex: '1000' 
          }}
        >
          Maximize Your Finances Call Now! 📞
        </div>
      )}
      <a
        href={`tel:${phoneNumber}`}
        className={`d-inline-block text-success rounded-circle p-3 shadow ${isHovered ? 'bg-info' : 'bg-white'}`}
        style={{
          textDecoration: 'none',
          fontSize: '20px',
          lineHeight: '1',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        📞
      </a>
    </div>
  );
}

export default CallWidget;
