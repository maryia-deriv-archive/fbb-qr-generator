import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import { QRCodeGenerator } from 'components/QRCodeGenerator/QRCodeGenerator';
import { QRParamsSelector } from 'components/QRCodeGenerator/QRParamsSelector';

export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');

    return (
        <div className='App'>
            <header className='App-header'>
                <img src='/favicon.ico' alt='logo' />
                <p>Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!</p>
            </header>
            <main>
                <Form onDataSubmit={setVCardData} />
                <div className='temporary-vCard-display'>
                    <QRCodeGenerator data={vCardData} color={color}/>
                    <QRParamsSelector onColorSelect={setColor} />
                </div>
            </main>
            <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer>
        </div>
    );
};
