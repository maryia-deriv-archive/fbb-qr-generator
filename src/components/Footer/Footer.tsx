import { MetallicTitle } from 'components/MetallicTitle/MetallicTitle';
import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer_wrapper'>
            <div className='footer_info'>
                <MetallicTitle>
                    <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
                </MetallicTitle>
            </div>
        </footer>
    );
};
export default Footer;
