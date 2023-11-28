// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
// import { child, ref as dref, equalTo, get, getDatabase, onValue, orderByChild, push, query, set } from "firebase/database";
// import {
//     getDownloadURL,
//     getStorage,
//     ref as sref,
//     uploadBytes
// } from "firebase/storage";
// import validators from "../constants/validators";
// import { app } from "../common/auth/firebase-init";
// import { Buffer } from "buffer";
// import { setSessionData } from "../utility/commonUtility";
// import { uuidv4 } from "../utility/uuid";
// import { getBlob } from "../utility/blobUtil";

// export const auth = getAuth(app);
// const db = getDatabase();

// export const registerUser = (payload: any) => {
//     const { email, password } = payload;
//     const encPassword = btoa(password);

//     return createUserWithEmailAndPassword(auth, email, encPassword)
//         .then((userCredential) => {
//             const user: any = userCredential.user;
//             payload = { ...payload, uid: user.uid }
//             saveUserInfo(payload);
//             console.log('login successful', user);
//         })
//         .catch((error) => {
//             // const errorCode = error.code;
//             // const errorMessage = error.message;
//             return validators.failed;
//         });
// };

// export const saveUserInfo = async (data: any) => {
//     const res = await push(dref(db, "userDetails/"), {
//         ...data,
//         timestamp: Date.now(),
//     });
//     return res;
// };


// export const signIn = (user: any) => {
//     const { email, password } = user;
//     const encPassword = btoa(password);

//     return signInWithEmailAndPassword(auth, email, encPassword)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             setSessionData(validators.userInfo, user);
//             const data = fetchUserDetails(user.uid);
//             return { status: validators.success, data };
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(error, errorMessage);
//         });
// }

// export const fetchUserDetails = async (uid: any) => {
//     try {
//         const db = getDatabase();
//         const userDetailsQuery = query(dref(db, 'userDetails/'), orderByChild('uid'), equalTo(uid));
//         const val$ = new Promise((res, rej) => {
//             onValue(userDetailsQuery, (snapshot) => {
//                 const data = snapshot.val();

//                 if (data) {
//                     const user = data[Object.keys(data)[0]];
//                     console.log('userdetails', data);
//                     res(user);
//                 }
//             }, { onlyOnce: true });
//         })

//         return val$;
//     } catch (error) {
//         console.log("fetchUserDetails:", error);
//     }
// }

// const storage = getStorage(app);
// export async function uploadImageAsync(file: File) {
//     // const blob: any = await getBlob(uri);
//     // const arrayBuffer = await file.arrayBuffer();
//     const storageRef = sref(storage, uuidv4());

//     // 'file' comes from the Blob or File API
//     const snapshot = await uploadBytes(storageRef, file);
//     const dUrl = await getDownloadURL(snapshot.ref);
//     return dUrl;
// }


// export const saveProduct = async (id, data: any) => {
//     let { productImage, productImages, ...payload } = data;
//     productImages = productImages ? [...productImages] : [];
//     const allImages$ = productImages.map(uploadImageAsync)
//     const uploadedImages = await Promise.all(allImages$);
//     const db = getDatabase();
//     const res = await push(dref(db, `products`), {
//         ...payload,
//         images: uploadedImages,
//         specialRibbon: (payload.itemPrice !== payload.sellingPrice),
//         timestamp: Date.now(),
//     });
//     return res;
// };


// export const getProducts = async (location: any) => {
//     try {
//         const dbRef = dref(getDatabase());
//         const snapshot = await get(child(dbRef, `products/`));
//         if (snapshot.exists()) {
//             const data = snapshot?.val();
//             const refinedData = Object.keys(data)
//                 .map((id) => ({ id, ...data[id] })) //, distance: computeDistance(location, data[id].location)
//                 .sort((v1, v2) => v2.timestamp - v1.timestamp);
//             return refinedData;
//         }
//         return [];
//     } catch (error) {
//         console.log("getProducts:", error);
//     }
// };

// export const getSingleProduct = async (id) => {
//     try {
//         const dbRef = dref(getDatabase());
//         const snapshot = await get(child(dbRef, `products/${id}`));
//         if (snapshot.exists()) {
//             const data = snapshot?.val();
//             return data;
//         }
//         return [];
//     } catch (error) {
//         console.log("getSingleProduct:", error);
//     }
// };


// export const passwordReset = (email, password) => {
//     signInWithEmailAndPassword(auth, email, password);
// }

// export const getUser = () => {

// }

// export const signInWithGoogle = () => {

