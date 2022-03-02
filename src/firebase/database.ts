import { WhereFilterOp } from "firebase/firestore";
import { db } from "./clientApp";

const propostas = db.collection("Propostas");
const users = db.collection("Users");
const configurations = db.collection("Configurations");

export const Propostas = () => ({
  getAll: async () => await propostas.get(),

  where: async (fieldPath: string, whereOptions: WhereFilterOp, value: any) =>
    await propostas.where(fieldPath, whereOptions, value).get(),

  getById: async (id: string) => await propostas.doc(id).get(),

  create: async (id: string, value: any): Promise<void> => await propostas.doc(id).set(value),

  update: async (id: string, value: any): Promise<void> => await propostas.doc(id).update(value),

  delete: async (id: string): Promise<void> => await propostas.doc(id).delete(),
});

export const Config = () => ({
  getAll: async () => await configurations.get(),

  update: async (id: string, value: any): Promise<void> =>
    await configurations.doc(id).update(value),
});

export const Users = () => ({
  getByCode: async (code: string) => await users.where("code", "==", code).get(),

  update: async (id: string, value: any) => await users.doc(id).update(value),
});
