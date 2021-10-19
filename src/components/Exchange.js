import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap'

const Exchange = () => {
    const [exchange, setExchange] = useState([])

    const fetchExchangeRate = useCallback(
        () => {
            axios.get('https://api.coingecko.com/api/v3/exchange_rates')
                .then(res => {
                    let exchRate = [];
                    var keys = Object.keys(res.data.rates);
                    keys.forEach(function (key) {
                        exchRate.push(res.data.rates[key]);
                    });
                    setExchange(exchRate)
                })
                .catch(error => console.log(error))
        }, []
    )

    useEffect(() => {

        fetchExchangeRate()


    }, [fetchExchangeRate])

    return (
        <div className="mt-4">
            <p className="text-white">Get BTC-to-Currency exchange rates:</p>
            <Table responsive striped bordered hover variant="dark">
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
