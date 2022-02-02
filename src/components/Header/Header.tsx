import React, { useEffect, useState } from 'react';
import './Header.scss';

const Header = () => {

    const url = '/spooky.mp3'
    const [audio] = useState(new Audio(url));
    const [background_music_play, setBackgroundPlay] = useState<boolean>(false);
    const toggle = () => setBackgroundPlay(!background_music_play)

    useEffect(() => {
        background_music_play ? audio.play() : audio.pause()
    }, [background_music_play])

    useEffect(() => {
        audio.addEventListener('ended', () => setBackgroundPlay(false));
        return () => {
            audio.removeEventListener('ended', () => setBackgroundPlay(false));
        };
    }, []);

    return (
        <header className="header_wrapper">
            <div className="logo_wrapper">
                <img src='/favicon.ico' alt='logo' />
            </div>
            <div className="header_logo">
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
                <div>
                    <p>QR</p>
                    <p>Code</p>
                    <p>Generator...</p>
                </div>
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
            <div className="title_wrapprer">
                <p>Welcome to the vCard QR Code Generator by Foo-Bar-&-Baz!</p>
                {/* <p>by Foo-Bar-&-Baz!</p> */}
            </div>
            <div className="start_btn" onClick={toggle}>{background_music_play ? <img className="sound_off" src={'/sound_off.ico'} /> : <img className="sound_on" src={'/sound_on.png'} />}</div>

        </header>
    )
}
export default Header;