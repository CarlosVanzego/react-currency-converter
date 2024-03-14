import React from 'react'

// CurrencyRow component for selecting currency and entering amount
export default function CurrencyRow(props) {
  // Destructuring props to extract required data
  const {
    currencyOptions,         // Array of available currency options
    selectedCurrency,        // Currently selected currency
    onChangeCurrency,        // Handler for changing selected currency
    onChangeAmount,          // Handler for changing amount input
    amount                   // Amount being converted
  } = props

  // Rendering the UI
  return (
    <div>
      {/* Input field for entering amount */}
      <input type="number" className="input" value={amount} onChange={onChangeAmount} />
      {/* Dropdown menu for selecting currency */}
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {/* Mapping through currencyOptions to create dropdown options */}
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}


// What this code does:

// 1. Defines a functional component called CurrencyRow responsible for rendering a row containing an input field for entering the amount and a dropdown menu for selecting the currency.
// 2. Accepts props containing currency options, currently selected currency, handlers for changing currency and amount, and the amount being converted.
// 3. Destructures props to extract required data.
// Renders the UI with an input field for entering the amount and a dropdown menu populated with currency options.
// 4. Utilizes onChange events to trigger handlers for updating the amount and selected currency.