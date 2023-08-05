export default function formatToCurrency(
  amount: number,
  currency = "NGN",
  decimalPlaces = 0
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimalPlaces,
  }).format(amount);
}
