import {
    ADD_ITEM_SUCCESS,
    GET_ITEMS_SUCCESS,
} from '../../constants/constants';


const item = (state: any = {}, action: any) => {
    switch (action.type) {
        case GET_ITEMS_SUCCESS:
            const items = [...state.items, ...action.payload.products];
            return {
                ...state,
                items
            };
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        default:
            return state;
    }
};

export default item;
