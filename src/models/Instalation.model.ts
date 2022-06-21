type InstalationType = "Instalação" | "Remoção" | "Recuperação" | "Manutenção" | "Sem Troca";

export interface Instalation {
  type: InstalationType;
  date: string;
  bearer: string;
  office: string;
}
