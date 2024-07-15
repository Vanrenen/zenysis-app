const API_URL = 'http://localhost:8000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchIndicators = async (page: number = 1) => {
  try {
    const response = await fetch(`${API_URL}/indicators?page=${page}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};

export const createIndicator = async (indicator: any) => {
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

export const deleteIndicator = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/indicators/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting indicator:", error);
    throw error;
  }
};

export const fetchDimensions = async (page: number = 1) => {
  try {
    const response = await fetch(`${API_URL}/dimensions?page=${page}`);
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
