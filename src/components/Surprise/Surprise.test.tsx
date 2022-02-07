import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import { mocked } from 'jest-mock';
import { Surprise } from './Surprise';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLDivElement.prototype.animate = (() => {}) as (() => void) &
    ((
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions | undefined
    ) => Animation);

const setShouldShowSurprise = jest.fn();
const props = {
    should_show_surprise: true,
    setShouldShowSurprise: setShouldShowSurprise,
    startPosition: null,
    destination: null,
};

jest.mock('react', () => {
    return {
        ...jest.requireActual('react'),
        useRef: jest.fn(),
    };
});

const useMockRef = mocked(useRef);

describe('Surprise', () => {
    beforeEach(() => {
        const animate = jest.fn();
        const ref = { current: { animate } };
        Object.defineProperty(ref, 'current', {
            set(_current) {
                if (_current) {
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    jest.spyOn(_current, 'animate').mockReturnValueOnce(() => {});
                }
                this._current = _current;
            },
            get() {
                return this._current;
            },
        });
        useMockRef.mockReturnValueOnce(ref);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });

    test('Surprise is shown', () => {
        const { container } = render(<Surprise {...props} />);
        const surprise = container.firstChild;
        expect(surprise).toHaveClass('surprise');
        expect(surprise).toBeInTheDocument();
    });
    test('Surprise is hidden', () => {
        const { container } = render(<Surprise {...props} should_show_surprise={false} />);
        const surprise = container.firstChild;
        const audio = container.querySelector('audio');
        expect(surprise).not.toBeInTheDocument();
        expect(audio).not.toBeInTheDocument();
    });
});
