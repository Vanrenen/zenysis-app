import { Dimension } from "../types/DimensiontTypes";
import { Indicator } from "../types/IndicatorTypes";

const API_URL = 'http://localhost:8000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchIndicators = async () => {
  try {
    const response = await fetch(`${API_URL}/indicators`);
    return await handleResponse(response)as Indicator[];
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};

export const createIndicator = async (indicator: Indicator) => {
  try {
    const response = await fetch(`${API_URL}/indicators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indicator),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating indicator:", error);
    throw error;
  }
};

export const updateIndicator = async (code: string, indicator: Indicator) => {
  try {
    const response = await fetch(`${API_URL}/indicators/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indicator),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating indicator:", error);
    throw error;
  }
};

export const deleteIndicator = async (code: string) => {
  try {
    const response = await fetch(`${API_URL}/indicators/${code}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting indicator:", error);
    throw error;
  }
};

export const fetchIndicatorsCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/indicator_categories`);
    return await handleResponse(response)as Indicator[];
  } catch (error) {
    console.error("Error fetching indicators categories:", error);
    throw error;
  }
};

export const createIndicatorCategory = async (indicator: any) => {
  try {
    const response = await fetch(`${API_URL}/indicator_categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indicator),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating indicator category:", error);
    throw error;
  }
};

export const updateIndicatorCategory = async (code: string, category: any) => {
  try {
    const response = await fetch(`${API_URL}/indicator_categories/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating indicator category:", error);
    throw error;
  }
};

export const deleteIndicatorCategory = async (code: string) => {
  try {
    const response = await fetch(`${API_URL}/indicator_categories/${code}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting indicator category:", error);
    throw error;
  }
};

export const fetchDimensions = async () => {
  try {
    const response = await fetch(`${API_URL}/dimensions`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching dimensions:", error);
    throw error;
  }
};

export const createDimension = async (dimension: any) => {
  try {
    const response = await fetch(`${API_URL}/dimensions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dimension),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating dimension:", error);
    throw error;
  }
};

export const updateDimension = async (id: string, dimension: any) => {
  try {
    const response = await fetch(`${API_URL}/dimensions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dimension),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating dimension:", error);
    throw error;
  }
};

export const deleteDimension = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/dimensions/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting dimension:", error);
    throw error;
  }
};

export const fetchDimensionCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/dimension_categories`);
    return await handleResponse(response)as Dimension[];
  } catch (error) {
    console.error("Error fetching dimensions:", error);
    throw error;
  }
};

export const createDimensionCategory = async (dimension: any) => {
  try {
    const response = await fetch(`${API_URL}/dimension_categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dimension),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating dimension category:", error);
    throw error;
  }
};

export const updateDimensionCategory = async (code: string, category: any) => {
  try {
    const response = await fetch(`${API_URL}/dimension_categories/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating dimension category:", error);
    throw error;
  }
};

export const deleteDimensionCategory = async (code: string) => {
  try {
    const response = await fetch(`${API_URL}/dimension_categories/${code}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting dimension category:", error);
    throw error;
  }
};