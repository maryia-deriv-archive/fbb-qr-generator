import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';

export const App = () => {
    const [v_card_data, setVCardData] = useState<string>('');

    const handleFormData = (v_card_string: string) => {
        setVCardData(v_card_string);
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
                    <p>&ldquo;{v_card_data}&ldquo;</p>
                    <p><i> - This v_card_data will be passed to the QR Code Generator</i></p>
                </div>
            </main>
            <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer>
        </div>
    );
};
