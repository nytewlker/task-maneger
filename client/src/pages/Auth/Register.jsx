import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form field changes
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
        const { role, name, email, password } = formData;
    
        console.log('Submitting:', formData); // Log form data
    
        if (!role || !name || !email || !password) {
            setError("Please fill out all fields");
            setSuccess("");
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                role,
                name,
                email,
                password,
            });
    
            console.log('Response:', response); // Log the response
    
            if (response.status === 201) {
                setSuccess("Registration successful! Please log in.");
                setError("");
                setFormData({
                    role: "",
                    name: "",
                    email: "",
                    password: "",
                });
    
                const { token } = response.data;
                if (token) {
                    localStorage.setItem("token", token);
                    window.location.href = "/dashboard"; 
                }
            }
        } catch (err) {
            console.error('Error:', err); // Log the error
            console.error('Error response:', err.response); // Log the error response details
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 p-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="text-center">
                        <h1>Create Account</h1>
                        <p className="lead">Choose the type of account to proceed!</p>
                    </div>

                    {/* Error Message */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Success Message */}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Role Selection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                placeholder="Choose role here"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Choose role here
                                </option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Team Member">Team Member</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Full Name Field */}
                        <Form.Group controlId="formBasicName" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </Form.Group>

                        {/* Email Field */}
                        <Form.Group controlId="formBasicEmail" className="mb-3">
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
                        <Form.Group controlId="formBasicPassword" className="mb-3">
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
                                    <Spinner animation="border" size="sm" /> Registering...
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </Form>

                    <div className="mt-3 text-center">
                        <p>
                            Have an account? <a href="/login">Login here</a>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
