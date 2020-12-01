import React, {Component} from 'react'
import Card from "react-bootstrap/cjs/Card";
import ListGroup from "react-bootstrap/cjs/ListGroup";
import Emoji from "./Emoji";
import Button from "react-bootstrap/cjs/Button";
import _ from 'underscore'

class CustomerQueueSystem extends Component {

    render() {

        let tables = []

        for (let i = 1; i <= this.props.restaurant[0].numberOfTables; i++) {
            tables.push('T' + i)
        }

        let chairsPerTable = this.props.restaurant[0].chairsPerTable
        let noOfHeadcount = this.props.customer[0].noOfHeadcount

        let tablesRequired = Math.ceil(noOfHeadcount / chairsPerTable);

        let randomTables = _.sample(tables, tablesRequired)

        return (
            <Card style={{width: '1000px', marginTop: '30px'}}>
                <Card.Header>Number Of Headcount: {this.props.customer[0].noOfHeadcount} 👤</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Tables Required : {tablesRequired} <Emoji symbol={'🍽'}></Emoji> </ListGroup.Item>
                    <ListGroup.Item>Please head to Table: {JSON.stringify(randomTables, null, " ")}</ListGroup.Item>
                    <ListGroup.Item> <Button variant={'primary'} onClick={this.props.handleTryAgainButton}>Reset</Button></ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }

}

export default CustomerQueueSystem
