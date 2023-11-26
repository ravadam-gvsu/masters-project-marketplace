const showToast = (payload: any) => ({
  type: 'SHOW_TOAST',
  payload
});
const hideToast = (payload: any) => ({
  type: 'HIDE_TOAST',
  payload
});

export const handleShowToast = (payload: any) => (dispatch: any) => {
  dispatch(showToast(payload));
};

export const handleHideToast = (payload: any) => (dispatch: any) => {
  dispatch(hideToast(payload))
}