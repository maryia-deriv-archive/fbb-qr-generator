import React from 'react';
import './App.scss';

export const App = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src='/favicon.ico' alt='logo' />
                <p>Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!</p>
            </header>
            <main>This is the place for the form to generate the QR code ...</main>
            <footer>
                <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            </footer>
        </div>
    );
};
