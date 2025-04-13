export function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)} trillion`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} billion`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} million`;
  } else {
    return `${value.toFixed(2)}`;
  }
}

export function formatPriceWithCommas(value: number): string {
  const rounded = Math.round(value * 100) / 100;

  return `${
    Number.isInteger(rounded)
      ? rounded.toLocaleString()
      : rounded.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }`;
}
