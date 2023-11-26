import {
    ON_AUTHSTATE_FAIL,
    ON_AUTHSTATE_SUCCESS, RESET_PASSWORD,
    SET_AUTH_PERSISTENCE,
    SIGNIN, SIGNIN_WITH_FACEBOOK,
    SIGNIN_WITH_GITHUB, SIGNIN_WITH_GOOGLE,
    SIGNOUT, SIGNUP
} from '../../constants/constants';
import routes from '../../constants/routes';
// import defaultAvatar from '@/images/defaultAvatar.jpg';
// import defaultBanner from '@/images/defaultBanner.jpg';
import { call, put } from 'redux-saga/effects';
import { signInSuccess, signOutSuccess } from '../actions/auth';
import { clearCart, setCartItems } from '../actions/cart';
import { resetCheckout } from '../actions/checkout';
import { resetFilter } from '../actions/filter';
import { setAuthenticating, setAuthStatus } from '../actions/other';
import { clearProfile, setProfile } from '../actions/profile';
import { addUser, appSignOut, createAccount, fetchUserDetails, getUser, passwordReset, registerUser, setAuthPersistence, signIn, signInWithGoogle } from '../../services/firebaseapi';

function* handleError(e: any) {
    const obj = { success: false, type: 'auth', isError: true };
    yield put(setAuthenticating(false));

    switch (e.code) {
        case 'auth/network-request-failed':
            yield put(setAuthStatus({ ...obj, message: 'Network error has occured. Please try again.' }));
            break;
        case 'auth/email-already-in-use':
            yield put(setAuthStatus({ ...obj, message: 'Email is already in use. Please use another email' }));
            break;
        case 'auth/wrong-password':
            yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
            break;
        case 'auth/user-not-found':
            yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
            break;
        case 'auth/reset-password-error':
            yield put(setAuthStatus({ ...obj, message: 'Failed to send password reset email. Did you type your email correctly?' }));
            break;
        default:
            yield put(setAuthStatus({ ...obj, message: e.message }));
            break;
    }
}

function* initRequest() {
    yield put(setAuthenticating());
    yield put(setAuthStatus({}));
}

function* authSaga({ type, payload }: any): any {
    switch (type) {
        case SIGNIN:
            try {
                yield initRequest();
                yield call(signIn, payload);
            } catch (e) {
                yield handleError(e);
            }
            break;
        case SIGNIN_WITH_GOOGLE:
            try {
                yield initRequest();
                yield call(signInWithGoogle);
            } catch (e) {
                yield handleError(e);
            }
            break;
        case SIGNUP:
            try {
                yield initRequest();
                const fCreateAcc: any = call(registerUser, payload);
                const ref = yield fCreateAcc;
                const fullname = payload.fullname.split(' ').map((name: any) => name[0].toUpperCase().concat(name.substring(1))).join(' ');
                const user = {
                    fullname,
                    // avatar: defaultAvatar,
                    // banner: defaultBanner,
                    email: payload.email,
                    address: '',
                    basket: [],
                    mobile: { data: {} },
                    role: 'USER',
                    dateJoined: ref.user.metadata.creationTime || new Date().getTime()
                };

                // yield call(addUser, ref.user.uid, user);
                yield put(setProfile(user));
                yield put(setAuthenticating(false));
            } catch (e) {
                yield handleError(e);
            }
            break;
        case SIGNOUT: {
            try {
                yield initRequest();
                yield call(appSignOut);
                yield put(clearCart());
                yield put(clearProfile());
                yield put(resetFilter());
                yield put(resetCheckout());
                yield put(signOutSuccess());
                yield put(setAuthenticating(false));
                // NavigationService.navigate('Profile', {});
            } catch (e) {
                console.log(e);
            }
            break;
        }
        case RESET_PASSWORD: {
            try {
                yield initRequest();
                // yield call(passwordReset, payload);
                yield put(setAuthStatus({
                    success: true,
                    type: 'reset',
                    message: 'Password reset email has been sent to your provided email.'
                }));
                yield put(setAuthenticating(false));
            } catch (e) {
                handleError({ code: 'auth/reset-password-error' });
            }
            break;
        }
        case ON_AUTHSTATE_SUCCESS: {
            const snapshot: any = yield call(fetchUserDetails, payload.uid);

            if (snapshot) { // if user exists in database
                const user = snapshot;
                yield put(setProfile(user));
                yield put(setCartItems(user.cart));
                // yield put(setCartItems(user.cart));
                yield put(signInSuccess({
                    id: payload.uid,
                    role: user.role,
                    provider: payload.providerData[0].providerId
                }));
            } else if (payload.providerData[0].providerId !== 'password' && !snapshot.data()) {
                // add the user if auth provider is not password
                const user = {
                    fullname: payload.displayName ? payload.displayName : 'User',
                    // avatar: payload.photoURL ? payload.photoURL : defaultAvatar,
                    // banner: defaultBanner,
                    email: payload.email,
                    address: '',
                    cart: [],
                    mobile: { data: {} },
                    role: 'USER',
                    dateJoined: payload.metadata.creationTime
                };
                // yield call(addUser, payload.uid, user);
                yield put(setProfile(user));
                yield put(signInSuccess({
                    id: payload.uid,
                    role: user.role,
                    provider: payload.providerData[0].providerId
                }));
            }

            yield put(setAuthStatus({
                success: true,
                type: 'auth',
                isError: false,
                message: 'Successfully signed in. Redirecting...'
            }));
            yield put(setAuthenticating(false));
            break;
        }
        case ON_AUTHSTATE_FAIL: {
            yield put(clearProfile());
            yield put(signOutSuccess());
            break;
        }
        case SET_AUTH_PERSISTENCE: {
            try {
                yield call(setAuthPersistence);
            } catch (e) {
                console.log(e);
            }
            break;
        }
        default: {
            throw new Error('Unexpected Action Type.');
        }
    }
}

export default authSaga;
