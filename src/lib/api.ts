export const API_BASE_URL = "https://api.abcz.workers.dev";

export class ApiResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiResponseError";
  }
}

export async function fetchApiJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new ApiResponseError(
      `API request failed with ${response.status} ${response.statusText}: ${url}`
    );
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("json")) {
    throw new ApiResponseError(
      `Expected a JSON response from ${url}, received ${contentType || "no content type"}`
    );
  }

  return response.json() as Promise<T>;
}
