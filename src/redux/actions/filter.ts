import {
    APPLY_FILTER,
    CLEAR_RECENT_SEARCH,
    REMOVE_SELECTED_RECENT, RESET_FILTER, SET_BRAND_FILTER,
    SET_MAX_PRICE_FILTER,
    SET_MIN_PRICE_FILTER, SET_TEXT_FILTER
  } from '../../constants/constants';
  
  export const setTextFilter = (keyword: any) => ({
    type: SET_TEXT_FILTER,
    payload: keyword
  });
  
  export const setBrandFilter = (brand: any) => ({
    type: SET_BRAND_FILTER,
    payload: brand
  });
  
  export const setMinPriceFilter = (min: any) => ({
    type: SET_MIN_PRICE_FILTER,
    payload: min
  });
  
  export const setMaxPriceFilter = (max: any) => ({
    type: SET_MAX_PRICE_FILTER,
    payload: max
  });
  
  export const resetFilter = () => ({
    type: RESET_FILTER
  });
  
  export const clearRecentSearch = () => ({
    type: CLEAR_RECENT_SEARCH
  });
  
  export const removeSelectedRecent = (keyword: any) => ({
    type: REMOVE_SELECTED_RECENT,
    payload: keyword
  });
  
  export const applyFilter = (filters: any) => ({
    type: APPLY_FILTER,
    payload: filters
  });
  