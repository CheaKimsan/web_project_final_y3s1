// src/app/modules/users/features/FormUser.tsx
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { User } from "../core/model";

interface FormUserProps {
  show: boolean;
  handleClose: () => void;
  mode: "add" | "edit";
  user?: User;
  onSubmit: (user: User) => void;
}

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});

const FormUser: React.FC<FormUserProps> = ({ show, handleClose, mode, user, onSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "add" ? "Add User" : "Edit User"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          role: user?.role || "user",
          id: user?.id || "",
        }}
        validationSchema={UserSchema}
        onSubmit={(values) => onSubmit(values as User)}
      >
        {({ errors, touched }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Name</label>
                <Field name="name" className={`form-control ${errors.name && touched.name ? "is-invalid" : ""}`} />
                {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
              </div>
              <div className="mb-3">
                <label>Email</label>
                <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`} />
                {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
              </div>
              <div className="mb-3">
                <label>Role</label>
                <Field as="select" name="role" className={`form-control ${errors.role && touched.role ? "is-invalid" : ""}`}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                {errors.role && touched.role ? <div className="invalid-feedback">{errors.role}</div> : null}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="primary">{mode === "add" ? "Add" : "Save"}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FormUser;
