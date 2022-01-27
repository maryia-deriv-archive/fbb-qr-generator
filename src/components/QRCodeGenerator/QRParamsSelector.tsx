import React from 'react';

const colors: TColors = [
    { title: 'Black', rgb_decimal_code: '0-0-0' },
    { title: 'Red', rgb_decimal_code: '255-0-0' },
    { title: 'Blue', rgb_decimal_code: '0-0-255' },
    { title: 'Green', rgb_decimal_code: '34-139-34' },
    { title: 'Rose', rgb_decimal_code: '220-20-60' },
];

type TColors = {
    title: string;
    rgb_decimal_code: string;
}[];

type TQRParamsSelectorProps = {
    onColorSelect: (color: string) => void;
};

export const QRParamsSelector: React.FC<TQRParamsSelectorProps> = ({ onColorSelect }) => {
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => onColorSelect(e.currentTarget.value);

    return (
        <div className='qr-params-selector'>
            <div className='color-picker'>
                <p>Please select a color for the QR code:</p>
                {colors.map((color, i) => (
                    <span key={i}>
                        <label>
                            <input
                                type='radio'
                                name='color'
                                value={color.rgb_decimal_code}
                                onChange={handleValueChange}
                                defaultChecked={!!(color.title === 'Black')}
                            />
                            {color.title}
                        </label>
                    </span>
                ))}
            </div>
        </div>
    );
};
