import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDxFOhfgbiy1tp5oR7IpzJVWvCDZNxrYDI",
    authDomain: "insta-clone-x-676c8.firebaseapp.com",
    projectId: "insta-clone-x-676c8",
    storageBucket: "insta-clone-x-676c8.appspot.com",
    messagingSenderId: "755175260235",
    appId: "1:755175260235:web:d00c931720c99699044dce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };