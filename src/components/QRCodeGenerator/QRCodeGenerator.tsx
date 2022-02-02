import React, { useEffect } from 'react';
import './QRCodeGenerator.scss';

interface TQRCodeGeneratorProps {
    data: string;
    color: string;
    size: string;
    format: string;
    setQRLink: (params: string) => void;
    QR_link: string;
}

export const QRCodeGenerator: React.FC<TQRCodeGeneratorProps> = ({ data, color, size, format, setQRLink, QR_link }) => {
    const getQrSrc = (_data?: string, _color?: string, _size?: string, _format?: string) => {
        setQRLink(
            `https://api.qrserver.com/v1/create-qr-code/?data=${_data || 'Hello'}&color=${_color || '0-0-0'}&size=${
                _size || '600x600'
            }&format=${_format || 'png'}&margin=30`
        );
    };

    useEffect(() => {
        getQrSrc(data, color, size, format);
    }, [data, color, size, format]);

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
