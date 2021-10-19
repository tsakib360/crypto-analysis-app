import React, { useState, useEffect } from 'react'
import Market from '../Market'
import SearchInput from '../SearchInput'

const Home = ({ fetchMarket, coins, currencySign, pagination }) => {

    const [search, setSearch] = useState('')



    useEffect(() => {

        fetchMarket()

        const intervalId = setInterval(() => {
            fetchMarket()
        }, 60000)

        return () => clearInterval(intervalId);


    }, [fetchMarket])

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <SearchInput handleChange={handleChange} />
            <Market
                data={filteredCoins}
                currencySign={currencySign}
                pagination={pagination}
            />
        </div>
    )
}

export default Home
