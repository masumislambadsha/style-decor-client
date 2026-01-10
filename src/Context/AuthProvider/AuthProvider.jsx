import React, { createContext, useEffect, useState } from "react";
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
import { auth } from "../../Firebase/firebase.init";
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
    setToken(null);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };
  const updateUserProfile = async (profile) => {
    await updateProfile(auth.currentUser, profile);
    setUser((prev) => ({ ...prev, ...auth.currentUser }));
  };
  const getToken = async (email) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email,
      });
      const t = res.data.token;
      setToken(t);
      localStorage.setItem("access-token", t);
      return t;
    } catch (err) {
      console.error("JWT request failed:", err.response?.data || err.message);
      throw err;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          const userData = {
            email: currentUser.email,
            name: currentUser.displayName || "User",
            photoURL:
              currentUser.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png",
          };
          await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
          const t = await getToken(currentUser.email);
          setUser({ ...currentUser, accessToken: t });
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem("access-token");
        }
      } catch (e) {
        console.error("Auth sync error:", e);
        setUser(currentUser || null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loading,
    token,
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