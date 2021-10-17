import React from 'react'
import { Table, Image } from 'react-bootstrap'

const Market = ({ data, currencySign }) => {
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Coin</th>
                        <th>Current Price</th>
                        <th>Price Change (%)</th>
                        <th>Market Cap.</th>
                        <th>Volume</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(coin => {
                        return (
                            <tr key={coin.id}>
                                <td>{coin.market_cap_rank}</td>
                                <td><Image src={coin.image} roundedCircle height="30" /> {coin.name}</td>
                                <td>{currencySign}{coin.current_price}</td>
                                <td>
                                    {coin.price_change_percentage_24h < 0 ? (
                                        <span className="text-danger">{coin.price_change_percentage_24h}</span>
                                    ) : (
                                        <span className="text-success">{coin.price_change_percentage_24h}</span>
                                    )}
                                </td>
                                <td>{currencySign}{coin.market_cap.toLocaleString()}</td>
                                <td>{currencySign}{coin.total_volume.toLocaleString()}</td>
                                <td>{new Date(coin.last_updated).toLocaleString()}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default Market
