import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.put('http://localhost:5000/api/user/settings', formData);
            if (response.status === 200) {
                setSuccessMessage('Settings updated successfully!');
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
                const response = await axios.delete('http://localhost:5000/api/user/delete');
                if (response.status === 200) {
                    setSuccessMessage('Account deleted successfully!');
                    // Optionally redirect the user to the login page or home page
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to delete account. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container className="mt-5">
            <h1>Account Settings</h1>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

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
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading} className="mt-3 w-100">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Update Settings'}
                </Button>
            </Form>

            {/* Delete Account Button */}
            <Button variant="danger" className="mt-4 w-100" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
        </Container>
    );
};

export default Settings;
