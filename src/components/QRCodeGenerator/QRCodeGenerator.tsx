import React, { useEffect } from 'react';
import './QRCodeGenerator.scss';

interface TQRCodeGeneratorProps {
    data: string;
    color: string;
    setQRLink: (params: string) => void;
    QR_link: string;
}

export const QRCodeGenerator: React.FC<TQRCodeGeneratorProps> = ({ data, color, setQRLink, QR_link }) => {
    const getQrSrc = (_data: string, _color: string) => {
        setQRLink(
            `https://api.qrserver.com/v1/create-qr-code/?data=${_data || 'Hello'}&color=${
                _color || '0-0-0'
            }&size=600x600`
        );
    };

    useEffect(() => {
        getQrSrc(data, color);
    }, [data, color]);

    return (
        <div className='qr-code-image'>
            <img
                className='qr-code'
                src={QR_link ? QR_link : 'placeholder.png'}
                alt={QR_link ? 'qr-code' : 'placeholder'}
            />
        </div>
    );
};
