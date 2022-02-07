import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('Footer is rendered', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('footer')).toHaveClass('footer_wrapper');
        expect(container.querySelector('.footer_info')).toBeInTheDocument();
        expect(screen.getByText('© 2022 Foo-Bar-&-Baz, All Rights Reserved.')).toBeInTheDocument();
        expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    });
});
