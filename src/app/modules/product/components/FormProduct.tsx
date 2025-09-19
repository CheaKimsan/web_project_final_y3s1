import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import useCategory from '../../categories/core/action';
import { useProduct } from '../core/action';
import Field from '../../../utils/Field';
import ProductSelect from '../../../utils/FormSelect';
import FormFileInput from '../../../utils/FormFileInput';
import * as Yup from "yup";
interface ProductFormValues {
  pro_name: string;
  cate_id: string;
  price: string | number;
  qty: string | number;
  desc: string;
  thumbnail: File | null;
}

interface FormProductProps {
  show: boolean;
  mode: 'add' | 'edit';
  product?: any; // API product object
  handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  pro_name: Yup.string().required('Product name is required'),
  cate_id: Yup.string().required('Category is required'),
  price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
  qty: Yup.number()
      .typeError('Quantity must be a number')
      .integer('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative')
      .required('Quantity is required'),
  desc: Yup.string().required('Description is required'),
  thumbnail: Yup.mixed().nullable(),
});

const FormProduct: React.FC<FormProductProps> = ({ show, mode, product, handleClose }) => {
  const { addProduct, updateProduct } = useProduct();
  const { categories } = useCategory();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categoryIdFromName = product?.category_name
      ? categories.find(c => c.name === product.category_name)?.id
      : '';

  const initialValues: ProductFormValues = {
    pro_name: product?.name || '',
    cate_id: categoryIdFromName ? String(categoryIdFromName) : '',
    price: product?.price || '',
    qty: product?.quantity || '',
    desc: product?.description || product?.desc || '',
    thumbnail: product?.thumbnail || null,
  };


  useEffect(() => {
    if (product?.thumbnail) setImagePreview(product.thumbnail);
  }, [product]);

  const handleSubmit = async (values: ProductFormValues, { resetForm }: any) => {
    try {
      const payload = {
        pro_name: values.pro_name,
        cate_id: Number(values.cate_id),
        price: Number(values.price),
        qty: Number(values.qty),
        desc: values.desc,
        thumbnail: values.thumbnail,
      };

      // Validate required fields
      if (!payload.pro_name || !payload.cate_id || !payload.price || !payload.qty || !payload.desc) {
        console.error("Missing required fields:", payload);
        return;
      }

      if (mode === 'add') {
        await addProduct(payload);
      } else if (mode === 'edit' && product?.id) {
        await updateProduct(product.id, payload);
      }

      resetForm();
      handleClose();
    } catch (err: any) {
      console.error("Submit failed in component:", err);
    }
  };

  return (
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'add' ? 'Add Product' : 'Update Product'}</Modal.Title>
        </Modal.Header>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Row>
                    <Col md={6}>
                      <Field
                          label="Product Name"
                          name="pro_name"
                          value={values.pro_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.pro_name && touched.pro_name}
                          feedback={errors.pro_name}
                      />
                    </Col>
                    <Col md={6}>
                      <ProductSelect
                          label="Category"
                          name="cate_id"
                          value={values.cate_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={[
                            { value: '', label: 'Select Category' },
                            ...categories.map(c => ({ value: String(c.id), label: c.name })),
                          ]}
                          isInvalid={!!errors.cate_id && touched.cate_id}
                          feedback={errors.cate_id}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                          label="Price"
                          name="price"
                          type="number"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.price && touched.price}
                          feedback={errors.price}
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                          label="Quantity"
                          name="qty"
                          type="number"
                          value={values.qty}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.qty && touched.qty}
                          feedback={errors.qty}
                      />
                    </Col>
                    <Col md={6}>
                      <FormFileInput
                          label="Image File"
                          name="thumbnail"
                          onChange={(file) => {
                            setFieldValue('thumbnail', file); // <-- use 'thumbnail' here
                            if (file) setImagePreview(URL.createObjectURL(file));
                          }}
                          onBlur={handleBlur}
                          isInvalid={!!errors.thumbnail && touched.thumbnail}
                          feedback={errors.thumbnail}
                      />

                      {imagePreview && (
                          <Image
                              src={imagePreview}
                              alt="Preview"
                              fluid
                              thumbnail
                              className="mt-2"
                              style={{ maxHeight: '120px' }}
                          />
                      )}
                    </Col>
                    <Col md={6}>
                      <Field
                          label="Description"
                          name="desc"
                          as="textarea"
                          rows={3}
                          value={values.desc}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.desc && touched.desc}
                          feedback={errors.desc}
                      />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="primary">{mode === 'add' ? 'Add Product' : 'Update Product'}</Button>
                </Modal.Footer>
              </Form>
          )}
        </Formik>
      </Modal>
  );
};

export default FormProduct;