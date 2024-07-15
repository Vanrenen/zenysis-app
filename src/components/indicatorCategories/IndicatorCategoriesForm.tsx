import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IndicatorCategory } from '../../types/IndicatorTypes';
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
} from '@mui/material';

interface Props {
  onSubmit: (IndicatorCategory: IndicatorCategory) => void;
}

const validationSchema = yup.object({
  code: yup.string().matches(/^[A-Za-z0-9]+$/).max(20).required('Code is required'),
  name: yup.string().max(30).required('Name is required'),
});

const IndicatorCategoriesForm: React.FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
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
        <Button variant={'outlined'} type="submit" sx={{marginTop: '25px'}}>Submit</Button>
      </form>
    </Container>
  );
};

export default IndicatorCategoriesForm;
