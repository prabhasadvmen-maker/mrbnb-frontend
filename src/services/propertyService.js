import { PROPERTIES } from '../data/propertiesData';
import { DESTINATIONS } from '../data/destinationsData';

/**
 * Property Service for fetching listings, destinations, and availability
 */
export const propertyService = {
  async getAllProperties() {
    return Promise.resolve(PROPERTIES);
  },

  async getFeaturedStays() {
    return Promise.resolve(PROPERTIES.slice(0, 4));
  },

  async getPropertyById(id) {
    const found = PROPERTIES.find((p) => p.id === id);
    return Promise.resolve(found || null);
  },

  async getDestinations() {
    return Promise.resolve(DESTINATIONS);
  },

  async checkAvailability(propertyId, checkIn, checkOut) {
    // In production, queries backend room inventory
    return Promise.resolve({
      available: true,
      instantConfirmation: true
    });
  }
};
