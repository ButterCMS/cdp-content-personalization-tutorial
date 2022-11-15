// ./lib/helpers.js

const USD_NGN = 700;

const formatPrice = (amount) =>
  parseFloat(amount).toLocaleString("en", { maximumFractionDigits: 5 });

const convertPrice = (amount, { from = "US", to = "US" }) => {
  let amountInUSD;
  let result;
  let symbol;

  switch (from) {
    case "NG":
      amountInUSD = amount / USD_NGN;
      break;

    default:
      amountInUSD = amount;
      break;
  }

  switch (to) {
    case "NG":
      symbol = "₦";
      result = amountInUSD * USD_NGN;
      break;

    default:
      symbol = "$";
      result = amount;
      break;
  }

  return { amountInUSD, result: `${symbol}${formatPrice(result)}` };
};

export { convertPrice, formatPrice };
