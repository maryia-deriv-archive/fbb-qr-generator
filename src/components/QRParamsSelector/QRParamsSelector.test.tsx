import { render, screen } from '@testing-library/react';
import React from 'react';
import { QRParamsSelector } from './QRParamsSelector';

const onColorSelect = jest.fn();
const onSizeSelect = jest.fn();
const onFormatSelect = jest.fn();

const props = {
    onColorSelect: onColorSelect,
    onSizeSelect: onSizeSelect,
    onFormatSelect: onFormatSelect,
};

describe('QRParamsSelector', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    test('QRParamsSelector is rendered with 3 pickers', () => {
        const { container } = render(<QRParamsSelector {...props} />);
        const wrapper = container.querySelector('.qr-params-selector');
        const pickers = screen.getAllByText(/Please select/i);
        expect(wrapper).toBeInTheDocument();
        expect(pickers.length).toEqual(3);
    });
    test('QRParamsSelector is rendered with color picker', () => {
        const { container } = render(<QRParamsSelector {...props} />);
        const wrapper = container.querySelector('.qr-params-selector');
        const param_picker = container.querySelector('.param-picker');
        const color_picker = screen.getByText('Please select color:');
        const black_color = screen.getByText(/black/i);
        expect(wrapper).toBeInTheDocument();
        expect(param_picker).toBeInTheDocument();
        expect(color_picker).toBeInTheDocument();
        expect(black_color).toBeInTheDocument();
    });
    test('QRParamsSelector is rendered with size picker', () => {
        const { container } = render(<QRParamsSelector {...props} />);
        const wrapper = container.querySelector('.qr-params-selector');
        const param_picker = container.querySelector('.param-picker');
        const size_picker = screen.getByText('Please select size:');
        const _600x600_size = screen.getByText(/600x600/i);
        expect(wrapper).toBeInTheDocument();
        expect(param_picker).toBeInTheDocument();
        expect(size_picker).toBeInTheDocument();
        expect(_600x600_size).toBeInTheDocument();
    });
    test('QRParamsSelector is rendered with format picker', () => {
        const { container } = render(<QRParamsSelector {...props} />);
        const wrapper = container.querySelector('.qr-params-selector');
        const param_picker = container.querySelector('.param-picker');
        const format_picker = screen.getByText('Please select format:');
        const png_format = screen.getByText(/png/i);
        expect(wrapper).toBeInTheDocument();
        expect(param_picker).toBeInTheDocument();
        expect(format_picker).toBeInTheDocument();
        expect(png_format).toBeInTheDocument();
    });
});
