import React from 'react'
import { Table, Image } from 'react-bootstrap'

const Market = ({ data, currencySign, pagination }) => {
    
    return (
        <div>
            <Table responsive striped bordered hover variant="dark">
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
                                <td>{coin.current_price != null ?? currencySign}{coin.current_price}</td>
                                <td>
                                    {coin.price_change_percentage_24h < 0 ? (
                                        <span className="text-danger">{coin.price_change_percentage_24h}</span>
                                    ) : (
                                        <span className="text-success">{coin.price_change_percentage_24h}</span>
                                    )}
                                </td>
                                <td>{coin.market_cap != null && currencySign}{coin.market_cap != null ? coin.market_cap.toLocaleString() : 'N/A'}</td>
                                <td>{coin.total_volume != null && currencySign}{coin.total_volume != null ? coin.total_volume.toLocaleString() : 'N/A'}</td>
                                <td>{new Date(coin.last_updated).toLocaleString()}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            {pagination}
        </div>
    )
}

export default Market
