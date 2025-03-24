import { useState, useEffect } from 'react';
import { User } from '@/types/Index';
import { getUserData } from '../services/userApi';
import { useLoadingError } from './useLoadingError';

export const useUser = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const { isLoading, error: loadingError } = useLoadingError([{ loading, error }]);

  return {
    userData,
    loading: isLoading,
    error: loadingError
  };
}; 