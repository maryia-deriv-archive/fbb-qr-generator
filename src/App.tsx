import React, { useState } from 'react';
import './App.scss';
import { Form } from 'components/Form/Form';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { QRCodeGenerator } from 'components/QRCodeGenerator/QRCodeGenerator';
import { QRParamsSelector } from 'components/QRCodeGenerator/QRParamsSelector';


export const App = () => {
    const [vCardData, setVCardData] = useState<string>('');
    const [color, setColor] = useState<string>('');

    return (
        <div className='App'>
            <Header />
            <main>
                <Form onDataSubmit={setVCardData} />
                <div className='temporary-vCard-display'>
                    <QRCodeGenerator data={vCardData} color={color} />
                    <QRParamsSelector onColorSelect={setColor} />
                </div>
            </main>
            <Footer />
            {/* <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer> */}
        </div>
    );
};
