import React from 'react';
import './QRCodeGenerator.scss';

type TColors = {
    title: string;
    rgb_decimal_code: string;
}[];

type TParams = {
    [key: string]: {
        options: TColors | string[];
        default: string;
    };
};

const colors: TColors = [
    { title: 'black', rgb_decimal_code: '0-0-0' },
    { title: 'red', rgb_decimal_code: '255-0-0' },
    { title: 'blue', rgb_decimal_code: '0-0-255' },
    { title: 'green', rgb_decimal_code: '34-139-34' },
    { title: 'rose', rgb_decimal_code: '220-20-60' },
];
const sizes: string[] = ['100x100', '200x200', '300x300', '600x600', '800x800', '1000x1000'];
const formats: string[] = ['png', 'svg', 'gif', 'jpg', 'jpeg'];
const param_types = ['color', 'size', 'format'];

const params: TParams = {
    [param_types[0]]: { options: colors, default: 'black' },
    [param_types[1]]: { options: sizes, default: '600x600' },
    [param_types[2]]: { options: formats, default: 'png' },
};

type TQRParamsSelectorProps = {
    onColorSelect: (color: string) => void;
    onSizeSelect: (size: string) => void;
    onFormatSelect: (size: string) => void;
};

export const QRParamsSelector: React.FC<TQRParamsSelectorProps> = ({ onColorSelect, onSizeSelect, onFormatSelect }) => {
    const onParamSelect = (value: string, param_type: string) => {
        if (param_type === 'color') onColorSelect(value);
        else if (param_type === 'size') onSizeSelect(value);
        else if (param_type === 'format') onFormatSelect(value);
    };
    return (
        <div className='qr-params-selector'>
            {Object.entries(params).map((param, i) => (
                <div key={i} className={'param-picker'}>
                    <p>Please select {param[0]}:</p>
                    <div className='btn-block'>
                        {param[1].options.map((option, idx) => {
                            const color_rgb_decimal_code = (option as TColors[0]).rgb_decimal_code;
                            const color_title = (option as TColors[0]).title;

                            return (
                                <div className='form_radio_btn' key={idx}>
                                    <label>
                                        <input
                                            type='radio'
                                            name={param[0]}
                                            value={color_rgb_decimal_code || `${option}`}
                                            onChange={e => onParamSelect(e.currentTarget.value, param[0])}
                                            defaultChecked={!!((color_title || option) === param[1].default)}
                                        />
                                        <div className={color_title && `color_btn_${color_title}`}>
                                            {color_title || option}
                                        </div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
