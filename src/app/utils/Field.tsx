import React from 'react';
import { Form } from 'react-bootstrap';

interface ProductFieldProps {
  label: string;
  name: string;
  type?: string;
  as?: 'textarea';
  rows?: number;
  value: any;
  onChange: any;
  onBlur: any;
  isInvalid?: boolean;
  feedback?: string;
}

const Field: React.FC<ProductFieldProps> = ({
  label,
  name,
  type = 'text',
  as,
  rows,
  value,
  onChange,
  onBlur,
  isInvalid,
  feedback
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      as={as}
      rows={rows}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
    <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
  </Form.Group>
);

export default Field;
