import React from 'react';
import './App.scss';
import { Form } from 'components/Form';

export const App = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src='/favicon.ico' alt='logo' />
                <p>Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!</p>
            </header>
            <main>
                <Form/>
            </main>
            <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer>
        </div>
    );
};
