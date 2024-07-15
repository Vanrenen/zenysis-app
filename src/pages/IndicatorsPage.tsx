import React, { useState, useEffect } from 'react';
import IndicatorForm from '../components/indicators/IndicatorForm';
import { 
  fetchIndicators,
  createIndicator,
  deleteIndicator,
  fetchIndicatorsCategories,
  deleteIndicatorCategory,
  createIndicatorCategory,
  updateIndicator,
  updateIndicatorCategory,
} from '../services/api';
import { Indicator, IndicatorCategory } from '../types/IndicatorTypes';
import { Container } from '@mui/material';
import DeleteForm from '../components/common/DeleteForm';
import ListComponent from '../components/common/ListComponent';
import IndicatorCategoriesForm from '../components/indicatorCategories/IndicatorCategoriesForm';
import EditIndicatorModal from '../components/indicators/EditIndicatorModal';
import EditIndicatorCategoryModal from '../components/indicatorCategories/EditIndicatorCategoryModal';
import HorizontalDivider from '../components/common/ HorizontalDivider';

const IndicatorsPage: React.FC = () => {
  const [indicators, setIndicators] = useState<Indicator[] | []>([]);
  const [indicator, setIndicator] = useState<Indicator>()
  const [categories, setCategories] = useState<IndicatorCategory[] | []>([]);
  const [category, setCategory] = useState<IndicatorCategory>();
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState<string>('')
  const [isIndicatorCategoryModalOpen, setIsIndicatorCategoryModalOpen] = useState(false);

  useEffect(() => {
    const loadIndicators = async () => {
      const data = await fetchIndicators();
      setIndicators(data);
    };
    loadIndicators();
  }, []);

  useEffect(() => {
    const loadIndicatorCategories = async () => {
      const data = await fetchIndicatorsCategories();
      setCategories(data);
    };
    loadIndicatorCategories();
  }, []);

  const handleIndicatorCreate = async (indicator: Indicator) => {
    const newIndicator = await createIndicator(indicator);
    setIndicators([...indicators, newIndicator]);
  };

  const handleIndicatorDelete = async (code: string) => {
    await deleteIndicator(code);
    setIndicators(indicators.filter((indicator) => indicator.code !== code));
  };

  const handleIndicatorEdit = async (indicator: Indicator | undefined) => {
    if (!indicator) {
      return;
    }
    await updateIndicator(indicator.code, indicator);
  }

  const handleIndicatorCategoryCreate = async (category: IndicatorCategory) => {
    const newCategory = await createIndicatorCategory(category);
    setIndicators([...categories, newCategory]);
  }

  const handleIndicatorCatoriesDelete =  async (code: string) => {
    await deleteIndicatorCategory(code);
    setCategories(categories.filter(category => category.code !== code));
  }

  const handleIndicatorCategoryEdit = async (category: IndicatorCategory) => {
    await updateIndicatorCategory(category.code, category);
  }

  const openIndicatorModal = (code: string) => {
    setIndicator(indicators.filter(indicator => indicator.code === code)[0])
    setIsIndicatorModalOpen(true);
  };

  const closeIndicatorModal = () => {
    setIsIndicatorModalOpen(false);
  };

  const openIndicatorCateryModal = (code: string) => {
    setCategory(categories.filter(category => category.code === code)[0])
    setIsIndicatorCategoryModalOpen(true);
  }

  const closeIndicatorCategoryModal = () => {
    setIsIndicatorCategoryModalOpen(false);
  };

  return (
    <Container>
      <h1>Indicators</h1>
      <IndicatorForm onSubmit={handleIndicatorCreate} categories={categories} />
      <HorizontalDivider />
      <DeleteForm
        onDelete={handleIndicatorDelete}
        errorMessage={'Incorrect indicator code used'}
        inputLabel={'Indicator code'}
        buttonText={'Delete Indicator'}
      />
      <HorizontalDivider />
      <ListComponent 
        listItems={indicators} 
        onDelete={handleIndicatorDelete}
        onEdit={openIndicatorModal}
      />
       <EditIndicatorModal 
        isModalOpen={isIndicatorModalOpen}
        closeModal={closeIndicatorModal}
        indicator={indicator}
        handleEdit={handleIndicatorEdit}
        categories={categories}
       />
       <Container sx={{paddingTop: '50px'}}>
        <HorizontalDivider />
      </Container>

      <h1>Indicator Categories</h1>
      <IndicatorCategoriesForm onSubmit={handleIndicatorCategoryCreate} />
      <HorizontalDivider />
      <DeleteForm
        onDelete={handleIndicatorCatoriesDelete}
        errorMessage={'Incorrect indicator category code used'}
        inputLabel={'Indicator catery code'}
        buttonText={'Delete Category'}
      />
      <HorizontalDivider />
      <ListComponent
        listItems={categories} 
        onDelete={handleIndicatorCatoriesDelete}
        onEdit={openIndicatorCateryModal}
      />
       <EditIndicatorCategoryModal 
        isModalOpen={isIndicatorCategoryModalOpen}
        closeModal={closeIndicatorCategoryModal}
        handleEdit={handleIndicatorCategoryEdit}
        category={category}
       />
    </Container>
  );
};

export default IndicatorsPage;
