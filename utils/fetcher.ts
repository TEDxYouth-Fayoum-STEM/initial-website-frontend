import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export async function fetcher(
  path: string,
  body?: Record<string, unknown>
): Promise<AxiosResponse<unknown, unknown>> {
  try {
    return await axios(`${window.apiUrl}/${path}`, {
      method: body ? "POST" : "GET",
      data: body,
    });
  } catch (error) {
    Swal.fire({
      title: "Something Went Wrong!",
      icon: "error",
    });
    // @ts-expect-error Typescript doesn't recognize axios types
    const errors: string[] = Array.isArray(error.response.data.message)
      ? // @ts-expect-error Typescript doesn't recognize axios types
        error.response.data.message
      : // @ts-expect-error Typescript doesn't recognize axios types
      error.response.data.message
      ? // @ts-expect-error Typescript doesn't recognize axios types
        [error.response.message]
      : ["unknown"];
    Swal.fire({
      title: "Something Went Wrong!",
      icon: "error",
      html: errors.map((e) => `<p>${e}</p>`),
    });
    throw error;
  }
}
