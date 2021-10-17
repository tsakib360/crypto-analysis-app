import React from 'react'
import { Table } from 'react-bootstrap'

const Exchange = ({exchange}) => {
    return (
        <div className="mt-4">
            <p className="text-white">Get BTC-to-Currency exchange rates:</p>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Value</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                {exchange.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.unit}</td>
                        <td>{item.value}</td>
                        <td>{item.type}</td>
                        </tr>
                    
                )
            })}
                </tbody>
            </Table>
            
        </div>
    )
}

export default Exchange
