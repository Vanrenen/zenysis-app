import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DimensionForm from './DimensionForm';

test('renders DimensionForm and validates inputs', () => {
  const handleSubmit = jest.fn();
  const categories = [
    {name:'Finance', code: 'Finance'},
    {name: 'Health', code: 'Health'},
    {name: 'Education', code: 'Education'}
  ];

  const { getByLabelText, getByText } = render(
    <DimensionForm onSubmit={handleSubmit} categories={categories} />
  );

  const codeInput = getByLabelText(/Code:/i);
  const nameInput = getByLabelText(/Name:/i);
  const categorySelect = getByLabelText(/Category:/i);

  fireEvent.change(codeInput, { target: { value: 'DIM01' } });
  fireEvent.change(nameInput, { target: { value: 'Dimension 1' } });
  fireEvent.change(categorySelect, { target: { value: 'Geography' } });

  fireEvent.submit(getByText(/Submit/i));

  expect(handleSubmit).toHaveBeenCalledWith({
    code: 'DIM01',
    name: 'Dimension 1',
    description: '',
    category: 'Geography',
  });
});

test('shows validation errors for invalid inputs', () => {
  const handleSubmit = jest.fn();
  const categories = [
    {name:'Finance', code: 'Finance'},
    {name: 'Health', code: 'Health'},
    {name: 'Education', code: 'Education'}
  ];

  const { getByText, getByRole } = render(
    <DimensionForm onSubmit={handleSubmit} categories={categories} />
  );

  fireEvent.submit(getByText(/Submit/i));

  expect(getByRole('alert')).toBeInTheDocument();
  expect(handleSubmit).not.toHaveBeenCalled();
});
