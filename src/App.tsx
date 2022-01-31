import React, { useEffect, useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { QRCodeGenerator } from 'components/QRCodeGenerator/QRCodeGenerator';
import { QRParamsSelector } from 'components/QRCodeGenerator/QRParamsSelector';

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [should_audio_play, setShouldAudioPlay] = useState<boolean>(false);

    useEffect(() => {
        let timeout_id: NodeJS.Timeout;
        if (should_audio_play) {
            timeout_id = setTimeout(() => {
                setShouldAudioPlay(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timeout_id);
        };
    }, [should_audio_play]);

    const handleFormSubmit = (v_card_string: string) => {
        setVCardData(v_card_string);
        setShouldAudioPlay(true);
    };

    const [QR_link, setQRLink] = useState('');

    return (
        <div className='App'>
            <Header />
            <main>
                <Form onDataSubmit={handleFormSubmit} />
                <div className='temporary-vCard-display'>
                    <QRCodeGenerator data={vCardData} color={color} setQRLink={setQRLink} QR_link={QR_link} />
                    <QRParamsSelector onColorSelect={setColor} QR_link={QR_link} />
                </div>
            </main>
            <Footer />
            {should_audio_play && <audio autoPlay src='/surprise-track.mp3'></audio>}
            {/* <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer> */}
        </div>
    );
};
