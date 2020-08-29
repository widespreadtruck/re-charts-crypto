import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Graph from './Graph';
import Button from './Button';
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const APIURL = `https://api.coingecko.com/api/v3/`;

const styles = {
  container: {
    "width": "800px",
    "textAlign": "center",
    "marginTop": "150px",
  }
};

function App() {
  const [startDate, setStartDate] = useState(new Date('01/01/2020'));
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;
  const [endDate, setEndDate] = useState(new Date(today));
  // console.log("startDate:", startDate);
  // console.log("endDate:", endDate);

  // const startDate = "1/1/2016";
  // const endDate = "12/8/2020";

  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState(false);

  const getCoinData = async (startDate, endDate) => {
    setIsLoading(true);
    const startDateUnix = dayjs(startDate).format('X');
    const endDateUnix = dayjs(endDate).format('X');
    // console.log(startDateUnix, endDateUnix);

    const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;
    const url = `${APIURL}coins/bitcoin/market_chart/${range}`;
    try {
      const coinResponse = await fetch(url);
      // console.log(url);
      const data = await coinResponse.json();
      // console.log(data);
      setCoinData(data.prices);
      setError(false);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  }

  useEffect( ()=>{
    getCoinData(startDate, endDate);
  }, [startDate, endDate])
  // console.log(coinData);
  
  let content = 'No data';
  if (coinData && coinData.length > 0)
    content = 'Data Loaded';
  if (isLoading) content = 'Loading...';
  if (error) content = 'Oops... There\'s an error';

  const setDate = (date) => {
    // console.log('New Start Date is:', date);
    setStartDate(date);
  };
  

  return (
    <div>
      <h1>BTC/USD</h1>
      <div>Status: {content}</div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <Button setStartDate={setDate} period={7}>7D</Button>
      <Button setStartDate={setDate} period={30}>1M</Button>
      <Button setStartDate={setDate} period={180}>6M</Button>
      <Button setStartDate={setDate} period={365}>1Y</Button>
      <Button setStartDate={setDate} period={1825}>5Y</Button>
      <Button setStartDate={setDate} period={3650}>Max</Button>

      {isLoading
        ? <Loader
          type="ThreeDots" color="#009FFF" height={80} width={80}
          style={styles.container}
        />
        : <Graph data={coinData}/>
        } 
      

    </div>
  );
}

export default App;
