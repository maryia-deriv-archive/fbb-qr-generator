import { MetallicTitle } from 'components/MetallicTitle/MetallicTitle';
import { useFormik } from 'formik';
import React from 'react';
import './Form.scss';
import { form_rows, getCompanyAddresses, TCompanyAddresses } from './constants';

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
    button_ref: React.RefObject<HTMLButtonElement>;
};

export const Form: React.FC<TFormProps> = React.memo(({ onDataSubmit, button_ref }: TFormProps) => {
    const [company_addresses, setCompanyAddresses] = React.useState<TCompanyAddresses>({});
    const [selected_address, setSelectedAddress] = React.useState('cyberjaya');

    React.useEffect(() => {
        getCompanyAddresses().then(response => {
            if (response) {
                setCompanyAddresses(response);
                setSelectedAddress(
                    Object.entries(company_addresses).find(([, value]) => value.is_default)?.[0] ?? 'cyberjaya'
                );
            }
        });
    }, []);

    const convertValuesToVCardString = (values: TFormValues) => {
        const trimmed_values = Object.entries(values)
            .map(entry => [entry[0], entry[1].trim()])
            .reduce((acc, el) => ({ ...acc, [el[0]]: el[1] }), {} as { [key: string]: string });

        const encoded_string =
            'BEGIN:VCARD\nVERSION:2.1\n' +
            `N:${trimmed_values.last_name};${trimmed_values.first_name}\n` +
            `FN:${trimmed_values.first_name} ${trimmed_values.last_name}\n` +
            `ORG:${trimmed_values.company}\nTITLE:${trimmed_values.job}\n` +
            `TEL;CELL:${trimmed_values.mobile_number}\n` +
            `${trimmed_values.phone_number ? `TEL;WORK:${trimmed_values.phone_number}` : ''}\n` +
            `${trimmed_values.fax_number ? `TEL;FAX:${trimmed_values.fax_number}` : ''}\n` +
            `EMAIL:${trimmed_values.email}\n` +
            `ADR:;;${trimmed_values.street};${trimmed_values.city};${trimmed_values.state};` +
            `${trimmed_values.zip};${trimmed_values.country}\nURL:${trimmed_values.website}\nEND:VCARD`;
        onDataSubmit(encoded_string);
    };

    const initial_address_values = company_addresses?.[selected_address]?.autofill_values ?? ({} as TFormValues);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            mobile_number: '',
            phone_number: '',
            fax_number: '',
            email: '',
            company: 'Deriv',
            job: '',
            street: initial_address_values.street ?? '',
            city: initial_address_values.city ?? '',
            zip: initial_address_values.zip ?? '',
            state: initial_address_values.state ?? '',
            country: initial_address_values.country ?? '',
            website: 'https://deriv.com/',
        },
        validate: values => {
            if (values.website && !/^(www\.|http:\/\/|https:\/\/).+\..{2,}$/i.test(values.website)) {
                return {
                    website: 'Invalid URL.',
                };
            }
        },
        onSubmit: values => {
            convertValuesToVCardString(values);
        },
    });

    const onAddressAutofill: React.ChangeEventHandler<HTMLSelectElement> = e => {
        const new_selected_address = e.currentTarget.value;
        setSelectedAddress(new_selected_address);
        const autofill_values = company_addresses?.[new_selected_address].autofill_values ?? {};
        Object.entries(autofill_values).forEach(([key, value]) => {
            formik.setFieldValue(key, value);
        });
    };
    if (!Object.keys(company_addresses).length) return null;
    return (
        <div className='form-container'>
            <h1>
                <div className='form_title'>
                    <MetallicTitle className='screw-left__form'>VCARD QR Code</MetallicTitle>
                </div>
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
                        const field_type = input_type && input_type !== 'url' ? input_type : 'text';
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
                                ) : (
                                    <div className='col-42'> </div>
                                )}
                                <div className={'col-9'}>
                                    {second_field_name ? (
                                        <div className={'row'}>
                                            <div className={'col-6'}>
                                                <input
                                                    id={first_field_name}
                                                    type={field_type}
                                                    inputMode={input_mode_type}
                                                    placeholder={first_placeholder}
                                                    {...formik.getFieldProps(first_field_name)}
                                                />
                                            </div>
                                            <div className={'col-6'}>
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
                                        <div>
                                            <input
                                                id={first_field_name}
                                                type={field_type}
                                                inputMode={input_mode_type}
                                                placeholder={first_placeholder}
                                                {...formik.getFieldProps(first_field_name)}
                                            />
                                            {input_type === 'url' && formik.touched.website && formik.errors.website ? (
                                                <div className={'error-message'}>{formik.errors.website}</div>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                )}
                <div>
                    <label className='col-3' htmlFor='autofill'>
                        Autofill Your Office Address:
                    </label>
                    <select className='col-6' id='autofill' value={selected_address} onChange={onAddressAutofill}>
                        {Object.entries(company_addresses)
                            .sort(([key_1], [key_2]) => key_1.localeCompare(key_2))
                            .map(([key, value]) => {
                                return (
                                    <option key={key} value={key}>
                                        {value.option_name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <button className='generate' type='submit' ref={button_ref}>
                    Generate QR Code
                </button>
            </form>
        </div>
    );
});

Form.displayName = 'Form';
