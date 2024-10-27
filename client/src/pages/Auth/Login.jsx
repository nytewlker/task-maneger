import React, { useState } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = formData;

        if (!email || !password) {
            setError("Please fill out all fields");
            setLoading(false);
            return;
        }

        try {
            // Send login request to backend
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);

            if (response.status === 200) {
                setSuccess("Login successful! Enjoy.");
                setError("");
                setFormData({
                    email: "",
                    password: "",
                });

                // Store JWT token in localStorage
                const { token } = response.data;
                if (token) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.location.href = "/dashboard"; // Redirect after storing the token
                }
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Universal-Container">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="text-center text-light">
                        <h1>Login</h1>
                        <p className="lead">Enter your credentials to access your account.</p>
                    </div>

                    {/* Error Message */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* Success Message */}
                    {success && <Alert variant="success">{success}</Alert>}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="form-container">
                        <Form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button variant="dark" type="submit" className="mt-4 w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Form>

                        <div className="mt-3 text-center">
                        if not remember password <a href="/forget">forget password</a>
                            <p>
                              Don't have an account? <a href="/register">Register here</a>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
