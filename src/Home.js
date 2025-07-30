import React, {Component} from 'react'
import { Card, Button, Alert, Row, Col, Container } from "react-bootstrap";
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Container>
                    <div className="welcome-section text-center mb-5">
                        <div className="robot-icon mb-4">🤖</div>
                        <h1 className="welcome-title">Welcome to AI Smart Cafe</h1>
                        <p className="welcome-subtitle">
                            Intelligent restaurant and customer management made simple
                        </p>
                    </div>

                    <Row className="mb-5">
                        <Col md={6} className="mb-4">
                            <Card className="feature-card h-100">
                                <Card.Body className="text-center">
                                    <div className="feature-icon">🏪</div>
                                    <Card.Title>Restaurant Management</Card.Title>
                                    <Card.Text>
                                        Set up your restaurant layout by configuring tables and chairs. 
                                        Our smart system helps optimize seating arrangements for maximum efficiency.
                                    </Card.Text>
                                    <div className="feature-list">
                                        <div className="feature-item">✅ Configure table layouts</div>
                                        <div className="feature-item">✅ Set chairs per table</div>
                                        <div className="feature-item">✅ Real-time analytics</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                            <Card className="feature-card h-100">
                                <Card.Body className="text-center">
                                    <div className="feature-icon">👥</div>
                                    <Card.Title>Customer Experience</Card.Title>
                                    <Card.Text>
                                        Customers can input their group size and get automatic table assignments. 
                                        Smart queue management ensures optimal seating efficiency.
                                    </Card.Text>
                                    <div className="feature-list">
                                        <div className="feature-item">✅ Smart table matching</div>
                                        <div className="feature-item">✅ Queue management</div>
                                        <div className="feature-item">✅ Real-time availability</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Alert variant="info" className="getting-started-alert">
                        <Alert.Heading>🚀 Getting Started</Alert.Heading>
                        <p>
                            Ready to transform your restaurant experience? Follow these simple steps:
                        </p>
                        <hr />
                        <Row>
                            <Col md={4} className="step-item">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <strong>Set up Restaurant</strong><br/>
                                    Configure your tables and seating
                                </div>
                            </Col>
                            <Col md={4} className="step-item">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <strong>Manage Customers</strong><br/>
                                    Process customer requests
                                </div>
                            </Col>
                            <Col md={4} className="step-item">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <strong>Monitor Analytics</strong><br/>
                                    Track performance and insights
                                </div>
                            </Col>
                        </Row>
                    </Alert>

                    <div className="quick-actions">
                        <h4 className="text-center mb-4">Quick Actions</h4>
                        <Row className="justify-content-center">
                            <Col md={3} sm={6} className="mb-3">
                                <Button variant="primary" size="lg" className="action-btn w-100">
                                    <div className="btn-icon">📊</div>
                                    View Dashboard
                                </Button>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <Button variant="success" size="lg" className="action-btn w-100">
                                    <div className="btn-icon">🏪</div>
                                    Setup Restaurant
                                </Button>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <Button variant="info" size="lg" className="action-btn w-100">
                                    <div className="btn-icon">👥</div>
                                    Manage Customers
                                </Button>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <Button variant="outline-secondary" size="lg" className="action-btn w-100">
                                    <div className="btn-icon">⚙️</div>
                                    Settings
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <div className="stats-preview mt-5">
                        <Row className="text-center">
                            <Col md={3} sm={6} className="mb-3">
                                <div className="stat-item">
                                    <div className="stat-value">24/7</div>
                                    <div className="stat-label">Available</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <div className="stat-item">
                                    <div className="stat-value">AI</div>
                                    <div className="stat-label">Powered</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <div className="stat-item">
                                    <div className="stat-value">Smart</div>
                                    <div className="stat-label">Analytics</div>
                                </div>
                            </Col>
                            <Col md={3} sm={6} className="mb-3">
                                <div className="stat-item">
                                    <div className="stat-value">Real-time</div>
                                    <div className="stat-label">Updates</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home
