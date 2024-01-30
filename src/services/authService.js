import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth();

export const authService = {
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },
  signOut() {
    return signOut(auth);
  },
  onAuthStateChanged(callback) {
    // Subscribe to authentication state changes
    auth.onAuthStateChanged(user => {
      callback(user); // Call the provided callback function with the user object
    });
  },
};