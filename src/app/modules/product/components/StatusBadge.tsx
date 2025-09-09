import React from 'react';
import { ProductStatus } from '../../../../types/Product'; // Adjust path

interface StatusBadgeProps {
  status: ProductStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (productStatus: ProductStatus): React.CSSProperties => {
    switch (productStatus) {
      case 'In Stock':
        return { color: '#10B981' }; // Green
      case 'Low Stock':
        return { color: '#F59E0B' }; // Amber/Orange
      case 'Out of Stock':
        return { color: '#EF4444' }; // Red
      default:
        return { color: '#6B7280' }; // Gray
    }
  };

  const badgeStyle: React.CSSProperties = {
    ...getStatusStyles(status),
    fontWeight: '600',
    fontSize: '0.875rem',
  };

  return <span style={badgeStyle}>{status}</span>;
};

export default StatusBadge;