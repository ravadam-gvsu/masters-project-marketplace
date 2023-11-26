import {
  fetchCities,
  fetchCountries,
  fetchStates,
} from "../../services/middleware";

export const setMasterData = (payload: { countries: any; states: any; cities: any; }) => ({
  type: "SET_MASTER_DATA",
  payload,
});

export const setCart = (payload: any) => ({
  type: "ADD_TO_CART",
  payload,
});

export const setCartTotalAmount = (payload: any) => ({
  type: "SET_CART_TOTAL_AMOUNT",
  payload,
});

export const setCartTotalCount = (payload: any) => ({
  type: "SET_CART_TOTAL_COUNT",
  payload,
});

export const setCountryStateCityData = (
  countryName = "India",
  stateName = "Uttar Pradesh"
) => async (dispatch: any) => {
  const countries = await fetchCountries();
  const states = await fetchStates(countryName);
  const cities = await fetchCities(stateName);

  dispatch(setMasterData({ countries, states, cities }));
};
