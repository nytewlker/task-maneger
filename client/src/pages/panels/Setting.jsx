import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Settings = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                    },
                });
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    currentPassword: '',
                    newPassword: '',
                });
            } catch (error) {
                console.error('Error fetching user profile', error);
                setErrorMessage('Failed to load user profile. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.put('http://localhost:5000/api/auth/profile', {
                name: formData.name,
                email: formData.email,
                password: formData.currentPassword, 
                newpassword: formData.newPassword// Only include if newPassword is provided
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                },
            });

            if (response.status === 200) {
                setSuccessMessage('Settings updated successfully!');
                localStorage.setItem('token', response.data.token); // Optionally update the token
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Failed to update settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setLoading(true);
            try {
                const response = await axios.delete('http://localhost:5000/api/auth/delete', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                    },
                });

                if (response.status === 200) {
                    setSuccessMessage('Account deleted successfully!');
                    localStorage.removeItem('token');
                    window.location.href = "/"; // Redirect to home page
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to delete account. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container fluid className="Universal-Container">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <div className="text-center">
                        <h1>Account Settings</h1>
                        <p className="lead">Manage your account settings here.</p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    {/* Success Message */}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="form-container">
                        <Form onSubmit={handleUpdate}>
                            {/* Name Field */}
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            {/* Email Field */}
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            {/* Current Password Field */}
                            <Form.Group className="mb-3">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            {/* New Password Field */}
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" disabled={loading} className="mt-3 w-100">
                                {loading ? <Spinner animation="border" size="sm" /> : 'Update Settings'}
                            </Button>
                        </Form>

                        {/* Delete Account Button */}
                        <Button variant="danger" className="mt-4 w-100" onClick={handleDeleteAccount}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;
