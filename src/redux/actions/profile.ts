import {
    CLEAR_PROFILE,
    SET_PROFILE,
    UPDATE_EMAIL,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS
  } from '../../constants/constants';
  
  export const clearProfile = () => ({
    type: CLEAR_PROFILE
  });
  
  export const setProfile = (user: any) => ({
    type: SET_PROFILE,
    payload: user
  });
  
  export const updateEmail = (password: any, newEmail: any) => ({
    type: UPDATE_EMAIL,
    payload: {
      password,
      newEmail
    }
  });
  
  export const updateProfile = (newProfile: any) => ({
    type: UPDATE_PROFILE,
    payload: {
      updates: newProfile.updates,
      files: newProfile.files,
      credentials: newProfile.credentials
    }
  });
  
  export const updateProfileSuccess = (updates: any) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: updates
  });
  