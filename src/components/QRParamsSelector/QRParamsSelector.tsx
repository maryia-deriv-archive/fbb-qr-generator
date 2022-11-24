import { FileExtension } from 'qr-code-styling';
import React, { useState } from 'react';
import './QRParamsSelector.scss';

type TColors = {
    title: string;
    color_code: string;
}[];

type TParams = {
    [key: string]: {
        options: TColors | string[];
        default: string;
        selected: string;
    };
};

export const colors: TColors = [
    { title: 'slate', color_code: '#414652' },
    { title: 'coral red', color_code: '#FF444F' },
];
const sizes: string[] = ['250x250', '500x500', '750x750', '1000x1000'];
const formats: string[] = ['svg', 'jpeg', 'png', 'webp'];
const param_types = ['color', 'size', 'format'];

type TQRParamsSelectorProps = {
    onColorSelect: (color: string) => void;
    onSizeSelect: (size: string) => void;
    onFormatSelect: (format: FileExtension) => void;
};

export const QRParamsSelector: React.FC<TQRParamsSelectorProps> = React.memo(
    ({ onColorSelect, onSizeSelect, onFormatSelect }: TQRParamsSelectorProps) => {
        const [params, setParams] = useState<TParams>({
            [param_types[0]]: { options: colors, default: colors[0].title, selected: colors[0].color_code },
            [param_types[1]]: { options: sizes, default: sizes[0], selected: sizes[0] },
            [param_types[2]]: { options: formats, default: formats[0], selected: formats[0] },
        });
        const [color_input_value, setColorInputValue] = useState(colors[0].color_code);
        const [size_input_value, setSizeInputValue] = useState(250);

        const onParamSelect = (value: string, param_type: string) => {
            if (param_type === 'color') {
                onColorSelect(value);
                setColorInputValue(value);
            } else if (param_type === 'size') {
                onSizeSelect(value);
                setSizeInputValue(typeof value === 'string' ? +value.split('x')[0] : value);
            } else if (param_type === 'format') onFormatSelect(value as FileExtension);
            if (
                (param_type === 'color' && colors.every(el => el.color_code !== value)) ||
                (param_type === 'size' && sizes.every(el => el !== value))
            )
                return;
            setParams({ ...params, [param_type]: { ...params[param_type], selected: value } });
        };
        return (
            <div className='qr-params-selector'>
                {Object.entries(params).map((param, i) => (
                    <div key={i} className={'param-picker'}>
                        <p>Please select {param[0]}:</p>
                        <div className='btn-block'>
                            {param[1].options.map((option, idx) => {
                                const color_color_code = (option as TColors[0]).color_code;
                                const color_title = (option as TColors[0]).title;
                                const input_value = color_color_code || `${option}`;

                                return (
                                    <div className='form_radio_btn' key={idx}>
                                        <label className={input_value === param[1].selected ? 'selected' : undefined}>
                                            <input
                                                type='radio'
                                                name={param[0]}
                                                value={input_value}
                                                onChange={e => {
                                                    onParamSelect(e.currentTarget.value, param[0]);
                                                }}
                                                defaultChecked={!!((color_title || option) === param[1].default)}
                                            />
                                            <div
                                                className={color_title && `color_btn_${color_title.replace(' ', '_')}`}
                                            >
                                                {color_title || option}
                                            </div>
                                        </label>
                                    </div>
                                );
                            })}
                            {['color', 'size'].map(el => {
                                const new_value = el === 'color' ? color_input_value : size_input_value;
                                const resulting_value =
                                    el === 'color' ? (new_value as string) : `${new_value}x${new_value}`;

                                return (
                                    param[0] === el && (
                                        <div className='form-container__color-input' key={el}>
                                            <input
                                                type={el === 'color' ? 'color' : 'number'}
                                                className={el === 'color' ? 'color' : 'size'}
                                                value={new_value}
                                                onChange={e =>
                                                    el === 'color'
                                                        ? setColorInputValue(e.currentTarget.value)
                                                        : setSizeInputValue(+e.currentTarget.value)
                                                }
                                                onBlur={() =>
                                                    new_value &&
                                                    param[1].selected !== resulting_value &&
                                                    onParamSelect(resulting_value, param[0])
                                                }
                                                onKeyPress={e =>
                                                    e.key === 'Enter' &&
                                                    new_value &&
                                                    param[1].selected !== resulting_value &&
                                                    onParamSelect(resulting_value, param[0])
                                                }
                                            />
                                        </div>
                                    )
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
