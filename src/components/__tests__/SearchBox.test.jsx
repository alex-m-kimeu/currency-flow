import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from '../SearchBox';
import { BrowserRouter, MemoryRouter, useSearchParams } from 'react-router-dom';

describe('SearchBox component tests', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('should render the search input', () => {
        render(
            <BrowserRouter>
                <SearchBox />
            </BrowserRouter>
        );
        const searchInput = screen.getByPlaceholderText('Search for a currency eg EUR...');
        expect(searchInput).toBeInTheDocument();
    });

    it('should update the search term in the URL when input value changes', () => {
        const TestComponent = () => {
            const [searchParams] = useSearchParams();
            return (
                <>
                    <SearchBox />
                    <div data-testid="search-param">{searchParams.get('search')}</div>
                </>
            );
        };

        render(
            <MemoryRouter initialEntries={['/']}>
                <TestComponent />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search for a currency eg EUR...');
        fireEvent.change(searchInput, { target: { value: 'usd' } });

        const searchParam = screen.getByTestId('search-param');
        expect(searchParam.textContent).toBe('usd');
    });

    it('should reflect the current search term from the URL in the input', () => {
        render(
            <MemoryRouter initialEntries={['/?search=eur']}>
                <SearchBox />
            </MemoryRouter>
        );
        const searchInput = screen.getByPlaceholderText('Search for a currency eg EUR...');
        expect(searchInput.value).toBe('eur');
    });
});