import { createClient } from 'contentful';

type TFormRowsData = {
    first_field_name: string;
    second_field_name?: string;
    label_text?: string;
    first_field_placeholder?: string;
    second_field_placeholder?: string;
    input_type?: string;
}[];

export type TCompanyAddresses = {
    [key: string]: {
        option_name: string;
        autofill_values: {
            street: string;
            city: string;
            zip: string;
            state: string;
            country: string;
        };
        is_default?: boolean;
    };
};

export const form_rows: TFormRowsData = [
    {
        first_field_name: 'first_name',
        second_field_name: 'last_name',
        label_text: 'Name:',
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

export const addresses: TCompanyAddresses = {
    hong_kong: {
        option_name: 'Hong Kong office address',
        autofill_values: {
            street: 'Unit 408a, 4/F, Empire Centre, 68 Mody Road, East Tsim Sha Tsui, Kowloon',
            city: 'Hong Kong',
            zip: '',
            state: '',
            country: 'Hong Kong SAR, China',
        },
    },
    paris: {
        option_name: 'Paris office address',
        autofill_values: {
            street: "17 Rue d'Antin",
            city: 'Paris',
            zip: '75002',
            state: '',
            country: 'France',
        },
    },
    malta: {
        option_name: 'Malta office address',
        autofill_values: {
            street: 'Level 3, W Business Centre, Triq Dun Karm',
            city: 'Birkirkara',
            zip: 'BKR 9033',
            state: '',
            country: 'Malta',
        },
    },
    cyprus: {
        option_name: 'Cyprus office address',
        autofill_values: {
            street: '181, Leoforos Archiepiskopou Makariou III Avenue 15 Business Centre, 1st Floor',
            city: 'Limassol',
            zip: '3030',
            state: '',
            country: 'Cyprus',
        },
    },
    guernsey: {
        option_name: 'Guernsey office address',
        autofill_values: {
            street: 'Suite 5, One Cornet Street',
            city: 'St Peter Port',
            zip: 'GY1 1 BZ',
            state: '',
            country: 'Guernsey',
        },
    },
    cyberjaya: {
        is_default: true,
        option_name: 'Cyberjaya office address',
        autofill_values: {
            street: 'Deriv HQ, 3500, Jalan Teknokrat 3',
            city: 'Cyberjaya',
            zip: '63000',
            state: 'Selangor',
            country: 'Malaysia',
        },
    },
    ipoh: {
        option_name: 'Ipoh office address',
        autofill_values: {
            street: 'E-5-6, Soho Ipoh 2, Jalan Sultan Idris Shah',
            city: 'Ipoh',
            zip: '30000',
            state: 'Perak',
            country: 'Malaysia',
        },
    },
    labuan: {
        option_name: 'Labuan office address',
        autofill_values: {
            street: 'F16, Level 1, Paragon Labuan, Jalan Tun Mustapha',
            city: 'Labuan',
            zip: '87000',
            state: 'Sabah',
            country: 'Malaysia',
        },
    },
    melaka: {
        option_name: 'Melaka office address',
        autofill_values: {
            street: '67-1 & 69-1, Jalan KLJ 6, Taman Kota Laksamana Jaya',
            city: 'Melaka',
            zip: '75200',
            state: '',
            country: 'Malaysia',
        },
    },
    singapore: {
        option_name: 'Singapore office address',
        autofill_values: {
            street: '80 Robinson Road, #11-03',
            city: 'Singapore',
            zip: '068898',
            state: '',
            country: 'Singapore',
        },
    },
    dubai: {
        option_name: 'Dubai office address',
        autofill_values: {
            street: 'Office 1902, Jumeirah Business Center 1, JLT Cluster G',
            city: 'Dubai',
            zip: '',
            state: '',
            country: 'the United Arab Emirates',
        },
    },
    jordan: {
        option_name: 'Jordan office address',
        autofill_values: {
            street: 'AJIB Building, No 12A & 12B, 3rd Floor, Al Bonouk Street, Al Abdali Boulevard',
            city: 'Amman',
            zip: '',
            state: '',
            country: 'Jordan',
        },
    },
    belarus: {
        option_name: 'Belarus office address',
        autofill_values: {
            street: 'Level 2, 25/1-3 Vera Khoruzhey Street',
            city: 'Minsk',
            zip: '220123',
            state: '',
            country: 'Belarus',
        },
    },
    rwanda: {
        option_name: 'Rwanda office address',
        autofill_values: {
            street: 'Level 2 East Wing, Kigali Heights, KG7 Avenue',
            city: 'Kigali',
            zip: '',
            state: '',
            country: 'Rwanda',
        },
    },
    asuncion: {
        option_name: 'Asunción office address',
        autofill_values: {
            street: 'Edificio Atrium, Piso 2, Guido Spano Esq. Doctor Morra',
            city: 'Asunción',
            zip: '1849',
            state: '',
            country: 'Paraguay',
        },
    },
    ciudad_del_este: {
        option_name: 'Ciudad del Este office address',
        autofill_values: {
            street: 'World Trade Center Ciudad del Este',
            city: 'Ciudad del Este',
            zip: '',
            state: '',
            country: 'Paraguay',
        },
    },
    cayman: {
        option_name: 'Cayman Islands office address',
        autofill_values: {
            street: 'Cayman Enterprise City, Strathvale House, 2nd Floor, 90N Church St',
            city: 'George Town',
            zip: '',
            state: '',
            country: 'Cayman Islands',
        },
    },
    vanuatu: {
        option_name: 'Vanuatu office address',
        autofill_values: {
            street: 'Yumiwork, Lolam building, Kumul Highway, Land # 11/OD22/021',
            city: 'Port Vila',
            zip: '',
            state: '',
            country: 'Vanuatu',
        },
    },
    london: {
        option_name: 'london office address',
        autofill_values: {
            street: 'First floor, 68-72 leonard Street',
            city: 'London',
            zip: 'EC2A 4QX',
            state: '',
            country: 'United Kingdom',
        },
    },
    reading: {
        option_name: 'Reading office address',
        autofill_values: {
            street: 'Suite 1, Ground Floor, Block D, Apex, Forbury Road',
            city: 'Reading',
            zip: 'RG1 1AX',
            state: '',
            country: 'United Kingdom',
        },
    },
}

export const getCompanyAddresses = async (): Promise<TCompanyAddresses> => {
    const accessToken = process.env.REACT_APP_API_KEY as string;
    const environment = process.env.REACT_APP_ENV_ALIAS;
    const space = process.env.REACT_APP_SPACE_ID as string;

    const client = createClient({
        accessToken,
        environment,
        space,
    });

    const getDefaultAddresses = (error: Error | string): TCompanyAddresses => {
        // eslint-disable-next-line no-console
        console.error('Error retrieving addresses from API: "', error, '". Using default addresses instead.');
        return addresses;
    };

    if (client) {
        try {
            const response = await client.getEntries();
            const company_addresses = response.items.find(i => i.fields.addresses)?.fields
                .addresses as TCompanyAddresses;
            if (company_addresses) {
                const updated_company = {
                    ...company_addresses, ...{
                        london: {
                            option_name: 'london office address',
                            autofill_values: {
                                street: 'First floor, 68-72 leonard Street',
                                city: 'London',
                                zip: 'EC2A 4QX',
                                state: '',
                                country: 'United Kingdom',
                            },
                        },
                        reading: {
                            option_name: 'Reading office address',
                            autofill_values: {
                                street: 'Suite 1, Ground Floor, Block D, Apex, Forbury Road',
                                city: 'Reading',
                                zip: 'RG1 1AX',
                                state: '',
                                country: 'United Kingdom',
                            },
                        },
                    }
                }
                return updated_company;
            }
            return getDefaultAddresses('No addresses found in API response');
        } catch (error) {
            return getDefaultAddresses(error as Error);
        }
    }
    return getDefaultAddresses('Failed to create API client.');
};
