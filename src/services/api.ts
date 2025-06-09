import axios from 'axios';

const API_BASE_URL = 'https://bazaarapp-hwdsdrc5cgfmhvew.eastus2-01.azurewebsites.net/api'; //Dominio

export const searchProducts = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/items?search=${query}`);
  return response.data;
};

export const getProductDetail = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/items/${id}`);
  return response.data;
};

export const createProduct = async (productData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/create`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const addRating = async (productId: string, ratingValue: number) => {
  const response = await axios.post(`${API_BASE_URL}/items/${productId}/addrating`, {
    value: ratingValue,
  });
  return response.data;
};