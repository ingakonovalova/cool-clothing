import { initializeApp } from "firebase/app"; // Creates an app instance for you based on some type of config
// Config is an object that allows us to connect this particular app instance with the one online

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // Libraries pack for authentication

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Libraries pack for DB access

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANsR8FLVD7V_yoSCe9Kyrl_GY79FFZ_1c",
  authDomain: "cool-clothing-cfc09.firebaseapp.com",
  projectId: "cool-clothing-cfc09",
  storageBucket: "cool-clothing-cfc09.appspot.com",
  messagingSenderId: "1024242419121",
  appId: "1:1024242419121:web:7cb08082bc0eec63cf6990",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // SDK

const provider = new GoogleAuthProvider(); // Class, you can have multiple different providers in an app

// When someone interacts with the provider, then make them select an account
provider.setCustomParameters({
  prompt: "select_account",
});

// Export
export const auth = getAuth(); // Only one authentication and related rules per app (that's why no keyword 'new' in front)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); // Initializing DB

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); // First need to check if the user exists

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
