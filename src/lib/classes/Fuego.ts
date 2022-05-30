import { FirebaseOptions, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

import { Firestore, getFirestore } from "@firebase/firestore";

export class Fuego {
  public db: Firestore;
  public storage: FirebaseStorage;
  constructor(config: FirebaseOptions, name?: string) {
    const app = initializeApp(config, name);
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }
}
