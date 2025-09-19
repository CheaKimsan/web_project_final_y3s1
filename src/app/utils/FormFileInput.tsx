import React from 'react';
import { Form } from 'react-bootstrap';

interface ProductFileInputProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  onBlur: any;
  isInvalid?: boolean;
  feedback?: string;
}

const FormFileInput: React.FC<ProductFileInputProps> = ({
  label,
  name,
  onChange,
  onBlur,
  isInvalid,
  feedback
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type="file"
      name={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.files ? e.currentTarget.files[0] : null);
      }}
      onBlur={onBlur}
      isInvalid={isInvalid}
    />
    <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
  </Form.Group>
);

export default FormFileInput;
