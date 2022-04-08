import { FirebaseApp, getApp } from "firebase/app";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

class AuthService {
  private auth: Auth;

  constructor(firebaseApp: FirebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  waitForUser(callback: (userCred: User | null) => void) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCred = await signInWithEmailAndPassword(this.auth, email, password);
      return {
        user: userCred.user,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await signOut(this.auth);
  }
}

export default new AuthService(getApp());
