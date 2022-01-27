import React, { useEffect, useState } from 'react';
import './QRCodeGenerator.scss';

interface TQRCodeGeneratorProps {
    data: string;
    color: string;
}

export const QRCodeGenerator: React.FC<TQRCodeGeneratorProps> = ({ data, color }) => {
    const [qr_src, setQrSrc] = useState<string>('');

    const getQrSrc = (_data: string, _color: string) => {
        setQrSrc(
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
                src={qr_src ? qr_src : 'placeholder.png'}
                alt={qr_src ? 'qr-code' : 'placeholder'}
            />
        </div>
    );
};
