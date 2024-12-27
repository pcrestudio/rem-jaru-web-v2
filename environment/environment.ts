export const environment: {
  baseUrl: string;
  currencyUrl: string;
  currencyToken: string;
} = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  currencyUrl: process.env.NEXT_FREE_CURRENCY_API!,
  currencyToken: process.env.NEXT_FREE_CURRENCY_API_KEY!,
};
