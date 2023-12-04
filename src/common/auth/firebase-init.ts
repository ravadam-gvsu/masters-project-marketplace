import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import config from "../../config";

// Initialize Firebase
export const app = initializeApp(config.firebase);
export const analytics = getAnalytics(app);
