import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { QRCodeGenerator } from 'components/QRCodeGenerator/QRCodeGenerator';
import { QRParamsSelector } from 'components/QRCodeGenerator/QRParamsSelector';
import { QRCodeDownload } from 'components/QRCodeGenerator/QRCodeDownload';
import { Surprise } from 'components/Surprise/Surprise';

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [format, setFormat] = useState<string>('png');
    const [QR_link, setQRLink] = useState('');
    const [should_show_surprise, setShouldShowSurprise] = useState<boolean>(false);
    const [start, setStart] = useState<number[]>([]);

    const handleFormSubmit = (v_card_string: string) => {
        setVCardData(v_card_string);
        if (start) setShouldShowSurprise(true);
    };

    return (
        <div className='App'>
            <Header />
            <main>
                <Form
                    onDataSubmit={handleFormSubmit}
                    setSurpriseStart={(_top: number, _left: number) => {
                        setStart([_top, _left]);
                    }}
                />
                <div className='temporary-vCard-display'>
                    <QRCodeGenerator
                        data={vCardData}
                        color={color}
                        size={size}
                        format={format}
                        setQRLink={setQRLink}
                        QR_link={QR_link}
                    />
                    <QRParamsSelector onColorSelect={setColor} onSizeSelect={setSize} onFormatSelect={setFormat} />
                    <QRCodeDownload QR_link={QR_link} format={format} />
                </div>
            </main>
            <Footer />
            <Surprise
                should_show_surprise={should_show_surprise}
                setShouldShowSurprise={setShouldShowSurprise}
                startPosition={start}
                destination={document.querySelector('.qr-code-image')}
            />
        </div>
    );
};
