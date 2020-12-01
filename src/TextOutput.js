import React, {Component} from 'react'
import Card from "react-bootstrap/cjs/Card";
import Row from "react-bootstrap/cjs/Row";

class TextOutput extends Component {

    render() {

        let tables = []
        let chairs = []

        for (let i = 1; i <= this.props.restaurant[0].numberOfTables; i++) {
            tables.push('T' + i)
        }

        for (let i = 1; i <= this.props.restaurant[0].chairsPerTable; i++) {
            chairs.push('C' + i)
        }

        return (
            <Row>
                <Card style={{width: '18rem', marginLeft: '20px'}}>
                    <Card.Body>
                        <Card.Title>Number Of Tables: {this.props.restaurant[0].numberOfTables}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Assigned Tables: </Card.Subtitle>
                        <Card.Text>
                            {JSON.stringify(tables, null, " ")}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{width: '18rem', marginLeft: '130px'}}>
                    <Card.Body>
                        <Card.Title>Chairs Per Table: {this.props.restaurant[0].chairsPerTable}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Assigned Chairs: </Card.Subtitle>
                        <Card.Text>
                            {JSON.stringify(chairs, null, " ")}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        )
    }

}

export default TextOutput
