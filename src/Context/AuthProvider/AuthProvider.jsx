import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import { auth } from "../../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName || "User",
          email: currentUser.email,
          photoURL:
            currentUser.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png",
          uid: currentUser.uid,
          provider: currentUser.providerData[0]?.providerId || "email",
        };

        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
        } catch (err) {
          console.log("User save error (might already exist):", err);
        }

        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext value={authInfo}>{children}</AuthContext>
  );
};

export default AuthProvider;
