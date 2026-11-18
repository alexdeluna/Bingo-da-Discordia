import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, limit, runTransaction, serverTimestamp, arrayUnion, increment } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from '../firebase-config.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, limit, runTransaction, serverTimestamp, arrayUnion, increment };

export const waitForUser = () => new Promise(resolve => onAuthStateChanged(auth, resolve));
// A lista é mantida manualmente no Console; cada conta só lê o seu próprio registro.
export async function userRole(user) {
  if (!user) return false;
  const admin = await getDoc(doc(db, 'adminUsers', user.uid));
  return admin.exists() && admin.data().active === true;
}
export async function signInPlayer() { if (!auth.currentUser) await signInAnonymously(auth); return auth.currentUser; }
export async function signInAdmin() { await signInWithPopup(auth, new GoogleAuthProvider()); return auth.currentUser; }
export { signOut };
