import axios, { AxiosResponse } from "axios";

export async function fetcher(
  path: string,
  body?: Record<string, unknown>
): Promise<AxiosResponse<Record<string, unknown>, Record<string, unknown>>> {
  try {
    return await axios(`${window.apiUrl}/${path}`, {
      method: body ? "POST" : "GET",
      data: body,
    });
  } catch (error) {
    // @ts-expect-error Typescript won't recognize axios error type
    return error.response;
  }
}
