import React, { Component } from 'react'
import FormRestaurant from "./FormRestaurant";
import Alert from "react-bootstrap/Alert";
import Table from "./Table";
import TextOutput from "./TextOutput";

class Restaurant extends Component {

    state = {
        restaurant: [],
        enabledForm: true,
    }

    handleSubmit = (restaurant) => {
        this.setState({restaurant: [...this.state.restaurant, restaurant]})
        this.setState({enabledForm: false})
    }

    removeRestaurant = (index) => {
        const {restaurant} = this.state

        this.setState({
            restaurant: restaurant.filter((restaurant, i) => {
                return i !== index
            }),
        })

        this.setState({enabledForm: true})
        window.localStorage.clear()
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('restaurant', JSON.stringify(nextState.restaurant))
        localStorage.setItem('enabledForm', JSON.stringify(nextState.enabledForm))
    }

    componentWillMount() {
        localStorage.getItem('restaurant') && this.setState({
            restaurant: JSON.parse(localStorage.getItem('restaurant')),
        })

        if (localStorage.getItem('enabledForm') === 'false') {
            this.setState({
                enabledForm: false
            })
        }

    }

    render() {

        const {restaurant, enabledForm} = this.state

        return (
            <div>
                <Alert variant="primary" className="mt-3">
                    Restaurant Module <br/>
                    Please key in the number of tables and chairs per table in order to generate the restaurant <br/>
                    Press Delete in order to reset the restaurant
                </Alert>
                <Table restaurantData={restaurant} removeRestaurant={this.removeRestaurant}/>
                {enabledForm && <FormRestaurant handleSubmit={this.handleSubmit}/>}
                {(!enabledForm) && <TextOutput restaurant={restaurant}/>}
            </div>
        )
    }

}

export default Restaurant
