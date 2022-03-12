import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { VFC } from 'react';

type Props = {
  exchangeRates: DocumentNode;
};

export const ExchangeRates: VFC<Props> = ({ exchangeRates }) => {
  const { loading, error, data } = useQuery(exchangeRates);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;
  return data.rates.map(
    ({ currency, rate }: { currency: string; rate: string }) => (
      <div key={currency}>
        <p>
          {currency}:{rate}
        </p>
      </div>
    )
  );
};
