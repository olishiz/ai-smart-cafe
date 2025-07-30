import React, { Component } from 'react';
import { Card, Row, Col, ProgressBar, Alert, Badge } from 'react-bootstrap';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantData: [],
            customerData: [],
            stats: {
                totalTables: 0,
                totalChairs: 0,
                totalCustomers: 0,
                occupancyRate: 0,
                avgTableSize: 0
            }
        };
    }

    componentDidMount() {
        this.loadData();
        // Set up interval to refresh data every 30 seconds
        this.interval = setInterval(() => {
            this.loadData();
        }, 30000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    loadData = () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurant') || '[]');
        const customerData = JSON.parse(localStorage.getItem('customer') || '[]');
        
        this.setState({
            restaurantData,
            customerData
        }, this.calculateStats);
    }

    calculateStats = () => {
        const { restaurantData, customerData } = this.state;
        
        const totalTables = restaurantData.reduce((sum, restaurant) => 
            sum + parseInt(restaurant.numberOfTables || 0), 0);
        
        const totalChairs = restaurantData.reduce((sum, restaurant) => 
            sum + (parseInt(restaurant.numberOfTables || 0) * parseInt(restaurant.chairsPerTable || 0)), 0);
        
        const totalCustomers = customerData.reduce((sum, customer) => 
            sum + parseInt(customer.headcount || 0), 0);
        
        const occupancyRate = totalChairs > 0 ? Math.round((totalCustomers / totalChairs) * 100) : 0;
        
        const avgTableSize = totalTables > 0 ? 
            Math.round((totalChairs / totalTables) * 10) / 10 : 0;

        this.setState({
            stats: {
                totalTables,
                totalChairs,
                totalCustomers,
                occupancyRate,
                avgTableSize
            }
        });
    }

    render() {
        const { stats, restaurantData, customerData } = this.state;
        const currentTime = new Date().toLocaleString();

        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h3>📊 Restaurant Analytics Dashboard</h3>
                    <p className="last-updated">Last updated: {currentTime}</p>
                </div>

                <Row className="mb-4">
                    <Col md={6} lg={3} className="mb-3">
                        <Card className="stat-card stat-card-primary">
                            <Card.Body className="text-center">
                                <div className="stat-icon">🏪</div>
                                <h2 className="stat-number">{stats.totalTables}</h2>
                                <p className="stat-label">Total Tables</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                        <Card className="stat-card stat-card-success">
                            <Card.Body className="text-center">
                                <div className="stat-icon">💺</div>
                                <h2 className="stat-number">{stats.totalChairs}</h2>
                                <p className="stat-label">Total Chairs</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                        <Card className="stat-card stat-card-info">
                            <Card.Body className="text-center">
                                <div className="stat-icon">👥</div>
                                <h2 className="stat-number">{stats.totalCustomers}</h2>
                                <p className="stat-label">Current Customers</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                        <Card className="stat-card stat-card-warning">
                            <Card.Body className="text-center">
                                <div className="stat-icon">📏</div>
                                <h2 className="stat-number">{stats.avgTableSize}</h2>
                                <p className="stat-label">Avg Table Size</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col lg={6} className="mb-3">
                        <Card className="info-card">
                            <Card.Header>
                                <h5>🎯 Occupancy Rate</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="occupancy-display">
                                    <div className="occupancy-circle">
                                        <span className="occupancy-percentage">{stats.occupancyRate}%</span>
                                    </div>
                                    <ProgressBar 
                                        now={stats.occupancyRate} 
                                        variant={stats.occupancyRate > 80 ? 'danger' : stats.occupancyRate > 60 ? 'warning' : 'success'}
                                        className="mt-3"
                                    />
                                    <div className="occupancy-status mt-2">
                                        <Badge variant={stats.occupancyRate > 80 ? 'danger' : stats.occupancyRate > 60 ? 'warning' : 'success'}>
                                            {stats.occupancyRate > 80 ? 'Full Capacity' : 
                                             stats.occupancyRate > 60 ? 'Busy' : 
                                             stats.occupancyRate > 30 ? 'Moderate' : 'Available'}
                                        </Badge>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={6} className="mb-3">
                        <Card className="info-card">
                            <Card.Header>
                                <h5>📈 Quick Stats</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="quick-stats">
                                    <div className="quick-stat-item">
                                        <span className="quick-stat-label">Available Seats:</span>
                                        <span className="quick-stat-value">{stats.totalChairs - stats.totalCustomers}</span>
                                    </div>
                                    <div className="quick-stat-item">
                                        <span className="quick-stat-label">Restaurant Setups:</span>
                                        <span className="quick-stat-value">{restaurantData.length}</span>
                                    </div>
                                    <div className="quick-stat-item">
                                        <span className="quick-stat-label">Customer Requests:</span>
                                        <span className="quick-stat-value">{customerData.length}</span>
                                    </div>
                                    <div className="quick-stat-item">
                                        <span className="quick-stat-label">System Status:</span>
                                        <Badge variant="success">🟢 Online</Badge>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {restaurantData.length === 0 && customerData.length === 0 && (
                    <Row>
                        <Col>
                            <Alert variant="info" className="welcome-alert">
                                <Alert.Heading>👋 Welcome to your Dashboard!</Alert.Heading>
                                <p>
                                    This dashboard will show real-time analytics once you start using the Restaurant and Customer modules.
                                </p>
                                <hr />
                                <p className="mb-0">
                                    🏪 Set up your restaurant in the <strong>Restaurant</strong> tab<br/>
                                    👥 Process customer requests in the <strong>Customer</strong> tab
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                )}

                {(restaurantData.length > 0 || customerData.length > 0) && (
                    <Row>
                        <Col>
                            <Card className="info-card">
                                <Card.Header>
                                    <h5>💡 Insights & Recommendations</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="insights">
                                        {stats.occupancyRate > 90 && (
                                            <Alert variant="warning" className="insight-item">
                                                <strong>⚠️ High Occupancy:</strong> Consider adding more tables or optimizing seating arrangements.
                                            </Alert>
                                        )}
                                        {stats.occupancyRate < 30 && stats.totalTables > 0 && (
                                            <Alert variant="info" className="insight-item">
                                                <strong>💡 Low Occupancy:</strong> Great time for maintenance or special promotions.
                                            </Alert>
                                        )}
                                        {stats.avgTableSize > 6 && (
                                            <Alert variant="success" className="insight-item">
                                                <strong>👍 Large Tables:</strong> Perfect for group dining and families.
                                            </Alert>
                                        )}
                                        {stats.totalTables === 0 && (
                                            <Alert variant="primary" className="insight-item">
                                                <strong>🚀 Get Started:</strong> Set up your first restaurant configuration in the Restaurant tab.
                                            </Alert>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

export default Dashboard;