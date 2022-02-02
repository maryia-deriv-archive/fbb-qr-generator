import React from 'react';
import './MetallicTitle.scss';

// it's a beautifully styled wrapper that takes a title from children and displays it on a plate with screws (designed by pavel-latyshou-deriv):
export const MetallicTitle: React.FC<{ className?: string }> = ({ children, className }) => {
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
};
