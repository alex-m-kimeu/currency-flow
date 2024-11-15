import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import data from '../data/data.json';

export const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const sortedCurrencies = [...data.rates].sort((a, b) => a.country.localeCompare(b.country));
    setCurrencies(sortedCurrencies);
  }, []);

  const filteredCurrencies = currencies.filter(currency =>
    currency.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      {filteredCurrencies.map(currency => (
        <div key={currency.country} className="">
          <img src={currency.flag} className="" alt={`${currency.country} flag`} />
          <div className="">
            <div className="">{currency.country}</div>
            <div className="">{currency.currency}</div>
          </div>
          <div className="">{currency.rate}</div>
        </div>
      ))}
    </div>
  );
};