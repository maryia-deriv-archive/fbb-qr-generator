import React, { useEffect, useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { QRCodeGenerator } from 'components/QRCodeGenerator/QRCodeGenerator';
import { QRParamsSelector } from 'components/QRCodeGenerator/QRParamsSelector';
import { QRCodeDownload } from 'components/QRCodeGenerator/QRCodeDownload';

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [start, setStart] = useState<number[]>([]);
    const [should_show_surprise, setShouldShowSurprise] = useState<boolean>(false);
    const [should_audio_play, setShouldAudioPlay] = useState<boolean>(false);

    useEffect(() => {
        let surprise_timeout_id: NodeJS.Timeout;
        let audio_timeout_id: NodeJS.Timeout;
        if (should_show_surprise) {
            surprise_timeout_id = setTimeout(() => {
                setShouldShowSurprise(false);
            }, 2000);
        }
        if (should_audio_play) {
            audio_timeout_id = setTimeout(() => {
                setShouldAudioPlay(false);
            }, 5000);
        }
        return () => {
            if (surprise_timeout_id) clearTimeout(surprise_timeout_id);
            if (audio_timeout_id) clearTimeout(audio_timeout_id);
        };
    }, [should_audio_play, should_show_surprise]);

    const makeSurpriseRun = () => {
        const end = [
            (document.querySelector('.qr-code') as HTMLImageElement)?.offsetTop + 70,
            (document.querySelector('.qr-code') as HTMLImageElement)?.offsetLeft + 70,
        ];
        document.querySelector('.surprise')?.animate(
            [
                { top: `${start[0]}px`, left: `${start[1]}px` },
                { top: `${end[0]}px`, left: `${end[1]}px` },
            ],
            {
                duration: 2000,
                fill: 'both',
                easing: 'linear',
            }
        );
    };

    const handleFormSubmit = (v_card_string: string) => {
        setVCardData(v_card_string);
        setShouldAudioPlay(true);
        makeSurpriseRun();
    };

    const [QR_link, setQRLink] = useState('');

    return (
        <div className='App'>
            <Header />
            <main>
                <Form
                    onDataSubmit={handleFormSubmit}
                    setSurpriseStart={(_top: number, _left: number) => {
                        setStart([_top, _left]);
                        setShouldShowSurprise(true);
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
            {should_show_surprise && <div className='surprise'></div>}
            {should_audio_play && <audio autoPlay src='/surprise-track.mp3'></audio>}
        </div>
    );
};
