import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import Home from './Home';
import Restaurant from './Restaurant';
import Customer from './Customer';
import Dashboard from './Dashboard';
import Settings from './Settings';
import './FunctionTabs.css';

class FunctionTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'home'
        };
    }

    handleTabSelect = (key) => {
        this.setState({ activeKey: key });
    }

    render() {
        const { activeKey } = this.state;

        return (
            <Container fluid className="function-tabs-container">
                <div className="tabs-header">
                    <h2 className="app-title">
                        <span className="title-icon">🤖</span>
                        AI Smart Cafe
                        <span className="version-badge">v2.0</span>
                    </h2>
                    <p className="app-subtitle">Intelligent restaurant and customer management system</p>
                </div>
                
                <Tabs
                    id="function-tabs"
                    activeKey={activeKey}
                    onSelect={this.handleTabSelect}
                    className="custom-tabs"
                    variant="pills"
                >
                    <Tab 
                        eventKey="home" 
                        title={
                            <span className="tab-content">
                                <span className="tab-icon">🏠</span>
                                <span className="tab-text">Home</span>
                            </span>
                        }
                        className="tab-pane-custom"
                    >
                        <div className="tab-content-wrapper">
                            <Home />
                        </div>
                    </Tab>

                    <Tab 
                        eventKey="dashboard" 
                        title={
                            <span className="tab-content">
                                <span className="tab-icon">📊</span>
                                <span className="tab-text">Dashboard</span>
                            </span>
                        }
                        className="tab-pane-custom"
                    >
                        <div className="tab-content-wrapper">
                            <Dashboard />
                        </div>
                    </Tab>

                    <Tab 
                        eventKey="restaurant" 
                        title={
                            <span className="tab-content">
                                <span className="tab-icon">🏪</span>
                                <span className="tab-text">Restaurant</span>
                            </span>
                        }
                        className="tab-pane-custom"
                    >
                        <div className="tab-content-wrapper">
                            <Restaurant />
                        </div>
                    </Tab>

                    <Tab 
                        eventKey="customer" 
                        title={
                            <span className="tab-content">
                                <span className="tab-icon">👥</span>
                                <span className="tab-text">Customer</span>
                            </span>
                        }
                        className="tab-pane-custom"
                    >
                        <div className="tab-content-wrapper">
                            <Customer />
                        </div>
                    </Tab>

                    <Tab 
                        eventKey="settings" 
                        title={
                            <span className="tab-content">
                                <span className="tab-icon">⚙️</span>
                                <span className="tab-text">Settings</span>
                            </span>
                        }
                        className="tab-pane-custom"
                    >
                        <div className="tab-content-wrapper">
                            <Settings />
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default FunctionTabs;