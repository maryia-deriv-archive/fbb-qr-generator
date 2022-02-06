import React, { useEffect } from 'react';
import './Surprise.scss';

type TSurpriseProps = {
    should_show_surprise: boolean;
    setShouldShowSurprise: (should_show_surprise: boolean) => void;
    startPosition: number[];
    destination: HTMLElement | null;
};

export const Surprise: React.FC<TSurpriseProps> = React.memo(
    ({ should_show_surprise, setShouldShowSurprise, startPosition, destination }: TSurpriseProps) => {
        const makeSurpriseRun = () => {
            const end = [
                (destination as HTMLElement)?.offsetTop + 70,
                (destination as HTMLElement)?.offsetLeft + 70,
            ];
            document.querySelector('.surprise')?.animate(
                [
                    { top: `${startPosition[0]}px`, left: `${startPosition[1]}px` },
                    { top: `${end[0]}px`, left: `${end[1]}px` },
                ],
                {
                    duration: 2000,
                    fill: 'both',
                    easing: 'linear',
                }
            );
        };

        useEffect(() => {
            let timeout_id: NodeJS.Timeout;
            if (should_show_surprise) {
                makeSurpriseRun();
                timeout_id = setTimeout(() => {
                    setShouldShowSurprise(false);
                }, 2000);
            }

            return () => {
                if (timeout_id) clearTimeout(timeout_id);
            };
        }, [should_show_surprise]);

        if (!should_show_surprise) return null;

        return (
            <>
                <div className='surprise'></div>
                <audio autoPlay src='/surprise-track.mp3'></audio>
            </>
        );
    }
);

Surprise.displayName = 'Surprise';
