import { render } from '@testing-library/react';
import React from 'react';
import { QRCodeDownload } from './QRCodeDownload';

const props = {
    QR_link: 'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=600x600&format=png&margin=30',
    format: 'png',
};

describe('QRCodeDownload', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('QRCodeDownload button is rendered', () => {
        const { container } = render(<QRCodeDownload {...props} />);
        const button = container.firstChild;
        expect(button).toHaveClass('download-qr-button');
        expect(button).toHaveTextContent('Download');
        expect(button).not.toBeDisabled();
    });
    test('QRCodeDownload button is disabled', () => {
        const { container } = render(<QRCodeDownload QR_link='' format='png' />);
        const button = container.firstChild;
        expect(button).toHaveClass('download-qr-button');
        expect(button).toHaveTextContent('Download');
        expect(button).toBeDisabled();
    });
});
