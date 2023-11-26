import { SET_PROFILE } from '../../constants/constants';

const profile = (state: any = {}, action: any) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.payload;
        default:
            return state;
    }
};

export default profile;
