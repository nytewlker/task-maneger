import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
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
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                // Store JWT token in localStorage
                const { token } = response.data;
                localStorage.setItem("token", token); // Save the token

                // Redirect or update state after successful login
                window.location.href = "/dashboard";  // Redirect to the dashboard or protected route
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 p-5 h-100">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="text-center">
                        <h1>Login</h1>
                        <p className="lead">Enter your credentials to access your account.</p>
                    </div>

                    {/* Error Message */}
                    {error && <Alert variant="danger">{error}</Alert>}

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
                        <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
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
                        <p>
                            Don't have an account? <a href="/register">Register here</a>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
