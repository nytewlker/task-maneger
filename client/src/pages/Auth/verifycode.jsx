import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const VerifyCode = () => {
    const [email, setEmail] = useState(''); // Add email state
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/verify-code', { email, code, newPassword });
            if (response.status === 200) {
                setSuccess("Pssword Change Successfully NOw you can Login ");
                setError("");
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "Error Verifiying code check your code .");
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
                            <Form.Group>
                                <Form.Label>verification code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    placeholder="enter verification code here"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    placeholder='Enter you NEw password here '
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="mt-4 w-100" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" />  Verifying code...
                                    </>
                                ) : (
                                    " verify c Code"
                                )}
                            </Button>
                            {/* <button type="submit">Verify Code and Reset Password</button> */}
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default VerifyCode;
