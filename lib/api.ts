const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

type RequestOptions = RequestInit & { body?: unknown };

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || `API request failed with status ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  health: () => apiRequest("/health"),
  dashboard: () => apiRequest("/dashboard"),
  bookings: {
    list: (query = "") => apiRequest(`/bookings${query ? `?${query}` : ""}`),
    get: (id: string) => apiRequest(`/bookings/${id}`),
    create: (input: unknown) => apiRequest("/bookings", { method: "POST", body: input }),
    update: (id: string, input: unknown) => apiRequest(`/bookings/${id}`, { method: "PATCH", body: input }),
    remove: (id: string) => apiRequest(`/bookings/${id}`, { method: "DELETE" }),
  },
  packages: {
    list: () => apiRequest("/packages"),
    create: (input: unknown) => apiRequest("/packages", { method: "POST", body: input }),
    update: (id: string, input: unknown) => apiRequest(`/packages/${id}`, { method: "PATCH", body: input }),
    remove: (id: string) => apiRequest(`/packages/${id}`, { method: "DELETE" }),
  },
};
