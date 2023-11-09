import { useContext } from 'react';
import {
  SearchContext,
  UpdateSearchContext,
} from '../components/SearchContext.tsx';

export const useSearchContext = () => {
  const contextValue = useContext(SearchContext);
  if (!contextValue) throw new Error('Error in SearchContext');
  return contextValue;
};

export const useSearchUpdateContext = () => {
  const contextValue = useContext(UpdateSearchContext);
  if (!contextValue) throw new Error('Error in SearchUpdateContext');
  return contextValue;
};
