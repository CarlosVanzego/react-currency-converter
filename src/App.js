import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

// Base URL for fetching exchange rates
const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  // State variables to manage currency conversion
  const [currencyOptions, setCurrencyOptions] = useState([]) // Stores available currency options
  const [fromCurrency, setFromCurrency] = useState() // Stores the currency user is converting from
  const [toCurrency, setToCurrency] = useState() // Stores the currency user is converting to
  const [exchangeRate, setExchangeRate] = useState() // Stores the current exchange rate
  const [amount, setAmount] = useState(1) // Stores the amount being converted
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true) // Tracks whether the amount is in 'fromCurrency'

  // Calculating amounts based on exchange rate and user input
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  // Fetching latest exchange rates on initial render
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        // Extracting the first currency from the fetched data
        const firstCurrency = Object.keys(data.rates)[0]
        // Setting currency options to include the base currency and all available currencies
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        // Setting the default 'fromCurrency' to the base currency
        setFromCurrency(data.base)
        // Setting the default 'toCurrency' to the first currency from the fetched data
        setToCurrency(firstCurrency)
        // Setting the exchange rate for the default 'fromCurrency' to 'toCurrency'
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  // Fetching exchange rates when 'fromCurrency' or 'toCurrency' changes
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  // Event handler for changing amount in 'fromCurrency'
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  // Event handler for changing amount in 'toCurrency'
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  // Rendering the UI
  return (
    <>
      <h1>Convert</h1>
      {/* Component for selecting 'fromCurrency' */}
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      {/* Component for selecting 'toCurrency' */}
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;

// What this code does:

// // 1. Sets up a currency conversion app using React.
// // 2. Fetches the latest exchange rates from an API and updates state accordingly.
// // 3. Manages user input for the amount and selected currencies.
// // 4. Calculates and displays the converted amount based on the exchange rate and user input.