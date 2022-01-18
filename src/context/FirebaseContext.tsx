/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import firebase, { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider } from 'firebase/auth';
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
import type { DocumentData } from 'firebase/firestore'
//
import { db, auth as firebaseAuth } from '../Firebase-config';

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);
onAuthStateChanged(firebaseAuth, user => {
  // Check for user status
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, user => {
        if (user) {
          const docRef = doc(collection(db, 'users'), user.uid);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    [dispatch]
  );

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const loginWithFaceBook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
          const docRef = doc(collection(db, 'users'), res.user.uid);
          setDoc(docRef, {
            uid: res.user?.uid,
            email,
            displayName: `${firstName} ${lastName}`
          })
      });

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        updateProfile: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };