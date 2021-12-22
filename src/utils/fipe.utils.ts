import axios from "axios";

export const fipeAPI = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1/",
});
