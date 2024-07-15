import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IndicatorForm from './IndicatorForm';

test('renders IndicatorForm and validates inputs', () => {
  const handleSubmit = jest.fn();
  const categories = [
    {name:'Finance', code: 'Finance'},
    {name: 'Health', code: 'Health'},
    {name: 'Education', code: 'Education'}
  ];

  const { getByLabelText, getByText } = render(
    <IndicatorForm onSubmit={handleSubmit} categories={categories} />
  );

  const codeInput = getByLabelText(/Code:/i);
  const nameInput = getByLabelText(/Name:/i);
  const shortNameInput = getByLabelText(/Short Name:/i);
  const calculationSelect = getByLabelText(/Calculation:/i);
  const categorySelect = getByLabelText(/Category:/i);

  fireEvent.change(codeInput, { target: { value: 'IND01' } });
  fireEvent.change(nameInput, { target: { value: 'Indicator 1' } });
  fireEvent.change(shortNameInput, { target: { value: 'Ind1' } });
  fireEvent.change(calculationSelect, { target: { value: 'min' } });
  fireEvent.change(categorySelect, { target: { value: 'Finance' } });

  fireEvent.submit(getByText(/Submit/i));

  expect(handleSubmit).toHaveBeenCalledWith({
    code: 'IND01',
    name: 'Indicator 1',
    short_Name: 'Ind1',
    description: '',
    calculation: 'min',
    category: 'Finance',
  });
});

test('shows validation errors for invalid inputs', () => {
  const handleSubmit = jest.fn();
  const categories = [
    {name:'Finance', code: 'Finance'},
    {name: 'Health', code: 'Health'},
    {name: 'Education', code: 'Education'}
  ];

  const { getByLabelText, getByText, getByRole } = render(
    <IndicatorForm onSubmit={handleSubmit} categories={categories} />
  );

  fireEvent.submit(getByText(/Submit/i));

  expect(getByRole('alert')).toBeInTheDocument();
  expect(handleSubmit).not.toHaveBeenCalled();
});
