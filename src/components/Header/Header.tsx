import React from 'react';
import './Header.scss';

const Header = () => {

    return (
        <header className="header_wrapper">
            <div className="header_logo">
                <p>QR</p>
                <p>Code</p>
                <p>Generator...</p>
            </div>
            <div className="title_wrapprer">
            <p>Welcome to the vCard QR Code Generator</p>
            <p>by Foo-Bar-&-Baz!</p>
            </div>
            <div className="logo_wrapper">
            <img src='/favicon.ico' alt='logo' />
            </div>
            
        </header>
    )
}
export default Header;