import { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container } from 'react-bootstrap';
import Header from './components/includes/Header';
import Exchange from './components/Exchange';
import Home from './components/routes/Home';

function App() {
  const [currency, setCurrency] = useState('usd')
  const [coins, setCoins] = useState([])
  let currencySign = '$'
  if (currency === 'usd') {
    currencySign = '$'
  }
  else if (currency === 'bdt') {
    currencySign = '৳'
  }
  else if (currency === 'inr') {
    currencySign = '₹'
  }
  else if (currency === 'eur') {
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
  

  

  

  

  const handleCurrency = (curr) => {
    setCurrency(curr)
  }

  


  return (
    <div className="App">
      <Router>
        <Header handleCurrency={handleCurrency} currency={currency} />
        <Container>
          <Switch>
            <Route exact path="/">
              <Home fetchMarket={fetchMarket} coins={coins} currencySign={currencySign} />
            </Route>
            <Route exact path="/exchange">
            <Exchange />
            </Route>
          </Switch>
        </Container>
      </Router>

    </div>
  );
}

export default App;
