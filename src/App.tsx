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
        margin: 21.25,
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

        const width = +size?.split('x')[0] || 250;
        const height = +size?.split('x')[1] || 250;
        qrCode.update({
            data: vCardData || 'https://deriv.com/',
            image: color === '#FF444F' ? 'qr-logo-coral-red.svg' : 'qr-logo.svg',
            width: width,
            height: height,
            dotsOptions: {
                color: color || colors[0].color_code,
            },
            imageOptions: {
                crossOrigin: 'use-credentials',
                margin: width * 0.085,
                saveAsBlob: true,
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
                blob.text().then(html => {
                    const image = document.querySelector('image');
                    const parent_svg = image?.parentElement;
                    if (image) {
                        const image_x = image.getAttribute('x') || '';
                        const image_y = image.getAttribute('y') || '';
                        const image_width = image.getAttribute('width') || '';
                        const image_height = image.getAttribute('height') || '';
                        image.outerHTML = html; // replace image tag with svg
                        const old_svg = parent_svg?.querySelector('svg');
                        if (old_svg) {
                            old_svg.setAttribute('x', image_x);
                            old_svg.setAttribute('y', image_y);
                            old_svg.setAttribute('width', image_width);
                            old_svg.setAttribute('height', image_height);
                        }
                    }
                    // Specific AI (Adobe Illustrator) workaround: clipPath is not working there,
                    // so we remove <defs> & <clipPath> tags & place all <react> tags inside them outside
                    // after the background rect which we now put at the beginning of svg (to put them behind),
                    // and finally add a path for logo:
                    const svg_qr = document.querySelector('.qr-code-image svg');
                    if (svg_qr) {
                        const defs = svg_qr?.querySelector('defs');
                        if (defs) {
                            const rects = svg_qr?.querySelectorAll('rect');
                            const last_rect = Array.from(rects).pop();
                            const fill = last_rect?.getAttribute('fill') || '';
                            if (last_rect) parent_svg?.removeChild(last_rect);

                            rects.forEach((rect, index) => {
                                const parent = rect?.parentElement;
                                if (index < rects.length - 2) {
                                    // add fill color to rects (dots) that QR code consists of & place them outside of defs:
                                    rect.setAttribute('fill', fill);
                                    parent?.removeChild(rect);
                                    parent_svg?.appendChild(rect);
                                }
                            });
                            parent_svg?.removeChild(defs);
                        }
                    }

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
