import React, {Component} from 'react'

class FormRestaurant extends Component {

    initialState = {
        numberOfTables: '',
        chairsPerTable: '',
    }

    state = this.initialState

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }

    render() {
        const {numberOfTables, chairsPerTable} = this.state

        return (
            <form>
                <label htmlFor={numberOfTables}>Numbers Of Tables: </label>
                <input style={{width: '100px'}} type="number" name="numberOfTables" id="numberOfTables"
                       value={numberOfTables} onChange={this.handleChange}/>
                <label htmlFor={chairsPerTable}>Chairs Per Table: </label>
                <input style={{width: '100px'}} type="number" name="chairsPerTable" id="chairsPerTable"
                       value={chairsPerTable} onChange={this.handleChange}/>
                <input type="button" value="Submit" onClick={this.submitForm}/>
            </form>
        )

    }

}

export default FormRestaurant;
