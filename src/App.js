import React from 'react';
import { Block } from './Block';
import './index.css';

function App() {
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates);
      console.log(json.rates);
    })
    .catch(err => {
      console.warn(err);
      alert("Не удалось получить данные!")
    });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value);
    setToPrice(result);
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  }
  

  return (
    <div className="App">
      <Block value={fromPrice} currency="RUB"
       onChangeCurrency={setFromCurrency} 
       onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency="USD" 
      onChangeCurrency={setToCurrency}
      onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
