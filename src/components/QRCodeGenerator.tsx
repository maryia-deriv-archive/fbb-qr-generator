import React, { useEffect, useState } from 'react';

interface Props {
    data: string;
}

export const QRCodeGenerator: React.FC<Props> = ({ data }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState<Response>();
    const [hasError, setHasError] = useState<unknown>();

    const fetchQRCode = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://${process.env.API_HOST}/qr/custom?data=${data}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': `${process.env.API_HOST}`,
                    'x-rapidapi-key': `${process.env.API_KEY}`,
                },
            });

            setResponseData(response);
            setIsLoading(false);
        } catch (error) {
            setHasError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQRCode();
    }, []);

    if (isLoading) return <p>loading</p>;

    if (hasError) return <button onClick={() => fetchQRCode()}> Try again </button>;

    if (!responseData?.ok) return <button onClick={() => fetchQRCode()}> Try again x</button>;

    // Todo: It should display the QR Code image here.
    return <p>{responseData?.status}</p>;
};
