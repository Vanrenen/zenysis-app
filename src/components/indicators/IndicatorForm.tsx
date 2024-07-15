import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Indicator, IndicatorCategory } from '../../types/IndicatorTypes';
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface Props {
  onSubmit: (indicator: Indicator) => void;
  categories: IndicatorCategory[];
}

const validationSchema = yup.object({
  code: yup.string().matches(/^[A-Za-z0-9]+$/).max(20).required('Code is required'),
  name: yup.string().max(30).required('Name is required'),
  short_name: yup.string().max(15).required('Short name is required'),
  description: yup.string().max(300),
  calculation: yup.string().oneOf(['min', 'max', 'sum']).required('Calculation is required'),
  category: yup.string().required('Category is required'),
});

const IndicatorForm: React.FC<Props> = ({ onSubmit, categories }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      short_name: '',
      description: '',
      calculation: 'min',
      category: 'Economic',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Container sx={{paddingBottom: '25px'}}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <InputLabel>Code:</InputLabel>
          <Input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
          />
          {formik.errors.code && formik.touched.code && <div>{formik.errors.code}</div>}
        </Box>
        <Box>
          <InputLabel>Name:</InputLabel>
          <Input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && <div>{formik.errors.name}</div>}
        </Box>
        <Box>
          <InputLabel>Short Name:</InputLabel>
          <Input
            type="text"
            name="short_name"
            value={formik.values.short_name}
            onChange={formik.handleChange}
          />
          {formik.errors.short_name && formik.touched.short_name && <div>{formik.errors.short_name}</div>}
        </Box>
        <Box>
          <InputLabel>Description:</InputLabel>
          <Input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && <div>{formik.errors.description}</div>}
        </Box>
        <Box>
          <InputLabel>Calculation:</InputLabel>
          <Select
            name="calculation"
            value={formik.values.calculation}
            onChange={formik.handleChange}
            variant="outlined"
            sx={{width: '200px'}}
          >
            <MenuItem value="min">Min</MenuItem>
            <MenuItem value="max">Max</MenuItem>
            <MenuItem value="sum">Sum</MenuItem>
          </Select>
          {formik.errors.calculation && formik.touched.calculation && <div>{formik.errors.calculation}</div>}
        </Box>
        <Box>
          <InputLabel>Category:</InputLabel>
          <Select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            variant="outlined"
            sx={{width: '200px'}}
          >
            {categories.map((category) => (
              <MenuItem key={category.code} value={category.code}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {formik.errors.category && formik.touched.category && <div>{formik.errors.category}</div>}
        </Box>
        <Button variant={'outlined'} type="submit" sx={{marginTop: '25px'}}>Submit</Button>
      </form>
    </Container>
  );
};

export default IndicatorForm;
