import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React, { useRef } from 'react';
import { mocked } from 'jest-mock';
import { QRCodeGenerator } from './QRCodeGenerator';

jest.mock('react', () => {
    return {
        ...jest.requireActual('react'),
        useRef: jest.fn(),
    };
});
const ref = { current: { offsetTop: 300, offsetLeft: 1100 } };
const useMockRef = mocked(useRef);
useMockRef.mockReturnValueOnce(ref);

const props = {
    data: 'Hello',
    color: '0-0-0',
    size: '600x600',
    format: 'png',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setQRLink: () => {},
    QR_link: 'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=600x600&format=png&margin=30',
    qr_ref: ref as React.RefObject<HTMLDivElement>,
};

describe('QRCodeGenerator', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('render a red QRCode', async () => {
        render(
            <QRCodeGenerator
                {...props}
                color={'255-0-0'}
                QR_link={
                    'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=255-0-0&size=600x600&format=png&margin=30'
                }
            />
        );
        const image = await waitFor(() => screen.getByAltText('qr-code'), {timeout: 3000});
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass('qr-code');
        expect((image as HTMLImageElement)?.src).toContain(
            'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=255-0-0&size=600x600&format=png&margin=30'
        );
    });
    test('render a QRCode with "Hey" as data', async () => {
        render(
            <QRCodeGenerator
                {...props}
                data={'Hey'}
                QR_link={
                    'https://api.qrserver.com/v1/create-qr-code/?data=Hey&color=0-0-0&size=600x600&format=png&margin=30'
                }
            />
        );
        const image = await waitFor(() => screen.getByAltText('qr-code'), {timeout: 3000});
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass('qr-code');
        expect(image).toHaveAttribute(
            'src',
            'https://api.qrserver.com/v1/create-qr-code/?data=Hey&color=0-0-0&size=600x600&format=png&margin=30'
        );
    });
    test('render a QRCode with size of 100x100', async () => {
        render(
            <QRCodeGenerator
                {...props}
                size={'100x100'}
                QR_link={
                    'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=100x100&format=png&margin=30'
                }
            />
        );
        const image = await waitFor(() => screen.getByAltText('qr-code'), {timeout: 3000});
        const preloader = screen.queryByAltText('preloader');
        expect(image).toBeInTheDocument();
        expect(preloader).not.toBeInTheDocument();
        expect(image).toHaveClass('qr-code');
        expect((image as HTMLImageElement)?.src).toContain(
            'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=100x100&format=png&margin=30'
        );
    });
    test('render a QRCode in .gif format', async () => {
        render(
            <QRCodeGenerator
                {...props}
                format={'gif'}
                QR_link={
                    'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=600x600&format=gif&margin=30'
                }
            />
        );
        const image = await waitFor(() => screen.getByAltText('qr-code'), {timeout: 3000});
        const preloader = screen.queryByAltText('preloader');
        expect(image).toBeInTheDocument();
        expect(preloader).not.toBeInTheDocument();
        expect(image).toHaveClass('qr-code');
        expect((image as HTMLImageElement)?.src).toContain(
            'https://api.qrserver.com/v1/create-qr-code/?data=Hello&color=0-0-0&size=600x600&format=gif&margin=30'
        );
    });
    test('render a QRCode preloader', () => {
        render(<QRCodeGenerator {...props} QR_link={''} />);
        const preloader = screen.getByAltText('preloader');
        const image = screen.queryByAltText('qr-code');
        expect(preloader).toBeInTheDocument();
        expect(image).not.toBeInTheDocument();
        expect(preloader).toHaveClass('preloader');
        expect(preloader).toHaveAttribute('src', 'preloader.gif');
    });
});
