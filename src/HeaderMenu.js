import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Customer from "./Customer";
import Restaurant from "./Restaurant";
import Home from "./Home";

class HeaderMenu extends Component {
    render() {
        return (
            <header>
                <Router>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src="/designs.ico"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            AI Smart Cafe v1.0.0
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/restaurant">Restaurant Module</Nav.Link>
                            <Nav.Link href="/customer">Customer Module</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/restaurant' component={Restaurant}/>
                        <Route path='/customer' component={Customer}/>
                    </Switch>
                </Router>
            </header>
        );
    }
}

export default HeaderMenu
