import React from "react";
import Modal from '../common/Modal';
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

interface EditIndicatorCategoryModalInterface {
  isModalOpen: boolean;
  closeModal: () => void;
  handleEdit: (category: IndicatorCategory) => void;
  category: IndicatorCategory | undefined;
}

const validationSchema = yup.object({
  code: yup.string().matches(/^[A-Za-z0-9]+$/).max(20).required('Code is required'),
  name: yup.string().max(30).required('Name is required'),
});

const EditIndicatorCategoryModal: React.FC<EditIndicatorCategoryModalInterface> = ({isModalOpen, closeModal, handleEdit, category}) => {
  const formik = useFormik({
    initialValues: {
      code: category?.code || '',
      name: category?.name || '',
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
  <h2>{'CATEGORIES'}</h2>
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
        <Button variant={'contained'} onClick={closeModal} sx={{marginTop: '25px', float: 'eft'}}>Cancel</Button>
        <Button variant={'contained'} type="submit" sx={{marginTop: '25px', float: 'right'}}>Submit</Button>
      </form>
    </Container>
</Modal>
 )
}

export default EditIndicatorCategoryModal;