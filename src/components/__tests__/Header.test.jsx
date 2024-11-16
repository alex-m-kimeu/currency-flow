import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header component tests', () => {

    beforeEach(() => {
        localStorage.clear();
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });

    it('should render the header component', () => {
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('should toggle to dark mode when button is clicked', () => {
        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        const logo = screen.getByAltText('logo');
        expect(logo.src).toContain('logo-dark.png');
        expect(document.documentElement).toHaveClass('dark');
    });

    it('should toggle back to light mode when button is clicked again', () => {
        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);
        fireEvent.click(toggleButton);

        const logo = screen.getByAltText('logo');
        expect(logo.src).toContain('logo-light.png');
        expect(document.documentElement).not.toHaveClass('dark');
    });
});