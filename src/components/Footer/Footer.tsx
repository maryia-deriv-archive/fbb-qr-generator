import React from 'react';
import './Footer.scss';

const Footer = () => {

    return (
        <footer className="footer_wrapper">
            <div className="footer_info">
            <div className='screw_left'>
                    <div className='dot_left'>
                        <div className='dot_minus'></div>
                        <div className='dot_plus'></div>
                    </div>
                    <div className='dot_left'>
                        <div className='dot_minus'></div>
                        <div className='dot_plus'></div>
                    </div>
                </div>
            <p>© 2022 Foo-Bar-&-Baz, All Rights Reserved.</p>
            <div className='screw_left'>
                    <div className='dot_left'>
                        <div className='dot_minus'></div>
                        <div className='dot_plus'></div>
                    </div>
                    <div className='dot_left'>
                        <div className='dot_minus'></div>
                        <div className='dot_plus'></div>
                    </div>
                </div>
            </div>

        </footer>
    )
}
export default Footer;