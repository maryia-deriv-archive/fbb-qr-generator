import Footer from 'components/Footer/Footer';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import { colors, QRParamsSelector } from 'components/QRParamsSelector/QRParamsSelector';
import { Surprise } from 'components/Surprise/Surprise';
import QRCodeStyling, { Extension } from '@ckho/qr-code-styling';
import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import './components/QRParamsSelector/QRParamsSelector.scss';

export const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    type: 'svg',
    data: 'https://deriv.com/',
    image: 'qr-logo.svg',
    dotsOptions: {
        color: colors[0].color_code,
    },
    imageOptions: {
        crossOrigin: 'use-credentials',
        margin: 5,
        saveAsBlob: true,
    },
});

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [format, setFormat] = useState<Extension>('svg');
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

        if (format === 'svg') {
            // viewBox is needed to keep svg inside its container
            main_ref.current?.children[0]?.setAttribute(
                'viewBox',
                `0 0 ${+size?.split('x')[0] || 250} ${+size?.split('x')[0] || 250}`
            );
        }
    }, [vCardData, color, size]);

    const handleFormSubmit = (v_card_string: string) => {
        setVCardData(v_card_string);
        setShouldShowSurprise(true);
    };

    const onDownload = () => {
        if (format === 'svg') {
            // a workaround to create svg with svg logo inside. qr-code-styling only creates it with png/jpeg logo
            const getBase64FromUrl = async (url: string) => {
                const data = await fetch(url);
                return await data.blob();
            };
            getBase64FromUrl(color === '#FF444F' ? 'qr-logo-coral-red.svg' : 'qr-logo.svg').then((blob: Blob) => {
                const image = document.querySelector('image');
                const parent_svg = image?.parentElement;

                blob.text().then(html => {
                    if (image) image.outerHTML = html; // replace image tag with svg
                    const path = parent_svg?.querySelector('path');
                    const qr_size = +size?.split('x')[0] || 250;
                    const x_scale = (qr_size * 0.228) / 250; // it's 0.228 for size 250x250
                    const y_scale = (qr_size * 0.2) / 250; // it's 0.2 for size 250x250
                    if (path) {
                        path?.setAttribute(
                            'transform',
                            `translate(${qr_size / 2.63},${qr_size / 2.63}) scale(${x_scale},${y_scale})`
                        );
                        parent_svg?.appendChild(path);
                    }
                    const old_svg = parent_svg?.querySelector('svg');
                    if (old_svg) parent_svg?.removeChild(old_svg);

                    qrCode.download({
                        extension: format as Extension,
                    });
                });
            });
        } else {
            qrCode.download({
                extension: format as Extension,
            });
        }
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
