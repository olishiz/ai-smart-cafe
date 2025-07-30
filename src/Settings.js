import React, { Component } from 'react';
import { Card, Row, Col, Form, Button, Alert, Badge, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Settings.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                notifications: true,
                autoSave: true,
                theme: 'light',
                language: 'en',
                maxTableSize: 8,
                defaultChairsPerTable: 4,
                enableAnalytics: true,
                enableSounds: false,
                autoRefresh: true,
                refreshInterval: 30
            },
            showClearModal: false,
            isModified: false
        };
    }

    componentDidMount() {
        this.loadSettings();
    }

    loadSettings = () => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            this.setState({
                settings: { ...this.state.settings, ...JSON.parse(savedSettings) }
            });
        }
    }

    handleSettingChange = (key, value) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [key]: value
            },
            isModified: true
        }));
    }

    saveSettings = () => {
        localStorage.setItem('appSettings', JSON.stringify(this.state.settings));
        this.setState({ isModified: false });
        
        Swal.fire({
            icon: 'success',
            title: 'Settings Saved!',
            text: 'Your preferences have been saved successfully.',
            timer: 2000,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });
    }

    resetSettings = () => {
        const defaultSettings = {
            notifications: true,
            autoSave: true,
            theme: 'light',
            language: 'en',
            maxTableSize: 8,
            defaultChairsPerTable: 4,
            enableAnalytics: true,
            enableSounds: false,
            autoRefresh: true,
            refreshInterval: 30
        };
        
        this.setState({ 
            settings: defaultSettings,
            isModified: true
        });
        
        Swal.fire({
            icon: 'info',
            title: 'Settings Reset',
            text: 'All settings have been reset to default values.',
            timer: 2000,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });
    }

    clearAllData = () => {
        this.setState({ showClearModal: false });
        
        // Clear all app data
        const keysToKeep = ['appSettings'];
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        });

        Swal.fire({
            icon: 'warning',
            title: 'Data Cleared',
            text: 'All restaurant and customer data has been cleared.',
            confirmButtonText: 'OK'
        });
    }

    exportData = () => {
        const data = {
            restaurant: JSON.parse(localStorage.getItem('restaurant') || '[]'),
            customer: JSON.parse(localStorage.getItem('customer') || '[]'),
            settings: this.state.settings,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-smart-cafe-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        Swal.fire({
            icon: 'success',
            title: 'Data Exported',
            text: 'Your data has been exported successfully.',
            timer: 2000,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });
    }

    importData = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.restaurant) {
                        localStorage.setItem('restaurant', JSON.stringify(data.restaurant));
                    }
                    if (data.customer) {
                        localStorage.setItem('customer', JSON.stringify(data.customer));
                    }
                    if (data.settings) {
                        this.setState({ settings: data.settings });
                        localStorage.setItem('appSettings', JSON.stringify(data.settings));
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Data Imported',
                        text: 'Your data has been imported successfully.',
                        confirmButtonText: 'OK'
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Import Failed',
                        text: 'The file format is invalid or corrupted.',
                        confirmButtonText: 'OK'
                    });
                }
            };
            reader.readAsText(file);
        }
        event.target.value = '';
    }

    render() {
        const { settings, showClearModal, isModified } = this.state;

        return (
            <div className="settings-container">
                <div className="settings-header">
                    <h3>⚙️ Application Settings</h3>
                    <p>Customize your AI Smart Cafe experience</p>
                </div>

                {isModified && (
                    <Alert variant="warning" className="mb-4">
                        <strong>⚠️ Unsaved Changes:</strong> You have unsaved changes. Don't forget to save your settings!
                        <Button variant="warning" size="sm" className="ml-3" onClick={this.saveSettings}>
                            Save Now
                        </Button>
                    </Alert>
                )}

                <Row>
                    <Col lg={6} className="mb-4">
                        <Card className="settings-card">
                            <Card.Header>
                                <h5>🎨 Appearance & Interface</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Theme</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={settings.theme}
                                        onChange={(e) => this.handleSettingChange('theme', e.target.value)}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto (System)</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={settings.language}
                                        onChange={(e) => this.handleSettingChange('language', e.target.value)}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                        <option value="de">Deutsch</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Check
                                    type="switch"
                                    id="notifications-switch"
                                    label="Enable notifications"
                                    checked={settings.notifications}
                                    onChange={(e) => this.handleSettingChange('notifications', e.target.checked)}
                                    className="mb-2"
                                />

                                <Form.Check
                                    type="switch"
                                    id="sounds-switch"
                                    label="Enable sound effects"
                                    checked={settings.enableSounds}
                                    onChange={(e) => this.handleSettingChange('enableSounds', e.target.checked)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6} className="mb-4">
                        <Card className="settings-card">
                            <Card.Header>
                                <h5>🏪 Restaurant Configuration</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Maximum Table Size</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="2"
                                        max="20"
                                        value={settings.maxTableSize}
                                        onChange={(e) => this.handleSettingChange('maxTableSize', parseInt(e.target.value))}
                                    />
                                    <Form.Text className="text-muted">
                                        Maximum number of chairs per table
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Default Chairs Per Table</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={settings.defaultChairsPerTable}
                                        onChange={(e) => this.handleSettingChange('defaultChairsPerTable', parseInt(e.target.value))}
                                    />
                                    <Form.Text className="text-muted">
                                        Default value when creating new tables
                                    </Form.Text>
                                </Form.Group>

                                <Form.Check
                                    type="switch"
                                    id="auto-save-switch"
                                    label="Auto-save data"
                                    checked={settings.autoSave}
                                    onChange={(e) => this.handleSettingChange('autoSave', e.target.checked)}
                                    className="mb-2"
                                />

                                <Form.Check
                                    type="switch"
                                    id="analytics-switch"
                                    label="Enable analytics tracking"
                                    checked={settings.enableAnalytics}
                                    onChange={(e) => this.handleSettingChange('enableAnalytics', e.target.checked)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6} className="mb-4">
                        <Card className="settings-card">
                            <Card.Header>
                                <h5>🔄 Auto-Refresh Settings</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Check
                                    type="switch"
                                    id="auto-refresh-switch"
                                    label="Enable auto-refresh"
                                    checked={settings.autoRefresh}
                                    onChange={(e) => this.handleSettingChange('autoRefresh', e.target.checked)}
                                    className="mb-3"
                                />

                                {settings.autoRefresh && (
                                    <Form.Group>
                                        <Form.Label>Refresh Interval (seconds)</Form.Label>
                                        <Form.Control
                                            type="range"
                                            min="10"
                                            max="300"
                                            step="10"
                                            value={settings.refreshInterval}
                                            onChange={(e) => this.handleSettingChange('refreshInterval', parseInt(e.target.value))}
                                        />
                                        <div className="d-flex justify-content-between">
                                            <small>10s</small>
                                            <Badge variant="primary">{settings.refreshInterval}s</Badge>
                                            <small>5m</small>
                                        </div>
                                    </Form.Group>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6} className="mb-4">
                        <Card className="settings-card">
                            <Card.Header>
                                <h5>💾 Data Management</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="data-actions">
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        onClick={this.exportData}
                                        className="mb-2 w-100"
                                    >
                                        📤 Export Data
                                    </Button>
                                    
                                    <div className="mb-2">
                                        <Button 
                                            variant="info" 
                                            size="sm" 
                                            onClick={() => document.getElementById('import-file').click()}
                                            className="w-100"
                                        >
                                            📥 Import Data
                                        </Button>
                                        <input
                                            id="import-file"
                                            type="file"
                                            accept=".json"
                                            style={{ display: 'none' }}
                                            onChange={this.importData}
                                        />
                                    </div>

                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => this.setState({ showClearModal: true })}
                                        className="w-100"
                                    >
                                        🗑️ Clear All Data
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="settings-actions">
                    <Button variant="primary" onClick={this.saveSettings} disabled={!isModified}>
                        💾 Save Settings
                    </Button>
                    <Button variant="outline-secondary" onClick={this.resetSettings} className="ml-2">
                        🔄 Reset to Default
                    </Button>
                </div>

                <Modal show={showClearModal} onHide={() => this.setState({ showClearModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>⚠️ Clear All Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to clear all restaurant and customer data?</p>
                        <Alert variant="danger">
                            <strong>Warning:</strong> This action cannot be undone. Consider exporting your data first.
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showClearModal: false })}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.clearAllData}>
                            Clear All Data
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Settings;