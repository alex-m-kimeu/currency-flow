import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrencyList } from '../CurrencyList';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import data from '../../data/data.json';

describe('Currency list tests', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('should display list of all currencies on render', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        const currencyTable = screen.getByTestId('currency-table');
        expect(currencyTable).toBeInTheDocument();
    });

    it('should display table headers', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        expect(screen.getByTestId('country-header')).toHaveTextContent('Country');
        expect(screen.getByTestId('currency-header')).toHaveTextContent('Currency');
        expect(screen.getByTestId('rate-header')).toHaveTextContent('Rate');
    });

    it('should render 220 countries', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        const countryCells = screen.getAllByTestId(/country-cell-/);
        expect(countryCells.length).toBe(220);
    });

    it('should display first country with alphabet A', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        expect(screen.getByTestId('country-cell-0')).toHaveTextContent(/^A/i);
    });

    it('should sort currencies alphabetically by country', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        const countryCells = screen.getAllByTestId(/country-cell-/);
        const countries = countryCells.map(cell => cell.textContent);
        const sortedCountries = [...countries].sort((a, b) => a.localeCompare(b));
        expect(countries).toEqual(sortedCountries);
    });
    
    it('should display "No currencies found" message when no currencies are available', () => {
        const originalData = data.rates;
        data.rates = [];
        
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );

        const noCurrenciesMessage = screen.getByTestId('no-currencies');
        expect(noCurrenciesMessage).toBeInTheDocument();

        data.rates = originalData;
    });

    it('should filter currencies based on search term', () => {
        render(
            <MemoryRouter initialEntries={['/?search=usd']}>
                <CurrencyList />
            </MemoryRouter>
        );

        const filteredCurrency = screen.getByTestId('currency-cell-0');
        expect(filteredCurrency).toHaveTextContent(/usd/i);
    });

    it('should display currency data correctly', () => {
        render(
            <BrowserRouter>
                <CurrencyList />
            </BrowserRouter>
        );
        const sortedCurrencies = [...data.rates].sort((a, b) => a.country.localeCompare(b.country));
        const firstCurrency = sortedCurrencies[0];
        expect(screen.getByTestId('country-cell-0')).toHaveTextContent(firstCurrency.country);
        expect(screen.getByTestId('currency-cell-0')).toHaveTextContent(firstCurrency.currency);
        expect(screen.getByTestId('rate-cell-0')).toHaveTextContent(firstCurrency.rate.toString());
    });

    it('should display "No currencies found" message for invalid search term', () => {
        render(
            <MemoryRouter initialEntries={['/?search=invalid']}>
                <CurrencyList />
            </MemoryRouter>
        );

        const noCurrenciesMessage = screen.getByTestId('no-currencies');
        expect(noCurrenciesMessage).toBeInTheDocument();
    });
});