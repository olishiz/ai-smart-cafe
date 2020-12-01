import React from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Number Of Tables</th>
            <th>Chairs Per Table</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.restaurantData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.numberOfTables}</td>
                <td>{row.chairsPerTable}</td>
                <td>
                    <button onClick={() => props.removeRestaurant(index)}>Delete</button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {

    const {restaurantData, removeRestaurant} = props

    return (
        <table>
            <TableHeader/>
            <TableBody restaurantData={restaurantData} removeRestaurant={removeRestaurant}/>
        </table>
    )

}

export default Table