// }

// export const appSignOut = () => {

// }

// export const createAccount = () => {

// }

// export const setAuthPersistence = () => setPersistence(auth, browserLocalPersistence)

// export const addUser = () => {

// }

// export const generateKey = () => push(dref(db, "products/")).key;


// export const getItems = async (location: any) => {
//     try {
//         const dbRef = dref(getDatabase());
//         const snapshot = await get(child(dbRef, `items/`));
//         if (snapshot.exists()) {
//             const data = snapshot?.val();
//             const refinedData = Object.keys(data)
//                 .map((id) => ({ id, ...data[id] })) //, distance: computeDistance(location, data[id].location)
//                 .sort((v1, v2) => v2.timestamp - v1.timestamp);
//             return refinedData;
//         }
//         return [];
//     } catch (error) {
//         console.log("getItems:", error);
//     }
// };

// export const saveItem = async (id, data: any) => {
//     let { ...payload } = data;
//     const db = getDatabase();
//     const res = await push(dref(db, `items`), {
//         ...payload,
//         timestamp: Date.now(),
//     });
//     return res;
// };

// export const addChatsToFirestore = async (conversationId, user1Id, user2Id) => {
//     const db = getDatabase();
//     const docRef = dref(db, "usersChats/" + conversationId);

//     // Set the document with user1Id and user2Id
//     await set(docRef, {
//         user1Id: user1Id,
//         user2Id: user2Id,
//     });
// };

// export const getUserChat = async (itemOwnerId) => {
//     const userDocRef = dref(db, "users/" + itemOwnerId); // Reference to a document with ID of user's uid
//     const userDocSnap = await get(userDocRef);
//     const otherUserDoc: any = userDocSnap?.val();
//     return otherUserDoc;
// }



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail, EmailAuthProvider, onAuthStateChanged, setPersistence, updatePassword, browserLocalPersistence } from "firebase/auth";
import { child, ref as dref, equalTo, get, getDatabase, onValue, orderByChild, push } from "firebase/database";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes
} from "firebase/storage";
import { collection, doc, documentId, getDoc, getDocs, getFirestore, limit, orderBy, setDoc, updateDoc, where, query, startAfter, deleteDoc } from 'firebase/firestore';
import validators from "../constants/validators";
import { app } from "../common/auth/firebase-init";
import { Buffer } from "buffer";
import { setSessionData } from "../utility/commonUtility";
import { uuidv4 } from "../utility/uuid";
import { getBlob } from "../utility/blobUtil";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const user: any = auth.currentUser;

export const createAccount = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

export const appSignOut = () => signOut(auth);

export const passwordReset = (email) => sendPasswordResetEmail(auth, email);

export const addUser = (id, user) => setDoc(doc(collection(db, "users"), id), { user });

export const getUser = (id) => getDoc(doc(collection(db, "users"), id));

export const passwordUpdate = (password) => updatePassword(user, password);

export const changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
        reauthenticate(currentPassword)
            .then(() => {
                updatePassword(user, newPassword)
                    .then(() => {
                        resolve("Password updated successfully!");
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });

export const reauthenticate = (currentPassword) => {
    const cred = EmailAuthProvider.credential(
        user.email,
        currentPassword
    );

    return user.reauthenticateWithCredential(cred);
};

export const updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
        reauthenticate(currentPassword)
            .then(() => {
                updateEmail(user, newEmail)
                    .then(() => {
                        resolve("Email Successfully updated");
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });

export const updateProfile = (id, updates) =>
    updateDoc(doc(db, "users", id), { updates });

export const onStateChanged = () =>
    new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error("Auth State Changed failed"));
            }
        });
    });

export const saveBasketItems = (items, userId) =>
    updateDoc(doc(db, "users", userId), { basket: items });

export const setAuthPersistence = () =>
    setPersistence(auth, browserLocalPersistence);

// // PRODUCT ACTIONS --------------

export const getSingleProduct = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    return { id: product.id, ...product.data()};
};

