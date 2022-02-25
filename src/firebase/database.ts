import { db } from "./clientApp";

const propostas = db.collection("Propostas");
const users = db.collection("Users");
const configurations = db.collection("Configurations");

export const Propostas = () => ({
  getAll: async () => await propostas.get(),

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
