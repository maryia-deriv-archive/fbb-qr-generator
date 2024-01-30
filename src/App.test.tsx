import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from 'App';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLMediaElement.prototype.play = (() => {}) as () => Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLMediaElement.prototype.pause = () => {};

jest.mock('contentful', () => ({
    ...jest.requireActual('contentful'),
    createClient: jest.fn(),
}));

describe('App', () => {
    test('App is rendered with greeting', () => {
        const { container } = render(<App />);
        const app = container.querySelector('.App');
        const greeting = screen.getByText('Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!');
        expect(app).toBeInTheDocument();
        expect(greeting).toBeInTheDocument();
    });
});
