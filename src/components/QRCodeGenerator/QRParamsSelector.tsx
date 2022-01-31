import React from 'react';
import './QRCodeGenerator.scss';

const colors: TColors = [
    { title: 'black', rgb_decimal_code: '0-0-0' },
    { title: 'red', rgb_decimal_code: '255-0-0' },
    { title: 'blue', rgb_decimal_code: '0-0-255' },
    { title: 'green', rgb_decimal_code: '34-139-34' },
    { title: 'rose', rgb_decimal_code: '220-20-60' },
];

type TColors = {
    title: string;
    rgb_decimal_code: string;
}[];

type TQRParamsSelectorProps = {
    onColorSelect: (color: string) => void;
    QR_link: string;
};

export const QRParamsSelector: React.FC<TQRParamsSelectorProps> = ({ onColorSelect, QR_link }) => {
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => onColorSelect(e.currentTarget.value);

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
        <div className='qr-params-selector'>
            <div className='color-picker'>
                <p>Please select a color for the QR code:</p>
                {colors.map((color, i) => (
                    <span className='form_radio_btn' key={i}>
                        <label>
                            <input
                                type='radio'
                                name='color'
                                value={color.rgb_decimal_code}
                                onChange={handleValueChange}
                                defaultChecked={!!(color.title === 'Black')}
                            />
                            <div className={`color_btn_${color.title}`}>{color.title}</div>
                        </label>
                    </span>
                ))}
            </div>
            <button className='download-qr-button' onClick={download}>
                Download
            </button>
        </div>
    );
};
