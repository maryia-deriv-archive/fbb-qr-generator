import React, { useState } from 'react';
import './QRCodeGenerator.scss';

type TColors = {
    title: string;
    rgb_decimal_code: string;
}[];

type TParams = {
    [key: string]: {
        options: TColors | string[];
        default: string;
        selected: string;
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

type TQRParamsSelectorProps = {
    onColorSelect: (color: string) => void;
    onSizeSelect: (size: string) => void;
    onFormatSelect: (format: string) => void;
};

export const QRParamsSelector: React.FC<TQRParamsSelectorProps> = React.memo(
    ({ onColorSelect, onSizeSelect, onFormatSelect }: TQRParamsSelectorProps) => {
        const [params, setParams] = useState<TParams>({
            [param_types[0]]: { options: colors, default: 'black', selected: '0-0-0' },
            [param_types[1]]: { options: sizes, default: '600x600', selected: '600x600' },
            [param_types[2]]: { options: formats, default: 'png', selected: 'png' },
        });

        const onParamSelect = (value: string, param_type: string) => {
            setParams({ ...params, [param_type]: { ...params[param_type], selected: value } });
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
                                const input_value = color_rgb_decimal_code || `${option}`;

                                return (
                                    <div className='form_radio_btn' key={idx}>
                                        <label className={input_value === param[1].selected ? 'selected' : undefined}>
                                            <input
                                                type='radio'
                                                name={param[0]}
                                                value={input_value}
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
    }
);

QRParamsSelector.displayName = 'QRParamsSelector';
