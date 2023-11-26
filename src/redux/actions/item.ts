import {
    ADD_ITEM,
    ADD_ITEM_SUCCESS,
    GET_ITEMS,
    GET_ITEMS_SUCCESS,
} from '../../constants/constants';

//Lost and found implementation
export const getItems = (lastRef: any) => ({
    type: GET_ITEMS,
    payload: lastRef
});

export const getItemsSuccess = (items: any) => ({
    type: GET_ITEMS_SUCCESS,
    payload: items
});

export const addItem = (item: any) => ({
    type: ADD_ITEM,
    payload: item
});

export const addItemSuccess = (item: any) => ({
    type: ADD_ITEM_SUCCESS,
    payload: item
});
