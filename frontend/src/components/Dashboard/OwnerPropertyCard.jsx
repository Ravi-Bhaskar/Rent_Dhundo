import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../utils/config';

const OwnerPropertyCard = ({ property, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4 bg-light">
      <Card.Img 
        variant="top" 
        src={`${IMAGE_BASE_URL}${property.photo[0]}`} 
        height="200" 
        style={{ objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }} 
      />
      <Card.Body>
        <Card.Title className="fw-bold text-primary">{property.city}, {property.state}</Card.Title>
        <Card.Text className="text-muted small mb-1">{property.address}</Card.Text>
        <Card.Text className="fw-semibold">₹{property.price} | {property.bed} Bed · {property.bath} Bath</Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => navigate(`/dashboard/edit/${property._id}`)}
          >
            Edit
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => onDelete(property._id)}
          >
            Delete
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => navigate(`/dashboard/property/${property._id}`)}
          >
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OwnerPropertyCard;
