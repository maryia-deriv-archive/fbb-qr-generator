import React from 'react';

interface TQRCodeDownloadProps {
    QR_link: string;
}

export const QRDownload: React.FC<TQRCodeDownloadProps> = ({ QR_link }: TQRCodeDownloadProps) => {
    const download = async () => {
        // Copied from https://www.codegrepper.com/code-examples/javascript/download+file+from+url+in+react
        const result: Response = await fetch(QR_link);
        const blob: Blob = await result.blob();

        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qr_code.png');

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode?.removeChild(link);
    };

    return (
        <button className='download-qr-button' onClick={download}>
            Download
        </button>
    );
};
