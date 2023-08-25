import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCf-JsFD8qeZXdr1f2Oc_QyOgzV5zQeXoY",
    authDomain: "prac-b6cc0.firebaseapp.com",
    projectId: "prac-b6cc0",
    storageBucket: "prac-b6cc0.appspot.com",
    messagingSenderId: "201655864749",
    appId: "1:201655864749:web:8bcc2a9ca1bc6d9ce36524",
  };

 const app = initializeApp(firebaseConfig);
 const authService = getAuth(app);
 const dbService = getFirestore(app);
 const storageService =getStorage(app);
 export { storageService, dbService, authService, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider };