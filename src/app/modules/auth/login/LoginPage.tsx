import React from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

const LoginSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email").nullable("Email is required"),
    password: Yup.string().nullable("Password is required"),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth(); // 👈 bring google login here

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            await login(values.username, values.password);
            await Swal.fire({
                title: "Login Successful!",
                icon: "success",
                html: "Redirecting...",
                timer: 1500,
                didOpen: () => {
                    Swal.showLoading();
                },
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
            await loginWithGoogle(); // 👈 call google login here
            await Swal.fire({
                title: "Login Successful!",
                icon: "success",
                html: "Redirecting...",
                timer: 1500,
                didOpen: () => {
                    Swal.showLoading();
                },
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
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="login-title mt-2">Mini Mart </h2>
                </div>

                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, dirty, touched, submitCount, errors }) => (
                        <Form>
                            <div className="form-group">
                                <label className="custom-label">Email</label>
                                <Field
                                    type="email"
                                    name="username"
                                    placeholder="Enter email"
                                    className={`input-field ${
                                        (touched.username || submitCount > 0) && errors.username
                                            ? "input-error"
                                            : ""
                                    }`}
                                />
                            </div>

                            <div className="form-group">
                                <label className="custom-label">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className={`input-field ${
                                        touched.password && errors.password ? "input-error" : ""
                                    }`}
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="google-login-btn"
                                >
                                    <img
                                        src="https://www.svgrepo.com/show/355037/google.svg"
                                        alt="Google logo"
                                        className="google-icon"
                                    />
                                    <span>Sign in with Google</span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="login-btn mt-3"
                                disabled={!(dirty && isValid)}
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    );
};

export default LoginPage;
