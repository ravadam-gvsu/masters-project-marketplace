/* eslint-disable no-param-reassign */

const initialState = {
  userData: [],
  masterData: []
};
const app = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_LOGGED_IN_USER_DATA": {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case "SET_MASTER_DATA": {
      return {
        ...state,
        masterData: action.payload,
      };
    }
    
    default:
      return state;
  }
};
export default app;
