import React from 'react';
import './MetallicTitle.scss';

export const MetallicTitle: React.FC<{className?: string}> = ({ children, className }) => {
    return (
        <>
            {/* beautifully styled title on a plate with screws: */}
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
