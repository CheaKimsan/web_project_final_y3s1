import React from 'react';
import { Form } from 'react-bootstrap';

interface ProductSelectProps {
  label: string;
  name: string;
  value: any;
  options: { value: string | number; label: string }[];
  onChange: any;
  onBlur: any;
  isInvalid?: boolean;
  feedback?: string;
}

const FormSelect: React.FC<ProductSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  isInvalid,
  feedback
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
    <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
  </Form.Group>
);

export default FormSelect;
