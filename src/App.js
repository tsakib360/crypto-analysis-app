import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container } from 'react-bootstrap';
import Header from './components/includes/Header';
import Market from './components/Market';
import SearchInput from './components/SearchInput';
import Exchange from './components/Exchange';

function App() {
  const [coins, setCoins] = useState([])
  const [exchange, setExchange] = useState([])
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('usd')
  const [menu, setMenu] = useState('market')
  let currencySign = '$'
  let view;
  if(currency === 'usd'){
    currencySign = '$'
  }
  else if(currency === 'bdt'){
    currencySign = '৳'
  }
  else if(currency === 'inr'){
    currencySign = '₹'
  }
  else if(currency === 'eur'){
    currencySign = '€'
  }
  
  const fetchMarket = useCallback(
    () => {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => {
          setCoins(res.data)
        })
        .catch(error => console.log(error))
    }, [currency]
  )
  
  const fetchExchangeRate = useCallback(
    () => {
      axios.get('https://api.coingecko.com/api/v3/exchange_rates')
        .then(res => {
          let exchRate = [];
          var keys = Object.keys(res.data.rates);
          keys.forEach(function(key){
            exchRate.push(res.data.rates[key]);
          });
          setExchange(exchRate)
        })
        .catch(error => console.log(error))
    }, []
  )

  useEffect(() => {

    if(menu === 'market') {
      fetchMarket()

      const intervalId = setInterval(() => {
        fetchMarket()
      }, 60000)

      return () => clearInterval(intervalId);
    }
    else if(menu === 'exchangeMenu') {
      fetchExchangeRate()
    }
    

  }, [fetchMarket, menu, fetchExchangeRate])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleCurrency = (curr) => {
    setCurrency(curr)
  }

  const handleMenu = (menuItem) => {
    setMenu(menuItem)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  if(menu === 'market') {
    view = (
      <>
      <SearchInput handleChange={handleChange} />
        <Market data={filteredCoins} currencySign={currencySign} />
        </>
    )
  }
  else if(menu === 'exchangeMenu') {
    view = (
    <>
    <Exchange exchange={exchange} />
      
    </>
    )
  }

  return (
    <div className="App">
      <Header handleCurrency={handleCurrency} currency={currency} handleMenu={handleMenu} />
      <Container>
        {view}
      </Container>
    </div>
  );
}

export default App;
