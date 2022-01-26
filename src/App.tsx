import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

export const App = () => {
    const [v_card_data, setVCardData] = useState<string>('');

    const handleFormData = (v_card_string: string) => {
        setVCardData(v_card_string);
    };

    return (
        <div className='App'>
            <Header />
            <main>
                <Form onDataSubmit={handleFormData} />
                <div className='temporary-vCard-display'>
                    <p>&ldquo;{v_card_data}&ldquo;</p>
                    <p><i> - This v_card_data will be passed to the QR Code Generator</i></p>
                </div>
            </main>
            <Footer />
            {/* <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer> */}
        </div>
    );
};