export const getProducts = (lastRefKey: any = "") => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
        (async () => {
            if (lastRefKey) {
                try {
                    const queryRef = collection(db, "products");
                    const queryRes = query(queryRef, orderBy(documentId()), startAfter(lastRefKey), limit(12));

                    const snapshot = await getDocs(queryRes);
                    const products: any = [];
                    snapshot.forEach((doc: any) =>
                        products.push({ id: doc.id, ...doc.data() })
                    );
                    const lastKey = snapshot.docs[snapshot.docs.length - 1];

                    resolve({ products, lastKey });
                } catch (e: any) {
                    reject(e?.message || ":( Failed to fetch products.");
                }
            } else {
                const timeout = setTimeout(() => {
                    didTimeout = true;
                    reject(new Error("Request timeout, please try again"));
                }, 15000);

                try {
                    const totalQuery = collection(db, "products"); //firestore().collection("products").get();
                    const total = 10;
                    const queryRes = query(totalQuery, orderBy(documentId()), limit(12));
                    const snapshot = await getDocs(queryRes);

                    clearTimeout(timeout);
                    if (!didTimeout) {
                        const products: any = [];
                        snapshot.forEach((doc: any) =>
                            products.push({ id: doc.id, ...doc.data() })
                        );
                        const lastKey = snapshot.docs[snapshot.docs.length - 1];

                        resolve({ products, lastKey, total });
                    }
                } catch (e: any) {
                    if (didTimeout) return;
                    reject(e?.message || ":( Failed to fetch products.");
                }
            }
        })();
    });
};

export const searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
        (async () => {
            const productsRef: any = collection(db, "products");

            const timeout = setTimeout(() => {
                didTimeout = true;
                reject(new Error("Request timeout, please try again"));
            }, 15000);

            try {
                const searchedNameRef = productsRef
                    .orderBy("name_lower")
                    .where("name_lower", ">=", searchKey)
                    .where("name_lower", "<=", `${searchKey}\uf8ff`)
                    .limit(12);
                const searchedKeywordsRef = productsRef
                    .orderBy("dateAdded", "desc")
                    .where("keywords", "array-contains-any", searchKey.split(" "))
                    .limit(12);

                // const totalResult = await totalQueryRef.get();
                const nameSnaps = await searchedNameRef.get();
                const keywordsSnaps = await searchedKeywordsRef.get();
                // const total = totalResult.docs.length;

                clearTimeout(timeout);
                if (!didTimeout) {
                    const searchedNameProducts: any = [];
                    const searchedKeywordsProducts: any = [];
                    let lastKey = null;

                    if (!nameSnaps.empty) {
                        nameSnaps.forEach((doc: any) => {
                            searchedNameProducts.push({ id: doc.id, ...doc.data() });
                        });
                        lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
                    }

                    if (!keywordsSnaps.empty) {
                        keywordsSnaps.forEach((doc) => {
                            searchedKeywordsProducts.push({ id: doc.id, ...doc.data() });
                        });
                    }

                    // MERGE PRODUCTS
                    const mergedProducts = [
                        ...searchedNameProducts,
                        ...searchedKeywordsProducts,
                    ];
                    const hash = {};

                    mergedProducts.forEach((product) => {
                        hash[product.id] = product;
                    });

                    resolve({ products: Object.values(hash), lastKey });
                }
            } catch (e) {
                if (didTimeout) return;
                reject(e);
            }
        })();
    });
};

export const storeImage = async (imageFile) => {
    const storageRef = await ref(storage, uuidv4());
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

export const saveProduct = async (id, product) => {
    let { productImage, productImages, ...payload } = product;
    productImages = productImages ? [...productImages] : [];
    const allImages$ = productImages.map(storeImage)
    const uploadedImages = await Promise.all(allImages$);
    const dataToSave = {
        ...payload,
        images: uploadedImages,
        specialRibbon: (payload.itemPrice !== payload.sellingPrice),
        timestamp: Date.now(),
    }
    return setDoc(doc(db, 'products', id), dataToSave);
}

export const generateKey = () => doc(collection(db, "products")).id;


export const deleteImage = (id) => deleteObject(ref(storage, `products/${id}`));

export const editProduct = (id, updates) =>
    updateDoc(doc(db, "products", id), { updates });

export const removeProduct = (id) => deleteDoc(doc(db, "products", id));

export const saveItem = (id, product) =>
    setDoc(doc(db, 'products', id), product);

export const addChatsToFirestore = async (conversationId, user1Id, user2Id) => {
    const docRef = doc(db, "usersChats", conversationId);

    // Set the document with user1Id and user2Id
    await setDoc(docRef, {
        user1Id: user1Id,
        user2Id: user2Id,
    });
};

export const getUserChat = async (itemOwnerId) => {
    const userDocRef = doc(db, "users", itemOwnerId); // Reference to a document with ID of user's uid
    const userDocSnap = await getDoc(userDocRef);
    const otherUserDoc: any = userDocSnap?.data();
    return otherUserDoc;
}
