import React, {Component} from 'react'
import Alert from "react-bootstrap/cjs/Alert";
import Emoji from "./Emoji";

class CheckingDisplayMessage extends Component {

    render() {

        let checked = false;

        if (localStorage.getItem('enabledForm') === 'false') {
            checked = true;
        }

        return (
            <div>
                {checked && <Alert variant={'info'}>Here are the available tables and chairs in the restaurant. <br/> Enter your headcount to get started.</Alert>}
                {(!checked) && <Alert variant={'danger'}>
                    Restaurant has not set any tables or chairs available for AI Smart Cafe! <Emoji symbol={"🍔"}></Emoji><br/>
                    Please set before prior using the customer module. <br/>
                    Thank you. <Emoji symbol={"🤖"}></Emoji>
                </Alert>}
            </div>
        )
    }

}

export default CheckingDisplayMessage
