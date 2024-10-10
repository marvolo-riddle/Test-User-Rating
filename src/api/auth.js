import firebaseApp from "./firebaseConfig.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {saveUserData} from "./database.js";

export const auth = getAuth(firebaseApp);

export const registerUser = async (email, password) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (e) {
    throw new Error(e.message);
  }

};

export const loginUser = async (email, password) => {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (e) {
    throw new Error(e.message);
  }

}

export const logoutUser = async () => {

  try{
    await signOut(auth)
  }
  catch (e) {
    throw new Error(e.message)
  }

}

export const createAdminAccount = async () => {

  try {

    const email = 'admin@example.com';
    const password = 'AdminPassword123';

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const adminUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      username: 'Admin User',
      role: 'admin',
      rating: null,
      reviewsKeys: []
    };

    await saveUserData(adminUser);
    return adminUser;

  } catch (e) {
    console.error('Error creating admin:', e.message);
  }

};