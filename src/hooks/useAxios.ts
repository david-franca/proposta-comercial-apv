import axios, { AxiosError } from "axios";
import useSWR from "swr";

import { ErrorProps } from "../models/props.model";

export default function useAxios<Data = any, Error = AxiosError<ErrorProps>>(
  url: string,
  headers?: { "x-access-token": string }
) {
  const { data, error } = useSWR<Data, Error>(url, async (url: string) => {
    const response = await axios.get(url, {
      headers,
    });
    return response.data;
  });
  return { data, error };
}
