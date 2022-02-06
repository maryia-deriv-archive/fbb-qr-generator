import React, { useEffect, useState } from 'react';
import './QRCodeGenerator.scss';

interface TQRCodeGeneratorProps {
    data: string;
    color: string;
    size: string;
    format: string;
    setQRLink: (params: string) => void;
    QR_link: string;
}

export const QRCodeGenerator: React.FC<TQRCodeGeneratorProps> = React.memo(
    ({ data, color, size, format, setQRLink, QR_link }: TQRCodeGeneratorProps) => {
        const [error_message, setErrorMessage] = useState<string>('');
        const [is_loading, setIsLoading] = useState<boolean>(false);

        const getQrSrc = (_data?: string, _color?: string, _size?: string, _format?: string) => {
            const qr_url = `https://api.qrserver.com/v1/create-qr-code/?data=${_data || 'Hello'}&color=${
                _color || '0-0-0'
            }&size=${_size || '600x600'}&format=${_format || 'png'}&margin=30`;
            setIsLoading(true);
            fetch(qr_url)
                .then(({ url }: Response) => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 400);
                    setQRLink(url);
                })
                .catch((error: Error) => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
                });
        };

        useEffect(() => {
            getQrSrc(data, color, size, format);
        }, [data, color, size, format]);

        return (
            <div className='qr-code-image'>
                {error_message ? (
                    <div className='qr-code__error'>
                        <p>{error_message}</p>
                        <p>Please try again.</p>
                    </div>
                ) : QR_link && !is_loading ? (
                    <img className='qr-code' src={QR_link} alt={'qr-code'} />
                ) : (
                    <div className={'preloader-container'}>
                        <img className={'preloader'} src={'preloader.gif'} alt={'preloader'} />
                    </div>
                )}
            </div>
        );
    }
);

QRCodeGenerator.displayName = 'QRCodeGenerator';
