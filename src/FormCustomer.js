import React, {Component} from 'react'

class FormCustomer extends Component {

    initialState = {
        noOfHeadcount: '',
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
        const {noOfHeadcount} = this.state

        return (
            <form>
                <label htmlFor={noOfHeadcount}>Number Of Headcount: </label>
                <input style={{ width: '100px'}} type="number" name="noOfHeadcount" id="noOfHeadcount" value={noOfHeadcount} onChange={this.handleChange}/>
                <input type="button" value="Submit" onClick={this.submitForm}/>
            </form>
        )

    }

}

export default FormCustomer;
