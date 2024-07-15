import React from "react";
import Modal from '../common/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Dimension, DimensionCategory } from "../../types/DimensiontTypes";

interface EditDimensionModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleEdit: (indicator: Dimension | undefined) => void;
  dimension: Dimension | undefined;
  categories: DimensionCategory[];
}

const validationSchema = yup.object({
  code: yup.string().matches(/^[A-Za-z0-9]+$/).max(20).required('Code is required'),
  name: yup.string().max(30).required('Name is required'),
  description: yup.string().max(300),
  category: yup.string().required('Category is required'),
});

const EditDimensionModal: React.FC<EditDimensionModalProps> = ({isModalOpen, closeModal, handleEdit, dimension, categories}) => {
  const formik = useFormik({
    initialValues: {
      code: dimension?.code || '',
      name: dimension?.name || '',
      description: dimension?.description || '',
      category: dimension?.category || '',
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
    <h2>{'Edit Dimension'}</h2>
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
      </form>
    </Container>
  <Button variant={'contained'} onClick={closeModal} sx={{float: 'left'}}>Cancel</Button>
  <Button variant={'contained'} type="submit" sx={{float: 'right'}}>Submit</Button>
</Modal>
 )
}

export default EditDimensionModal;