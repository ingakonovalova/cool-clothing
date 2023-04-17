import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// The actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Like some alias component that gives us a way how to access UserContext
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // So when this context is initialized, below useEffect will run and attach the listener.
  // Listener has a callback that will be called every time the auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // useEffect will run whatever you return inside of it
    // In this case, it will run the unsubscribe function to stop listening and avoid memory leak
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
