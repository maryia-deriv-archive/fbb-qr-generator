import { render, screen } from '@testing-library/react';
import React from 'react';
import { MetallicTitle } from './MetallicTitle';

describe('MetallicTitle', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('MetallicTitle is rendered with "screw-left__form" className', () => {
        const { container } = render(<MetallicTitle className='screw-left__form'>VCARD QR Code</MetallicTitle>);
        const first_div = container.firstChild;
        const dots_with_minus = container.querySelectorAll('.dot_minus');
        expect(first_div).toHaveClass('screw-left__form');
        expect(first_div).not.toHaveClass('screw-left');
        expect(screen.getByText('VCARD QR Code')).toBeInTheDocument();
        expect(dots_with_minus.length).toBe(4);
    });
    test('MetallicTitle is rendered with "screw_left" className', () => {
        const { container } = render(
            <MetallicTitle>
                <div>
                    <p>QR</p>
                    <p>Code</p>
                    <p>Generator...</p>
                </div>
            </MetallicTitle>
        );
        const first_div = container.querySelectorAll('.screw_left');
        const left_dots = container.querySelectorAll('.dot_left');
        const missing_div = container.querySelector<HTMLDivElement>('.screw-left__form');
        expect(first_div.length).toBe(2);
        expect(first_div[0]).not.toHaveClass('screw-left__form');
        expect(screen.getByText('Generator...')).toBeInTheDocument();
        expect(left_dots.length).toBe(4);
        expect(missing_div).not.toBeInTheDocument();
    });
});
