import React, {Component} from 'react'
import Alert from "react-bootstrap/Alert";
import CheckingDisplayMessage from "./CheckingDisplayMessage";
import TextOutput from "./TextOutput";
import FormCustomer from "./FormCustomer";
import CustomerQueueSystem from "./CustomerQueueSystem";

class Customer extends Component {

    state = {
        restaurant: [],
        customer: [],
        customerForm: true
    }

    handleSubmit = (customer) => {
        this.setState({customer: [...this.state.customer, customer]})
        this.setState({customerForm: false})
    }

    handleTryAgainButton = () => {
        this.setState({customerForm: true})
        this.setState({customer: []})
    }

    componentWillMount() {
        localStorage.getItem('restaurant') && this.setState({
            restaurant: JSON.parse(localStorage.getItem('restaurant')),
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.removeItem('customer')
        localStorage.setItem('customer', JSON.stringify(nextState.customer))
    }

    render() {

        let checked = false;

        if (localStorage.getItem('enabledForm') === 'false') {
            checked = true;
        }

        const {restaurant, customerForm, customer} = this.state

        return (
            <div>
                <Alert variant="success" className="mt-3"> Customer Module </Alert>
                <CheckingDisplayMessage/>
                {(checked) && <TextOutput restaurant={restaurant}/>}
                {(checked) && (customerForm) && <FormCustomer handleSubmit={this.handleSubmit}/>}
                {(checked) && (!customerForm) && <CustomerQueueSystem customer={customer} restaurant={restaurant} handleTryAgainButton={this.handleTryAgainButton}/>}
            </div>
        )
    }

}

export default Customer
