import * as type from '../../constants/constants';

export const signIn = (email: any, password: any) => ({
  type: type.SIGNIN,
  payload: {
    email,
    password
  }
});

export const signInWithGoogle = () => ({
  type: type.SIGNIN_WITH_GOOGLE
});

export const signInWithFacebook = () => ({
  type: type.SIGNIN_WITH_FACEBOOK
});

export const signInWithGithub = () => ({
  type: type.SIGNIN_WITH_GITHUB
});

export const signUp = (user: any) => ({
  type: type.SIGNUP,
  payload: user
});

export const signInSuccess = (auth: any) => ({
  type: type.SIGNIN_SUCCESS,
  payload: auth
});

export const setAuthPersistence = () => ({
  type: type.SET_AUTH_PERSISTENCE
});

export const signOut = () => ({
  type: type.SIGNOUT
});

export const signOutSuccess = () => ({
  type: type.SIGNOUT_SUCCESS
});

export const onAuthStateChanged = () => ({
  type: type.ON_AUTHSTATE_CHANGED
});

export const onAuthStateSuccess = (user: any) => ({
  type: type.ON_AUTHSTATE_SUCCESS,
  payload: user
});

export const onAuthStateFail = (error: any) => ({
  type: type.ON_AUTHSTATE_FAIL,
  payload: error
});

export const resetPassword = (email: any) => ({
  type: type.RESET_PASSWORD,
  payload: email
});

