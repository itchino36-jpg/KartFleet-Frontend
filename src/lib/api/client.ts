export const apiClient = async (endpoint: string, init?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText}`);
  }

  return response.json();
};
