import React from 'react';
import './MetallicTitle.scss';

type TMetallicTitleProps = {
    children?: React.ReactNode;
    className?: string;
};

// it's a beautifully styled wrapper that takes a title from children and displays it on a plate with screws (designed by pavel-latyshou-deriv):
export const MetallicTitle: React.FC<TMetallicTitleProps> = React.memo(({ children, className }: TMetallicTitleProps) => {
    return (
        <>
            <div className={className ? className : 'screw_left'}>
                <div className='dot_left'>
                    <div className='dot_minus'></div>
                    <div className='dot_plus'></div>
                </div>
                <div className='dot_left'>
                    <div className='dot_minus'></div>
                    <div className='dot_plus'></div>
                </div>
            </div>
            {children}
            <div className={className ? className : 'screw_left'}>
                <div className='dot_left'>
                    <div className='dot_minus'></div>
                    <div className='dot_plus'></div>
                </div>
                <div className='dot_left'>
                    <div className='dot_minus'></div>
                    <div className='dot_plus'></div>
                </div>
            </div>
        </>
    );
});

MetallicTitle.displayName = 'MetallicTitle';
