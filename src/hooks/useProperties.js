import { useMemo } from 'react';
import { PROPERTIES } from '../data/propertiesData';

/**
 * Custom hook to filter properties based on destination, category, and corporate readiness
 */
export const useProperties = ({ destination = '', category = 'all', corporateOnly = false } = {}) => {
  const filtered = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Destination filter
      if (destination && !property.city.toLowerCase().includes(destination.toLowerCase()) &&
          !property.location.toLowerCase().includes(destination.toLowerCase())) {
        return false;
      }
      // Category filter
      if (category !== 'all' && property.category !== category) {
        return false;
      }
      // Corporate filter
      if (corporateOnly && !property.corporateFriendly) {
        return false;
      }
      return true;
    });
  }, [destination, category, corporateOnly]);

  return {
    properties: filtered,
    totalCount: filtered.length,
    allProperties: PROPERTIES
  };
};
