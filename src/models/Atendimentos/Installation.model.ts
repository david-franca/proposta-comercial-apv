type InstallationType = "Instalação" | "Remoção" | "Recuperação" | "Manutenção" | "Sem Troca";

export interface Installation {
  type: InstallationType;
  date: string;
  bearer: string;
  office: string;
}
