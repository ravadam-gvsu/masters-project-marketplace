import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import config from "../../config";
// import { getFirestore } from "firebase/firestore";

// Initialize Firebase
export const app = initializeApp(config.firebase);
export const analytics = getAnalytics(app);
// export const db = getFirestore();
