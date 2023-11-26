import {
    ADD_QTY_ITEM, MINUS_QTY_ITEM, ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_CART_ITEMS
} from '../../constants/constants';

const cart = (state = [], action: any) => {
    switch (action.type) {
        case SET_CART_ITEMS:
            return action.payload;
        case ADD_TO_CART:
            return state.some((product: any) => product.id === action.payload.id)
                ? state
                : [action.payload, ...state];
        case REMOVE_FROM_CART:
            return state.filter((product: any) => product.id !== action.payload);
        case CLEAR_CART:
            return [];
        case ADD_QTY_ITEM:
            return state.map((product: any) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                return product;
            });
        case MINUS_QTY_ITEM:
            return state.map((product: any) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    };
                }
                return product;
            });
        default:
            return state;
    }
};

export default cart;