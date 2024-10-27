import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault(true);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

            if (response.status === 200) {
                setSuccess("Verify yourself");
                setError("");
                window.location.href = "/verify";
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="Universal-Container">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="text-center text-light">
                        <h1>Forget Account</h1>
                        <p className="lead">Enter your email to access your account.</p>
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
                            {/* <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div> */}
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="mt-4 w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Sending Verification code...
                                    </>
                                ) : (
                                    "Send Verification Code"
                                )}
                            </Button>
                            {/* <button type="submit">Send Verification Code</button> */}
                            </Form>
                            </div>
                </Col>
            </Row>
        </div>

    );
};

export default ForgotPassword;
