const round = require('lodash/round');

const constants = require('./currencies.json');

/**
 * Returns the number of decimals after the floating point, with which
 * the amount should be formatted, depending on the currency.
 *
 * @param {string}  currency
 * @returns {int}
 */
function getDecimalsForCurrency(currency) {
  if (!isValidCurrency(currency)) {
    throw new Error(`Invalid currency '${currency}'`);
  }

  return constants[currency].decimals;
}

/**
 * Convert an amount of money from the smallest sub-unit of the currency.
 * For example, for a BTC account, this function will convert
 * 12345678 to 0.12345678.
 * Likewise, for a USD account, 12345 is converted to 123.45.
 * This function is the inverse of {@self::toSmallestSubUnit}
 *
 * @param {int}     amount
 * @param {string}  currency
 *
 * @return number
 */
function fromSmallestSubunit(amount, currency) {
  const decimals = getDecimalsForCurrency(currency);
  return round(amount / Math.pow(10, decimals), decimals);
}


/**
 * Convert an amount of smallest sub-unit to the actual currency unit.
 * For example, for a BTC account, this function will convert
 * 0.12345678 to 12345678.
 * Likewise, for a USD account, 123.45 is converted to 12345.
 * This function is the inverse of {@self::fromSmallestSubUnit}
 *
 * @param {number}  amount
 * @param {string}  currency
 *
 * @return int
 */
function toSmallestSubunit(amount, currency) {
  const decimals = getDecimalsForCurrency(currency);
  return Math.round(amount * Math.pow(10, decimals));
}

/**
 * Convert between sub-unit amounts of two currencies with a given rate,
 * correctly converting between sub-units with different decimal amounts.
 * E.g. to convert 1 BTC to USD at rate 250, call
 * convertSubunitAmount( 100000000, 250, 'BTC', 'USD' )
 *
 * @param {int}     amountSubUnit Amount to convert, denominated
 *                               in smallest sub-unit of $from_currency
 * @param {number}  rate           Rate to multiply the amount (non-sub-unit) with
 *                               in order to convert.
 * @param {string}  fromCurrency  Currency denominating input amount (amountSubUnit)
 * @param {string}  toCurrency    Currency denominating output.
 *
 * @return number
 */
function convertSubunitAmount(amountSubUnit, rate, fromCurrency, toCurrency) {
  const exponent = -getDecimalsForCurrency(fromCurrency) + getDecimalsForCurrency(toCurrency);

  return amountSubUnit * rate * Math.pow(10, exponent);
}

/**
 * Computes a rate between two amounts in two different currencies.
 *
 * The result is fromAmount / toAmount (in the main units of their respective currencies)
 *
 * @param {string} fromCurrency
 * @param {int} fromAmount Amount denominated in smallest sub-unit of fromCurrency
 * @param {string} toCurrency
 * @param {int} toAmount Amount denominated in smallest sub-unit of toCurrency
 */
function computeRateBetweenSubunitAmounts(fromCurrency, fromAmount, toCurrency, toAmount) {
  /*
   * If currencies are equal, rate is 1
   */
  if (fromCurrency === toCurrency) {
    return 1;
  }

  /*
   * If toAmount is 0, we don't want to divide by zero.
   * In this case, return NaN
   */
  if (toAmount === 0) {
    return NaN;
  }

  /*
   * Convert both amounts to main units
   */
  const fromAmountMainUnit = fromSmallestSubunit(fromAmount, fromCurrency);
  const toAmountMainUnit = fromSmallestSubunit(toAmount, toCurrency);

  /*
   * Compute and return rate
   */
  return fromAmountMainUnit / toAmountMainUnit;
}

/**
 * Is the provided currency code a valid currency? (fiat or crypto)
 *
 * @param {string} code
 * @returns {boolean}
 */
function isValidCurrency(code) {
  return constants[code] !== undefined;
}

/**
 * Is the provided currency code a valid fiat currency?
 *
 * @param {string} code
 * @returns {boolean}
 */
function isValidFiatCurrency(code) {
  return isValidCurrency(code) && !constants[code].crypto;
}

/**
 * Is the provided currency code a valid crypto-currency?
 *
 * Currently, only BTC is supported
 *
 * @param {string} code
 * @returns {boolean}
 */
function isValidCryptoCurrency(code) {
  return isValidCurrency(code) && constants[code].crypto;
}

function formatAmount(amount, currency) {
  const decimals = getDecimalsForCurrency(currency);
  return fromSmallestSubunit(amount, currency).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

module.exports = {
  getDecimalsForCurrency,
  fromSmallestSubunit,
  toSmallestSubunit,
  convertSubunitAmount,
  computeRateBetweenSubunitAmounts,

  isValidCurrency,
  isValidFiatCurrency,
  isValidCryptoCurrency,
  formatAmount
};
