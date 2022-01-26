import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import { QRCodeGenerator } from 'components/QRCodeGenerator';

export const App = () => {
    const [vCardData, setVCardData] = useState<string>();

    const handleFormData = (vCardString: string) => {
        setVCardData(vCardString);
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src='/favicon.ico' alt='logo' />
                <p>Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!</p>
            </header>
            <main>
                <Form onDataSubmit={handleFormData} />
                <div className='temporary-vCard-display'>
                    <QRCodeGenerator data={vCardData} />
                </div>
            </main>
            <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer>
        </div>
    );
};
