import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";

import { fuego } from "./clientApp";

const { db } = fuego;

const propostasRef = collection(db, "Propostas");
const usersRef = collection(db, "Users");
const configurationsRef = collection(db, "Configurations");

const propostaQuery = query(propostasRef, orderBy("createdAt"));

export const Propostas = () => ({
  getAll: async () => await getDocs(propostaQuery),

  where: async (fieldPath: string, whereOptions: WhereFilterOp, value: any) =>
    await getDocs(query(propostasRef, where(fieldPath, whereOptions, value))),

  getById: async (id: string) => await getDoc(doc(propostasRef, id)),

  create: async (id: string, value: any): Promise<void> =>
    await setDoc(doc(propostasRef, id), value),

  update: async (id: string, value: any): Promise<void> =>
    await updateDoc(doc(propostasRef, id), value),

  delete: async (id: string): Promise<void> => await deleteDoc(doc(propostasRef, id)),

  snapshot: (fieldPath: string, whereOptions: WhereFilterOp, value: any) =>
    query(propostasRef, where(fieldPath, whereOptions, value)),
});

export const Config = () => ({
  getAll: async () => await getDocs(query(configurationsRef)),

  update: async (id: string, value: any): Promise<void> =>
    await updateDoc(doc(configurationsRef, id), value),
});

export const Users = () => ({
  getByCode: async (code: string) => await getDocs(query(usersRef, where("code", "==", code))),

  update: async (id: string, value: any) => await updateDoc(doc(usersRef, id), value),
});
