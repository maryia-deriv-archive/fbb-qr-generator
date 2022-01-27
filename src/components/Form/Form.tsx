import React from 'react';
import { useFormik } from 'formik';
import './Form.scss';

type TFormRowsData = {
    first_field_name: string;
    second_field_name?: string;
    label_text?: string;
    first_field_placeholder?: string;
    second_field_placeholder?: string;
    input_type?: string;
}[];

type TFormValues = {
    first_name: string;
    last_name: string;
    mobile_number: string;
    phone_number: string;
    fax_number: string;
    email: string;
    company: string;
    job: string;
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    website: string;
};

type TFormProps = {
    onDataSubmit: (v_card_string: string) => void;
};

const form_rows: TFormRowsData = [
    {
        first_field_name: 'first_name',
        second_field_name: 'last_name',
        label_text: 'Your Name:',
        first_field_placeholder: 'First name',
        second_field_placeholder: 'Last name',
    },
    {
        first_field_name: 'mobile_number',
        label_text: 'Contact:',
        first_field_placeholder: 'Mobile',
        input_type: 'tel',
    },
    {
        first_field_name: 'phone_number',
        second_field_name: 'fax_number',
        first_field_placeholder: 'Phone',
        second_field_placeholder: 'Fax',
        input_type: 'tel',
    },
    {
        first_field_name: 'email',
        label_text: 'Email:',
        first_field_placeholder: 'your@email.com',
        input_type: 'email',
    },
    {
        first_field_name: 'company',
        second_field_name: 'job',
        label_text: 'Company:',
        first_field_placeholder: 'Company',
        second_field_placeholder: 'Your Job',
    },
    {
        first_field_name: 'street',
        label_text: 'Street:',
    },
    {
        first_field_name: 'city',
        second_field_name: 'zip',
        label_text: 'City:',
        second_field_placeholder: 'ZIP',
    },
    {
        first_field_name: 'state',
        label_text: 'State:',
    },
    {
        first_field_name: 'country',
        label_text: 'Country:',
    },
    {
        first_field_name: 'website',
        label_text: 'Website:',
        first_field_placeholder: 'www.your-website.com',
        input_type: 'url',
    },
];

export const Form: React.FC<TFormProps> = ({ onDataSubmit }) => {
    const convertValuesToVCardString = (values: TFormValues) => {
        const trimmed_values = Object.entries(values)
            .map(entry => [entry[0], entry[1].trim()])
            .reduce((acc, el) => ({ ...acc, [el[0]]: el[1] }), {} as { [key: string]: string });

        const encoded_string = encodeURIComponent('BEGIN:VCARD\nVERSION:2.1\n' +
            `N:${trimmed_values.last_name};${trimmed_values.first_name}\n` +
            `FN:${trimmed_values.first_name} ${trimmed_values.last_name}\n` +
            `ORG:${trimmed_values.company}\nTITLE:${trimmed_values.job}\n` +
            `TEL;CELL:${trimmed_values.mobile_number}` +
            `${trimmed_values.phone_number ? `;WORK:${trimmed_values.phone_number}` : ''}` +
            `${trimmed_values.fax_number ? `;FAX:${trimmed_values.fax_number}` : ''}\n` +
            `EMAIL:${trimmed_values.email}\n` +
            `ADR:;;${trimmed_values.street};${trimmed_values.city};${trimmed_values.state};` +
            `${trimmed_values.zip};${trimmed_values.country}\nURL:${trimmed_values.website}\nEND:VCARD`);
        onDataSubmit(encoded_string);
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            mobile_number: '',
            phone_number: '',
            fax_number: '',
            email: '',
            company: '',
            job: '',
            street: '',
            city: '',
            zip: '',
            state: '',
            country: '',
            website: '',
        },
        onSubmit: values => {
            convertValuesToVCardString(values);
        },
    });

    return (
        <div className='form-container'>
            <h1>
                <p>VCARD QR Code</p>
            </h1>
            <form onSubmit={formik.handleSubmit}>
                {form_rows.map(
                    (
                        {
                            first_field_name,
                            second_field_name,
                            label_text,
                            first_field_placeholder,
                            second_field_placeholder,
                            input_type,
                        },
                        i
                    ) => {
                        const field_type = input_type ? input_type : 'text';
                        const input_mode_type = input_type
                            ? (input_type as keyof React.HTMLAttributes<HTMLInputElement>['inputMode'])
                            : 'text';
                        const first_placeholder = first_field_placeholder ? first_field_placeholder : '';
                        const second_placeholder = second_field_placeholder ? second_field_placeholder : '';

                        return (
                            <div key={i} className='form-group'>
                                {label_text ? (
                                    <label className='col-3' htmlFor={first_field_name}>
                                        {label_text}
                                    </label>
                                ) : null}
                                <div className={'col-9'}>
                                    {second_field_name ? (
                                        <div
                                            className={`row${first_field_name === 'phone_number' ? ' align-right' : ''
                                                }`}
                                        >
                                            <div
                                                className={`col-${first_field_name === 'phone_number' ? '' : '6'}`}
                                            >
                                                <input
                                                    id={first_field_name}
                                                    type={field_type}
                                                    inputMode={input_mode_type}
                                                    placeholder={first_placeholder}
                                                    {...formik.getFieldProps(first_field_name)}
                                                />
                                            </div>
                                            <div
                                                className={`col-${first_field_name === 'phone_number' ? '' : '6'}`}
                                            >
                                                <input
                                                    id={second_field_name}
                                                    type={field_type}
                                                    inputMode={input_mode_type}
                                                    placeholder={second_placeholder}
                                                    {...formik.getFieldProps(second_field_name)}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            id={first_field_name}
                                            type={field_type}
                                            inputMode={input_mode_type}
                                            placeholder={first_placeholder}
                                            {...formik.getFieldProps(first_field_name)}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    }
                )}

                <button type='submit'> Generate QR Code </button>
            </form>
        </div>
    );
};
