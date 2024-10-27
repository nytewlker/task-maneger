import React, { useState } from "react";
import {
    Row,
    Col,
    Form,
    Button,
    Alert,
    Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Here you can handle form submission (e.g., send data to an API)
        console.log(formData);
        setShowAlert(true); // Show success alert
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setLoading(false);

    };

    return (
        <div fluid className="Universal-Container">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="text-center">
                        <h1>Contact Us</h1>
                        <p className="lead">We'd love to hear from you!</p>
                    </div>

                    {showAlert && (
                        <Alert
                            variant="success"
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            Your message has been sent successfully!
                        </Alert>
                    )}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="form-container">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="dark"
                                type="submit"
                                className="mt-4 w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Registering...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUs;
