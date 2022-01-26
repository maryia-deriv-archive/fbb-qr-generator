import React, { useEffect, useState } from 'react';

interface Props {
    firstName: string;
    lastName: string;
    email: string;
}

export const QRCodeGenerator: React.FC<Props> = ({ firstName, lastName, email }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Response>();
    const [hasError, setHasError] = useState<unknown>();

    const generateQRCode = async (data: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://qrcode-monkey.p.rapidapi.com/qr/custom?data=${data}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
                    'x-rapidapi-key': `${process.env.API_KEY}`,
                },
            });

            setData(response);
            setIsLoading(false);
        } catch (error) {
            setHasError(error);
            setIsLoading(false);
        }
    };

    const fetchQRCode = () => generateQRCode(`${firstName}\n${lastName}\n${email}`);

    useEffect(() => {
        fetchQRCode();
    }, []);

    if (isLoading) return <p>loading</p>;

    if (hasError) return <button onClick={() => fetchQRCode()}> Try again </button>;

    if (!data?.ok) return <button onClick={() => fetchQRCode()}> Try again x</button>;

    // Todo: It should display the QR Code image here.
    return <p>{data?.status}</p>;
};
