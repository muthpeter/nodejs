# node-currency

[![npm version](https://badge.fury.io/js/%40coinify%2Fcurrency.svg)](https://badge.fury.io/js/%40coinify%2Fcurrency)

## Installation

Run the following command

```
npm install --save @coinify/currency
```

## Usage

```js
const currency = require('@coinify/currency');
```

`currency` exposes the following functions:

### `getDecimalsForCurrency(currency)`
_Returns the number of decimals after the floating point, with which the amount should be formatted, depending on the currency._

### `fromSmallestSubunit(amount, currency)`
_Convert an amount of money from the smallest sub-unit of the currency to the main-unit._

### `toSmallestSubunit(amount, currency)`
_Convert an amount of money from the main-unit of the currency to the smallest sub-unit._

### `convertSubunitAmount(amountSubUnit, rate, fromCurrency, toCurrency)`
_Convert between sub-unit amounts of two currencies with a given rate, correctly converting between sub-units with different decimal amounts._

### `computeRateBetweenSubunitAmounts(fromCurrency, fromAmount, toCurrency, toAmount)`
_Computes a rate between two amounts in two different currencies._

### `isValidCurrency(code)`
_Is the provided currency code a valid currency? (fiat or crypto)_

### `isValidFiatCurrency(code)`
_Is the provided currency code a valid fiat currency?_

### `isValidCryptoCurrency(code)`
_Is the provided currency code a valid crypto currency?_
