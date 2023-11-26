/* eslint-disable indent */
import {
    ADD_ITEM,
    ADD_PRODUCT,
    GET_ITEMS,
    GET_PRODUCTS,
} from '../../constants/constants';
import {
    all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/other';
import { generateKey, saveItem } from '../../services/firebaseapi';
import {
    addItemSuccess, getItems, getItemsSuccess
} from '../actions/item';
// import * as NavigationService from '../../services/navigation'


function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
}

function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
    console.log('ERROR: ', e);
}

// function* handleAction(location, message, status) {
//     if (location) NavigationService.navigate(location, {});
//     yield call(displayActionMessage, message, status);
// }

function* itemSaga({ type, payload }) {
    switch (type) {
        case GET_ITEMS:
            try {
                yield initRequest();
                const state = yield select();
                const result = yield call(getItems, payload);

                if (result.length === 0) {
                    handleError('No items found.');
                } else {
                    yield put(getItemsSuccess({
                        products: result,
                        // lastKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
                        // total: result.total ? result.total : state.products.total
                    }));
                    yield put(setRequestStatus(''));
                }
                // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;

        case ADD_ITEM: {
            try {
                yield initRequest();
                const key = yield call(generateKey);

                yield call(saveItem, key, payload);
                yield put(addItemSuccess({
                    id: key,
                    ...payload
                }));
                // yield handleAction(ADMIN_PRODUCTS, 'Item succesfully added', 'success');
                yield put(setLoading(false));
            } catch (e: any) {
                yield handleError(e);
                // yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
            }
            break;
        }
        default: {
            throw new Error(`Unexpected action type ${type}`);
        }
    }
}

export default itemSaga;
