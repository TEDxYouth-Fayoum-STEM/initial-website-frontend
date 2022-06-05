import axios, { AxiosResponse } from "axios";
import { FireEvent } from "./alert";

export async function fetcher(
  path: string,
  body?: Record<string, unknown> | FormData
): Promise<AxiosResponse<Record<string, unknown>, unknown>> {
  try {
    return await axios(`${window.apiUrl}/${path}`, {
      method: body ? "POST" : "GET",
      data: body,
    });
  } catch (error) {
    // @ts-expect-error Typescript doesn't recognize axios errors
    const data: Record<string, unknown> = error.response.data;
    if (data) {
      const errors = Array.isArray(data.message)
        ? data.message
        : data.message
        ? [data.message]
        : [];
      FireEvent.errors(errors);
      throw errors[0];
    }
    throw error;
  }
}
