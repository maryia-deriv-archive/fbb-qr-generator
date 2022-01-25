import React from 'react';
import { useFormik } from 'formik';
import './Form.scss';

type TFormValues = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    phoneNumber: string;
    faxNumber: string;
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

export const Form: React.FC<TFormProps> = ({ onDataSubmit }) => {
    const convertValuesToVCardString = (values: TFormValues) => {
        onDataSubmit(`BEGIN:VCARD
        VERSION:3.0
        N:${values.lastName};${values.firstName}
        FN:${values.firstName} ${values.lastName}
        ORG:${values.company}
        TITLE:${values.job}
        TEL;CELL:${values.mobileNumber};WORK:${values.phoneNumber};FAX:${values.faxNumber}
        EMAIL:${values.email}
        ADR:;;${values.street};${values.city};${values.state};${values.zip};${values.country}
        URL:${values.website}
        END:VCARD
        `);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            phoneNumber: '',
            faxNumber: '',
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
                {/* 1 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='firstName'>
                        Your Name:
                    </label>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-6'>
                                <input
                                    id='firstName'
                                    type='text'
                                    placeholder='First name'
                                    {...formik.getFieldProps('firstName')}
                                />
                            </div>
                            <div className='col-6'>
                                <input
                                    id='lastName'
                                    type='text'
                                    placeholder='Last name'
                                    {...formik.getFieldProps('lastName')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 2 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='mobileNumber'>
                        Contact:
                    </label>
                    <div className='col-9'>
                        <input
                            id='mobileNumber'
                            type='tel'
                            inputMode='tel'
                            placeholder='Mobile'
                            {...formik.getFieldProps('mobileNumber')}
                        />
                    </div>
                </div>
                {/* 3 */}
                <div className='form-group'>
                    <div className='col-10'>
                        <div className='row align-right'>
                            <div>
                                <input
                                    id='phoneNumber'
                                    type='tel'
                                    inputMode='tel'
                                    placeholder='Phone'
                                    {...formik.getFieldProps('phoneNumber')}
                                />
                            </div>
                            <div>
                                <input
                                    id='faxNumber'
                                    type='tel'
                                    inputMode='tel'
                                    placeholder='Fax'
                                    {...formik.getFieldProps('faxNumber')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 4 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='email'>
                        Email:
                    </label>
                    <div className='col-9'>
                        <input
                            id='email'
                            type='email'
                            inputMode='email'
                            placeholder='your@email.com'
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                </div>
                {/* 5 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='company'>
                        Company:
                    </label>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-6'>
                                <input
                                    id='company'
                                    type='text'
                                    placeholder='Company'
                                    {...formik.getFieldProps('company')}
                                />
                            </div>
                            <div className='col-6'>
                                <input id='job' type='text' placeholder='Your Job' {...formik.getFieldProps('job')} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 6 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='street'>
                        Street:
                    </label>
                    <div className='col-9'>
                        <input id='street' type='text' {...formik.getFieldProps('street')} />
                    </div>
                </div>
                {/* 7 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='city'>
                        City:
                    </label>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-5'>
                                <input id='city' type='text' {...formik.getFieldProps('city')} />
                            </div>
                            <div className='col-5'>
                                <input id='zip' type='text' placeholder='ZIP' {...formik.getFieldProps('zip')} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 8 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='state'>
                        State:
                    </label>
                    <div className='col-9'>
                        <input id='state' type='text' {...formik.getFieldProps('state')} />
                    </div>
                </div>
                {/* 9 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='country'>
                        Country:
                    </label>
                    <div className='col-9'>
                        <input id='country' type='text' {...formik.getFieldProps('country')} />
                    </div>
                </div>
                {/* 10 */}
                <div className='form-group'>
                    <label className='col-3' htmlFor='website'>
                        Website:
                    </label>
                    <div className='col-9'>
                        <input
                            id='website'
                            type='url'
                            inputMode='url'
                            placeholder='www.your-website.com'
                            {...formik.getFieldProps('website')}
                        />
                    </div>
                </div>
                <button type='submit'> Generate QR Code </button>
            </form>
        </div>
    );
};
