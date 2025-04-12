import { useState, useEffect } from 'react';
import { Company } from '../types/Company';
import { getCompany, getCompanyById } from '../services/companyApi';
import { useLoadingError } from '../hooks/useLoadingError';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompany();
        setCompanies(data);
      } catch (error) {
        setError("Failed to fetch company data");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const { isLoading, error: loadingError } = useLoadingError([{ loading, error }]);

  return {
    companies,
    loading: isLoading,
    error: loadingError
  };
};

export const useCompany = (companyId: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [idLoading, setIdLoading] = useState(true);
  const [idError, setIdError] = useState<string>("");

  useEffect(() => {
    const fetchCompany = async () => {
      setIdLoading(true);
      try {
        if (!companyId) {
          setIdError("Company ID is required");
          return;
        }
        const data = await getCompanyById(companyId);
        setCompany(data);
      } catch (error) {
        setError("Failed to fetch company data");
      } finally {
        setLoading(false);
        setIdLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const { isLoading, error: loadingError } = useLoadingError([
    { loading, error },        // 会社データの取得状態
    { loading: idLoading, error: idError }  // IDの検証状態
  ]);

  return {
    company,
    loading: isLoading,
    error: loadingError
  };
}; 