    import React from "react";
    import { useNavigate } from "react-router";
    import { Formik, Form, Field } from "formik";
    import * as Yup from "yup";
    import { useAuth } from "../AuthContext";

    const LoginSchema = Yup.object().shape({
        username: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const LoginPage: React.FC = () => {
        const navigate = useNavigate();
        const { login } = useAuth();

        const handleSubmit = async (values: { username: string; password: string }) => {
            try {
                await login(values.username, values.password);
                navigate("/");
            } catch (error: any) {
                alert(error.message);
            }
        };

        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h2 className="login-title mt-2">Form Login</h2>
                    </div>

                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty, touched, errors }) => (
                            <Form>
                                <div className="form-group">
                                    <label className="custom-label">Email</label>
                                    <Field
                                        type="email"
                                        name="username"
                                        placeholder="Enter email"
                                        className={`input-field ${
                                            touched.username && errors.username ? "input-error" : ""
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
