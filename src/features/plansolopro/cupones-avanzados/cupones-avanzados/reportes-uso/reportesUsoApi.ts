// src/features/cupones-avanzados/reportes-uso/reportesUsoApi.ts

import axios from 'axios';

const API_BASE_URL = '/api/cupones-avanzados/reportes-uso'; // Adjust as per your API setup

export const fetchCouponUsageData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coupon usage data:', error);
    throw error;
  }
};

export const fetchRevenueMetrics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/revenue`);
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue metrics:', error);
    throw error;
  }
};

export const fetchNewClientsByCoupon = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/new-clients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching new clients by coupon:', error);
    throw error;
  }
};

export const fetchRoiByPromotion = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roi`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ROI by promotion:', error);
    throw error;
  }
};

export const fetchTemporalComparisons = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/temporal-comparisons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching temporal comparisons:', error);
    throw error;
  }
};
