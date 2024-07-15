import React from 'react';
import DimensionForm from '../components/dimensions/DimensionForm';
import { Container } from '@mui/material';
import {
  fetchDimensions,
  createDimension,
  deleteDimension,
  updateDimension,
  createDimensionCategory,
  deleteDimensionCategory,
  updateDimensionCategory,
  fetchDimensionCategories,
} from '../services/api';
import { Dimension, DimensionCategory } from '../types/DimensiontTypes';
import DeleteForm from '../components/common/DeleteForm';
import ListComponent from '../components/common/ListComponent';
import DimensionCategoriesForm from '../components/dimensionCategories/DimensionCategoriesForm';
import EditDimensionCategoryModal from '../components/dimensionCategories/EditDimensionCategoryModal';
import EditDimensionModal from '../components/dimensions/EditDimensionModal';
import HorizontalDivider from '../components/common/ HorizontalDivider';

const DimensionsPage: React.FC = () => {
  const [dimensions, setDimensions] = React.useState<Dimension[] | []>([]);
  const [dimension, setDimension] = React.useState<Dimension>();
  const [categories, setCategories] = React.useState<DimensionCategory[] | []>([]);
  const [category, setCategory] = React.useState<DimensionCategory>();
  const [isDimensionModalOpen, setIsDimensionModalOpen] = React.useState(false);
  const [isDimensionCategoryModalOpen, setIsDimensionCategoryModalOpen] = React.useState(false);

  React.useEffect(() => {
    const loadDimensions = async () => {
      const data = await fetchDimensions();
      setDimensions(data);
    };
    loadDimensions();
  }, []);

  React.useEffect(() => {
    const loadDimensionCategories = async () => {
      const data = await fetchDimensionCategories();
      setCategories(data);
    };
    loadDimensionCategories();
  }, []);

  const handleDimensionCreate = async (dimension: Dimension) => {
    const newDimension = await createDimension(dimension);
    setDimensions([...dimensions, newDimension]);
  };

  const handleDimensionDelete = async (code: string) => {
    await deleteDimension(code);
    setDimensions(dimensions.filter((dimension) => dimension.code !== code));
  };

  const handleDimensionEdit = async (dimension: Dimension | undefined) => {
    if (!dimension) {
      return;
    }
    await updateDimension(dimension.code, dimension);
  }

  const handleDimensionCategoryCreate = async (category: DimensionCategory) => {
    const newCategory = await createDimensionCategory(category);
    setCategories([...categories, newCategory]);
  }

  const handleDimensionCategoriesDelete =  async (code: string) => {
    await deleteDimensionCategory(code);
    setCategories(categories.filter(category => category.code !== code));
  }

  const handleDimensionCategoryEdit = async (category: DimensionCategory) => {
    await updateDimensionCategory(category.code, category);
  }

  const openDimensionModal = (code: string) => {
    setDimension(dimensions.filter(dimension => dimension.code !== code)[0])
    setIsDimensionModalOpen(true);
  };

  const closeDimensionModal = () => {
    setIsDimensionModalOpen(false);
  };

  const openDimensionCategoryModal = (code: string) => {
    setCategory(categories.filter(category => category.code === code)[0])
    setIsDimensionCategoryModalOpen(true);
  }

  const closeDimensionCategoryModal = () => {
    setIsDimensionCategoryModalOpen(false);
  };

  return (
    <Container sx={{paddingBottom: '50px'}}>

      <h1>Dimensions</h1>
      <h3>Create Dimension</h3>
      <DimensionForm onSubmit={handleDimensionCreate} categories={categories} />
      <HorizontalDivider />
      <h3>Delete Dimension</h3>
      <DeleteForm
        onDelete={handleDimensionDelete}
        errorMessage={'Incorrect indicator code used'}
        inputLabel={'Indicator code'}
        buttonText={'Delete Indicator'}
      />
      <HorizontalDivider />
      <h3>Dimensions</h3>  
      <ListComponent 
        listItems={dimensions} 
        onDelete={handleDimensionDelete}
        onEdit={openDimensionModal}
      />
      <EditDimensionModal 
      isModalOpen={isDimensionModalOpen}
      closeModal={closeDimensionModal}
      dimension={dimension}
      handleEdit={handleDimensionEdit}
      categories={categories}
      />
      <Container sx={{paddingTop: '50px'}}>
        <HorizontalDivider />
      </Container>

      <h1>Dimenions Categories</h1>
      <h3>Create Dimension Category</h3>
      <DimensionCategoriesForm onSubmit={handleDimensionCategoryCreate} />
      <HorizontalDivider />
      <h3>Delete Dimension Category</h3>
      <DeleteForm
        onDelete={handleDimensionCategoriesDelete}
        errorMessage={'Incorrect indicator category code used'}
        inputLabel={'Indicator category code'}
        buttonText={'Delete Category'}
      />
      <HorizontalDivider />
      <h3>Dimension Categories</h3>
      <ListComponent
        listItems={categories} 
        onDelete={handleDimensionCategoriesDelete}
        onEdit={openDimensionCategoryModal}
      />
       <EditDimensionCategoryModal 
        isModalOpen={isDimensionCategoryModalOpen}
        closeModal={closeDimensionCategoryModal}
        handleEdit={handleDimensionCategoryEdit}
        category={category}
       />
    </Container>
  );
};

export default DimensionsPage;

