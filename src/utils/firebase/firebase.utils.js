import { initializeApp } from "firebase/app"; // Creates an app instance for you based on some type of config
// Config is an object that allows us to connect this particular app instance with the one online

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // Libraries pack for authentication

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore"; // Libraries pack for DB access

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

const googleProvider = new GoogleAuthProvider(); // Class, you can have multiple different providers in an app
// You can also have different providers like Facebook, Github and so on

// When someone interacts with the provider, then make them select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export
export const auth = getAuth(); // Only one authentication and related rules per app (that's why no keyword 'new' in front)

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // Initializing DB

// Method to add entries to the DB - collectionKey is the key of the collection where you want to add
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  // Now we need to batch stuff to the DB
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done");
};

// Method to get the categories data from DB, async, because we retrieve from DB
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  // getDocs is async fetching
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// Method to handle authentication with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Writing our own methods instead of just using this Google provided method everywhere to minimize the need for changes
// in case something changes in the functions form FireBase side
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = doc(db, "users", userAuth.uid); // First need to check if the user exists

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Helper function to listen for changes in auth states, so that we don't have to track them
// in different places
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
