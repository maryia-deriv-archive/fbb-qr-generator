import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLMediaElement.prototype.play = (() => {}) as () => Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLMediaElement.prototype.pause = () => {};

describe('Header', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('Header is rendered', () => {
        const { container } = render(<Header />);
        expect(container.querySelector('header')).toHaveClass('header_wrapper');
        expect((screen.getByAltText('logo') as HTMLImageElement)?.src).toContain('/favicon.ico');
        expect(screen.getByText('Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!')).toBeInTheDocument();
        expect(screen.queryByText('VCARD QR Code')).not.toBeInTheDocument();
    });
});
