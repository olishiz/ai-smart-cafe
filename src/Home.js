import React, {Component} from 'react'
import Card from "react-bootstrap/cjs/Card";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/cjs/Alert";

class Home extends Component {
    render() {
        return (
            <div className="mt-5">
                <Card className="text-center">
                    <Card.Img style={{ width: '500px', margin: 'auto'}} variant="top" src="/robot.jpg"/>
                    <Card.Body>
                        <Card.Title>Welcome to AI Smart Cafe</Card.Title>
                        <Card.Text>
                            In here, we simplify the process for restaurant owner's to able to set number of tables and chairs given to each table set.<br/>
                            Customers are able to key in their number of headcount and the system will generate tables according to headcount entered.<br/>
                        </Card.Text>
                        <Alert variant={'info'}>Try it out by clicking in any of the two modules!</Alert>
                        <Button variant="primary" href={'/restaurant'}>Restaurant Module</Button> <Button variant="success" href={'/customer'}>Customer Module</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Home
