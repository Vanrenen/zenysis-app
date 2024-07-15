import React, { useEffect, useState } from "react";
import Modal from '../common/Modal';
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
  MenuItem
} from '@mui/material';

interface EditIndicatorModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleEdit: (indicator: Indicator | undefined) => void;
  indicator: Indicator | undefined;
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

const EditIndicatorModal: React.FC<EditIndicatorModalProps> = ({isModalOpen, closeModal, handleEdit, indicator, categories}) => {
  const formik = useFormik({
    initialValues: {
      code: indicator?.code || '',
      name: indicator?.name || '',
      short_name: indicator?.short_name || '',
      description: indicator?.description || '',
      calculation: indicator?.calculation || '',
      category: indicator?.category || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleEdit(values);
      closeModal();
    },
    enableReinitialize: true
  });

 return (
  <Modal isOpen={isModalOpen} onClose={closeModal}>
  <h2>{'I edit stuff'}</h2>
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
            fullWidth
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
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category.code} value={category.code}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {formik.errors.category && formik.touched.category && <div>{formik.errors.category}</div>}
        </Box>
      </form>
    </Container>
  <Button variant={'contained'} onClick={closeModal} sx={{float: 'left'}}>Cancel</Button>
  <Button variant={'contained'} type="submit" sx={{float: 'right'}}>Edit</Button>
</Modal>
 )
}

export default EditIndicatorModal;