import { PROPERTIES } from '../data/propertiesData';

/**
 * Standard Redux-compatible State Architecture
 * Provides dispatch-compatible actions and store state
 */
export const initialPropertyState = {
  properties: PROPERTIES,
  selectedProperty: null,
  featuredStays: PROPERTIES.slice(0, 4),
  loading: false,
  error: null
};

export const propertyReducer = (state = initialPropertyState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedProperty: action.payload };
    case 'FILTER_PROPERTIES':
      return {
        ...state,
        properties: state.properties.filter((p) =>
          p.city.toLowerCase().includes(action.payload.toLowerCase())
        )
      };
    default:
      return state;
  }
};

export const store = {
  getState: () => ({ property: initialPropertyState }),
  dispatch: (action) => propertyReducer(initialPropertyState, action)
};

export default store;
