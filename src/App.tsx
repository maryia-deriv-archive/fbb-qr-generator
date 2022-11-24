import Footer from 'components/Footer/Footer';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import { colors, QRParamsSelector } from 'components/QRParamsSelector/QRParamsSelector';
import { Surprise } from 'components/Surprise/Surprise';
import QRCodeStyling, { FileExtension } from 'qr-code-styling';
import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import './components/QRParamsSelector/QRParamsSelector.scss';

export const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    data: 'https://deriv.com/',
    image: 'qr-logo.svg',
    dotsOptions: {
        color: colors[0].color_code,
    },
    imageOptions: {
        crossOrigin: 'use-credentials',
        margin: 5,
    },
});

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [format, setFormat] = useState<FileExtension>('svg');
    const [should_show_surprise, setShouldShowSurprise] = useState<boolean>(false);
    const [is_qr_appended, setIsQrAppended] = useState<boolean>(false);
    const main_ref = useRef<HTMLDivElement>(null);
    const button_ref = useRef<HTMLButtonElement>(null);
    const qr_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (main_ref.current && !is_qr_appended) {
            qrCode.append(main_ref.current);
            setIsQrAppended(true);
        }

        qrCode.update({
            data: vCardData || 'https://deriv.com/',
            image: color === '#FF444F' ? 'qr-logo-coral-red.svg' : 'qr-logo.svg',
            width: +size?.split('x')[0] || 250,
            height: +size?.split('x')[1] || 250,
            dotsOptions: {
                color: color || colors[0].color_code,
            },
        });
    }, [vCardData, color, size]);

    const handleFormSubmit = (v_card_string: string) => {
        setVCardData(v_card_string);
        setShouldShowSurprise(true);
    };

    const onDownload = () => {
        qrCode.download({
            extension: format as FileExtension,
        });
    };

    return (
        <div className='App'>
            <Header />
            <main>
                <Form onDataSubmit={handleFormSubmit} button_ref={button_ref} />
                <div className='temporary-vCard-display'>
                    <div className='qr-code-image' ref={qr_ref}>
                        <div ref={main_ref} />
                    </div>
                    <QRParamsSelector onColorSelect={setColor} onSizeSelect={setSize} onFormatSelect={setFormat} />
                    <button className='download-qr-button' onClick={onDownload}>
                        Download
                    </button>
                </div>
            </main>
            <Footer />
            <Surprise
                should_show_surprise={should_show_surprise}
                setShouldShowSurprise={setShouldShowSurprise}
                startPosition={button_ref.current}
                destination={qr_ref.current}
            />
        </div>
    );
};
