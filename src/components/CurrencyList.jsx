import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import data from '../data/data.json';
import notFound from '../assets/notFound.png';

export const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const sortedCurrencies = [...data.rates].sort((a, b) => a.country.localeCompare(b.country));
    setCurrencies(sortedCurrencies);
  }, []);

  const filteredCurrencies = currencies.filter(currency =>
    currency.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div data-testid="currency-table" className='py-2 px-[20px] md:px-[120px]'>
      {filteredCurrencies.length > 0 ? (
        <table className='w-full mx-auto text-left'>
          <thead className='bg-secondary dark:bg-variant-dark text-[16px] md:text-[18px] text-variant-dark  dark:text-primary-light'>
            <tr>
              <th
                data-testid="country-header"
                className='p-[5px] font-semibold'>Country
              </th>
              <th
                data-testid="currency-header"
                className='p-[5px] font-semibold'>Currency</th>
              <th
                data-testid="rate-header"
                className='p-[5px] font-semibold'>Rate</th>
            </tr>
          </thead>
          <tbody className='text-[14px] md:text-[16px] font-normal text-variant-dark dark:text-primary-light'>
            {filteredCurrencies.map((currency, index) => (
              <tr key={currency.country} className='bg-primary-light dark:bg-variant-dark border-y-[4px] border-primary-light dark:border-primary-dark'>
                <td data-testid={`country-cell-${index}`} className='p-[5px]'>
                  <div className='flex items-center gap-[10px]'>
                    <img src={currency.flag} alt={`${currency.country} flag`} className='w-[25px]' />
                    {currency.country}
                  </div>
                </td>
                <td data-testid={`currency-cell-${index}`} className='p-[5px]'>{currency.currency}</td>
                <td data-testid={`rate-cell-${index}`}  className='p-[5px]'>{currency.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div data-testid="no-currencies" className='flex flex-col justify-center items-center'>
          <img src={notFound} alt='Not found' className='w-[250px] mx-auto' />
          <p className='text-center text-[16px] font-bold text-variant-dark dark:text-primary-light'>No currencies found.</p>
        </div>
      )}
    </div>
  );
};