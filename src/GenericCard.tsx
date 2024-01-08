import React from 'react';

interface GenericCardProps {
  title: string;
  content: React.ReactNode;
  onClick?: () => void;
  onDetailsClick?: () => void;
  customStyle?: React.CSSProperties;
  children?: React.ReactNode; // Ajoutez cette ligne
}

const GenericCard: React.FC<GenericCardProps> = ({
  title,
  content,
  onClick,
  onDetailsClick,
  customStyle,
  children,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ABB2B9',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    marginTop: '8px',
    transition: 'background-color 0.3s',
    ...customStyle,
  };

  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      <h3>{title}</h3>
      <div>{content}</div>
      {children && <div>{children}</div>} {/* Utilisez children si elle est définie */}
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          marginTop: '8px',
        }}
        onClick={onDetailsClick}
      >
        Details
      </button>
    </div>
  );
};

export default GenericCard;
