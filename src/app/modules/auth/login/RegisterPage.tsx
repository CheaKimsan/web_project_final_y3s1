import React from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

// Validation schema
const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { registerWithEmail, loginWithGoogle } = useAuth();

    // Email/password registration
    const handleSubmit = async (values: {
        fullName: string;
        username: string;
        password: string;
    }) => {
        try {
            await registerWithEmail(values.username, values.password, values.fullName);
            await Swal.fire({
                title: "Registration Successful!",
                icon: "success",
                html: "Redirecting to login...",
                timer: 1500,
                didOpen: () => Swal.showLoading(),
                showConfirmButton: false,
            });
            navigate("/login");
        } catch (error: any) {
            await Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message,
            });
        }
    };

    // Google registration/login
    const handleGoogleRegister = async () => {
        try {
            await loginWithGoogle();
            await Swal.fire({
                title: "Account Created Successfully!",
                icon: "success",
                html: "Redirecting...",
                timer: 1500,
                didOpen: () => Swal.showLoading(),
                showConfirmButton: false,
            });
            navigate("/"); // Redirect home
        } catch (error: any) {
            await Swal.fire({
                icon: "error",
                title: "Google Sign-Up Failed",
                text: error.message,
            });
        }
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <div className="card p-4 shadow-lg w-50">
                <div className="card-body">
                    <h2 className="card-title text-center mb-3">Create Account</h2>
                    <p className="text-center text-muted mb-4">Register a new Mini Mart account</p>

                    <Formik
                        initialValues={{
                            fullName: "",
                            username: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty, touched, submitCount, errors }) => (
                            <Form>
                                <div className="row">

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Full Name</label>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            className={`form-control ${(touched.fullName || submitCount > 0) && errors.fullName ? "is-invalid" : ""
                                                }`}
                                        />
                                        {(touched.fullName || submitCount > 0) && errors.fullName && (
                                            <div className="invalid-feedback">{errors.fullName}</div>
                                        )}
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label className="form-label">Email</label>
                                        <Field
                                            type="email"
                                            name="username"
                                            placeholder="Enter email"
                                            className={`form-control ${(touched.username || submitCount > 0) && errors.username ? "is-invalid" : ""
                                                }`}
                                        />
                                        {(touched.username || submitCount > 0) && errors.username && (
                                            <div className="invalid-feedback">{errors.username}</div>
                                        )}
                                    </div>

                                    <div className="mb-3 col-6">
                                    <label className="form-label">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        className={`form-control ${(touched.password || submitCount > 0) && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {(touched.password || submitCount > 0) && errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-6">
                                    <label className="form-label">Confirm Password</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        className={`form-control ${(touched.confirmPassword || submitCount > 0) && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {(touched.confirmPassword || submitCount > 0) && errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>

                                </div>



                                
                                <div className="text-center my-3 text-muted">Or Sign Up Using</div>

                                <div className="d-grid mb-3">
                                    <button
                                        type="button"
                                        onClick={handleGoogleRegister}
                                        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <img
                                            src="https://www.svgrepo.com/show/355037/google.svg"
                                            alt="Google"
                                            width={20}
                                        />
                                        Sign up with Google
                                    </button>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <button type="button" className="btn btn-link" onClick={() => navigate("/dashboard")}>
                                        Back to Login
                                    </button>

                                    <button type="submit" className="btn btn-success" disabled={!(dirty && isValid)}>
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
