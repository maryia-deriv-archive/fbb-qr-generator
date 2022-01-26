import React, { useEffect, useState } from 'react';

interface Props {
    data?: string;
}

export const QRCodeGenerator: React.FC<Props> = ({ data }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState<Response>();
    const [hasError, setHasError] = useState<unknown>();

    const fetchQRCode = async () => {
        if (data) {
            setIsLoading(true);
            try {
                const response = await fetch(`https://${process.env.REACT_APP_API_HOST}/qr/custom?data=${data}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
                        'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
                    },
                });

                setResponseData(response);
                setIsLoading(false);
            } catch (error) {
                setHasError(error);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchQRCode();
    }, [data]);

    if (isLoading) return <p>loading</p>;

    if (hasError) return <button onClick={() => fetchQRCode()}> Try again </button>;

    if (responseData && !responseData?.ok) return <button onClick={() => fetchQRCode()}> Try again </button>;

    // Todo: It should display the QR Code image here.
    if (responseData && responseData?.ok) return <img src='placeholder.png' />;

    return <img src='placeholder.png' />;
};
