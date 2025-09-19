import React from "react";
import {Button, Modal} from "react-bootstrap";
import Field from "../../../utils/Field";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import useCategory from "../core/action";

interface formCateValue {
    name: string;
    description: string;
}

interface formProps {
    show: boolean;
    mode: 'add' | 'edit';
    category?: any;
    handleClose: () => void;
}


const validationSchema = Yup.object().shape({
    name : Yup.string().required('Category name is required'),
    description : Yup.string().nullable('Category description is required'),
});



const FormCategory:React.FC<formProps> = ({show,mode,handleClose,category}) => {

    const {addCategory,updateCategory} = useCategory();


    const initialValues: formCateValue = {
        name: category?.name || '',
        description : category?.description,
    };


    const handleSubmit = async (values: formCateValue, { resetForm }: any) => {
        try {
            const payload = {
                name : values.name,
                description : values.description
            };
            if (mode === 'add') {
                await addCategory(payload);
            } else if (mode === 'edit' && category) {
                await updateCategory(category.id, payload);
            }
            resetForm();
            handleClose();
        } catch (err: any) {
            console.error("Submit failed in component:", err);
        }
    };


    return <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Add Category' : 'Update Category'}</Modal.Title>
            </Modal.Header>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Field
                                    label="Category Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.name && touched.name}
                                    feedback={errors.name}
                                />

                                <Field
                                    label="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.description && touched.description}
                                    feedback={errors.description}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="primary">{mode === 'add' ? 'Add Category' : 'Update Category'}</Button>
                            </Modal.Footer>
                        </Form>
                    )}
            </Formik>
        </Modal>

    </>
}
export default FormCategory;