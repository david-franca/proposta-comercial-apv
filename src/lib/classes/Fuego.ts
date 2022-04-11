import { FirebaseOptions, getApp, getApps, initializeApp } from "@firebase/app";
import { Firestore, getFirestore } from "@firebase/firestore";

export class Fuego {
  public db: Firestore;
  constructor(config: FirebaseOptions, name?: string) {
    const app = initializeApp(config, name);
    this.db = getFirestore(app);
  }
}
