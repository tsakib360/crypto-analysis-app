import { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container, Pagination } from 'react-bootstrap';
import Header from './components/includes/Header';
import Exchange from './components/Exchange';
import Home from './components/routes/Home';

function App() {
  const [currency, setCurrency] = useState('usd')
  const [coins, setCoins] = useState([])
  const [cpage, setCPage] = useState(1)
  // const [coinLength, setCoinLength] = useState(10)
  // const pages = 99;
  const pageLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
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

  function goToNextPage(anms) {
    setCurrentPage((page) => page + 1);
    setCPage(anms)
  }

  function goToPreviousPage(pnms) {
    setCurrentPage((page) => page - 1);
    setCPage(pnms)
  }

  // function changePage(event) {
  //   const pageNumber = Number(event.target.textContent);
  //   setCurrentPage(pageNumber);
  // }

  //  const getPaginatedData = () => {
  //   const startIndex = currentPage * 99 - 99;
  //   const endIndex = startIndex + 99;
  //   return data.slice(startIndex, endIndex);
  //  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    console.log(start)
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  // let active = cpage;
  // let items = [];
  // for (let number = 1; number <= coinLength; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active} onClick={() => setCPage(number)}>
  //       {number}
  //     </Pagination.Item>,
  //   );
  // }

  const marketPagination = (
    <div>
      <Pagination>
        <Pagination.Prev onClick={() => goToPreviousPage(cpage-1)} />
        {getPaginationGroup().map((item, index) => (
          <Pagination.Item key={index} onClick={() => setCPage(item)} active={cpage === item}>
            {item}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => goToNextPage(cpage+1)} />
      </Pagination>
    </div>
  );

  const fetchMarket = useCallback(
    () => {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${cpage}&sparkline=false`)
        .then(res => {
          setCoins(res.data)
        })
        .catch(error => console.log(error))
    }, [currency, cpage]
  )

  // useEffect(() => {

  //   axios.get(`https://api.coingecko.com/api/v3/coins/list`)
  //     .then(res => {
  //       let coinsLength = res.data.length;
  //       let showPageLength = Math.round(coinsLength / 100);
  //       setCoinLength(showPageLength)
  //     })
  //     .catch(error => console.log(error))

  // }, [])

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
              <Home fetchMarket={fetchMarket} coins={coins} currencySign={currencySign} pagination={marketPagination} />
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
