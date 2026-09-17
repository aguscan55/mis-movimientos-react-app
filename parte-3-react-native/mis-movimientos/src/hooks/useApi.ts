import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const BASE_URL = 'http://localhost:3000/api';

export function useApi() {
  const fetcher = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error en la petición al servidor');
      }

      return await response.json();
    } catch (error: any) {
      console.error(`Error en API [${endpoint}]:`, error);
      throw error;
    }
  }, []);

  return { fetcher };
}