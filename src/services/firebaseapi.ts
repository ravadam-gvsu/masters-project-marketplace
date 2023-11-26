import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { child, ref as dref, equalTo, get, getDatabase, onValue, orderByChild, push, query, set } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as sref,
    uploadBytes
} from "firebase/storage";
import validators from "../constants/validators";
import { app } from "../common/auth/firebase-init";
import { Buffer } from "buffer";
import { setSessionData } from "../utility/commonUtility";
import { uuidv4 } from "../utility/uuid";
import { getBlob } from "../utility/blobUtil";

export const auth = getAuth(app);
const db = getDatabase();

export const registerUser = (payload: any) => {
    const { email, password } = payload;
    const encPassword = btoa(password);

    return createUserWithEmailAndPassword(auth, email, encPassword)
        .then((userCredential) => {
            const user: any = userCredential.user;
            payload = { ...payload, uid: user.uid }
            saveUserInfo(payload);
            console.log('login successful', user);
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            return validators.failed;
        });
};

export const saveUserInfo = async (data: any) => {
    const res = await push(dref(db, "userDetails/"), {
        ...data,
        timestamp: Date.now(),
    });
    return res;
};


export const signIn = (user: any) => {
    const { email, password } = user;
    const encPassword = btoa(password);

    return signInWithEmailAndPassword(auth, email, encPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setSessionData(validators.userInfo, user);
            const data = fetchUserDetails(user.uid);
            return { status: validators.success, data };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error, errorMessage);
        });
}

export const fetchUserDetails = async (uid: any) => {
    try {
        const db = getDatabase();
        const userDetailsQuery = query(dref(db, 'userDetails/'), orderByChild('uid'), equalTo(uid));
        const val$ = new Promise((res, rej) => {
            onValue(userDetailsQuery, (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    const user = data[Object.keys(data)[0]];
                    console.log('userdetails', data);
                    res(user);
                }
            }, { onlyOnce: true });
        })

        return val$;
    } catch (error) {
        console.log("fetchUserDetails:", error);
    }
}

const storage = getStorage(app);
export async function uploadImageAsync(file: File) {
    // const blob: any = await getBlob(uri);
    // const arrayBuffer = await file.arrayBuffer();
    const storageRef = sref(storage, uuidv4());

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);
    const dUrl = await getDownloadURL(snapshot.ref);
    return dUrl;
}


export const saveProduct = async (id, data: any) => {
    let { productImage, productImages, ...payload } = data;
    productImages = productImages ? [...productImages] : [];
    const allImages$ = productImages.map(uploadImageAsync)
    const uploadedImages = await Promise.all(allImages$);
    const db = getDatabase();
    const res = await push(dref(db, `products`), {
        ...payload,
        images: uploadedImages,
        specialRibbon: (payload.itemPrice !== payload.sellingPrice),
        timestamp: Date.now(),
    });
    return res;
};


export const getProducts = async (location: any) => {
    try {
        const dbRef = dref(getDatabase());
        const snapshot = await get(child(dbRef, `products/`));
        if (snapshot.exists()) {
            const data = snapshot?.val();
            const refinedData = Object.keys(data)
                .map((id) => ({ id, ...data[id] })) //, distance: computeDistance(location, data[id].location)
                .sort((v1, v2) => v2.timestamp - v1.timestamp);
            return refinedData;
        }
        return [];
    } catch (error) {
        console.log("getProducts:", error);
    }
};

export const getSingleProduct = async (id) => {
    try {
        const dbRef = dref(getDatabase());
        const snapshot = await get(child(dbRef, `products/${id}`));
        if (snapshot.exists()) {
            const data = snapshot?.val();
            return data;
        }
        return [];
    } catch (error) {
        console.log("getSingleProduct:", error);
    }
};


export const passwordReset = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
}

export const getUser = () => {

}

export const signInWithGoogle = () => {

}

export const appSignOut = () => {

}

export const createAccount = () => {

}

export const setAuthPersistence = () => setPersistence(auth, browserLocalPersistence)

export const addUser = () => {

}

export const generateKey = () => push(dref(db, "products/")).key;


export const getItems = async (location: any) => {
    try {
        const dbRef = dref(getDatabase());
        const snapshot = await get(child(dbRef, `items/`));
        if (snapshot.exists()) {
            const data = snapshot?.val();
            const refinedData = Object.keys(data)
                .map((id) => ({ id, ...data[id] })) //, distance: computeDistance(location, data[id].location)
                .sort((v1, v2) => v2.timestamp - v1.timestamp);
            return refinedData;
        }
        return [];
    } catch (error) {
        console.log("getItems:", error);
    }
};

export const saveItem = async (id, data: any) => {
    let { ...payload } = data;
    const db = getDatabase();
    const res = await push(dref(db, `items`), {
        ...payload,
        timestamp: Date.now(),
    });
    return res;
};

export const addChatsToFirestore = async (conversationId, user1Id, user2Id) => {
    const db = getDatabase();
    const docRef = dref(db, "usersChats/" + conversationId);

    // Set the document with user1Id and user2Id
    await set(docRef, {
        user1Id: user1Id,
        user2Id: user2Id,
    });
};

export const getUserChat = async (itemOwnerId) => {
    const userDocRef = dref(db, "users/" + itemOwnerId); // Reference to a document with ID of user's uid
    const userDocSnap = await get(userDocRef);
    const otherUserDoc: any = userDocSnap?.val();
    return otherUserDoc;
}