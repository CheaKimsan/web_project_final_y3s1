import React from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

const LoginSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            await login(values.username, values.password);
            await Swal.fire({
                title: "Login Successful!",
                icon: "success",
                html: "Redirecting...",
                timer: 1500,
                didOpen: () => Swal.showLoading(),
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error: any) {
            await Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message,
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            await Swal.fire({
                title: "Login Successful!",
                icon: "success",
                html: "Redirecting...",
                timer: 1500,
                didOpen: () => Swal.showLoading(),
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error: any) {
            await Swal.fire({
                icon: "error",
                title: "Google Login Failed",
                text: error.message,
            });
        }
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <div className="card login-card p-4 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-3">Mini Mart</h2>
                    <p className="text-center text-muted mb-4">Sign in to your account</p>

                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty, touched, submitCount, errors }) => (
                            <Form>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <Field
                                        type="email"
                                        name="username"
                                        placeholder="Enter email"
                                        className={`form-control ${(
                                            touched.username || submitCount > 0
                                        ) && errors.username ? "is-invalid" : ""}`}
                                    />
                                    {(touched.username || submitCount > 0) && errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        className={`form-control ${(
                                            touched.password || submitCount > 0
                                        ) && errors.password ? "is-invalid" : ""}`}
                                    />
                                    {(touched.password || submitCount > 0) && errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <div className="text-center my-3 text-muted">Or Sign in Using</div>

                                <div className="d-grid mb-3">
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <img
                                            src="https://www.svgrepo.com/show/355037/google.svg"
                                            alt="Google"
                                            width={20}
                                        />
                                        Sign in with Google
                                    </button>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!(dirty && isValid)}
                                    >
                                        Login
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

export default LoginPage;
